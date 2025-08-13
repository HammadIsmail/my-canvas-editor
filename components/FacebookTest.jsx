'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export default function FacebookPermissionsTest() {
  const { data: session } = useSession();
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState({});
  const [selectedTests, setSelectedTests] = useState(new Set());

  // Define all permission tests
  const permissionTests = [
    {
      id: 'basic_info',
      name: 'Basic Profile Info',
      description: 'Test email and public_profile permissions',
      endpoint: 'me?fields=id,name,email,picture',
      permission: 'email,public_profile'
    },
    {
      id: 'pages_list',
      name: 'Pages List',
      description: 'Test pages_show_list permission',
      endpoint: 'me/accounts',
      permission: 'pages_show_list'
    },
    {
      id: 'page_insights',
      name: 'Page Insights',
      description: 'Test read_insights permission (requires page)',
      endpoint: null, // Will be set dynamically with page ID
      permission: 'read_insights',
      requiresPage: true
    },
    {
      id: 'page_posts',
      name: 'Page Posts',
      description: 'Test pages_read_user_content permission',
      endpoint: null, // Will be set dynamically with page ID
      permission: 'pages_read_user_content',
      requiresPage: true
    },
    {
      id: 'page_engagement',
      name: 'Page Engagement',
      description: 'Test pages_read_engagement permission',
      endpoint: null, // Will be set dynamically with page ID
      permission: 'pages_read_engagement',
      requiresPage: true,
      alternativeEndpoints: [
        'insights?metric=page_post_engagements',
        'insights?metric=page_consumptions',
        'insights?metric=page_fan_adds',
        'insights?metric=page_impressions',
        'feed'
      ]
    },
    {
      id: 'page_cta',
      name: 'Page Call-to-Action',
      description: 'Test pages_manage_cta permission',
      endpoint: null, // Will be set dynamically with page ID
      permission: 'pages_manage_cta',
      requiresPage: true
    }
  ];

  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  const makeApiCall = async (endpoint, pageAccessToken = null) => {
    const token = pageAccessToken || session.accessToken;
    
    // Debug: Log token info (remove in production)
    console.log('Using token:', token ? 'Token present' : 'No token', 'Length:', token?.length);
    
    const url = `https://graph.facebook.com/v18.0/${endpoint}`;
    
    try {
      // Method 1: Direct API call with Bearer token
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (!data.error) {
        return data;
      }
      
      console.log('Bearer token method failed, trying query parameter...');
      
      // Method 2: Query parameter method
      const fallbackResponse = await fetch(`${url}?access_token=${token}`);
      const fallbackData = await fallbackResponse.json();
      
      if (!fallbackData.error) {
        return fallbackData;
      }
      
      console.log('Direct API calls failed, trying server-side route...');
      
      // Method 3: Server-side API route
      const serverResponse = await fetch('/api/facebook/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          endpoint: endpoint.replace(/\?.*/, ''), // Remove query parameters
          pageAccessToken: pageAccessToken
        })
      });
      
      const serverData = await serverResponse.json();
      
      if (serverData.success) {
        return serverData.data;
      }
      
      // If all methods fail, throw the last error
      throw new Error(`${serverData.details || fallbackData.error.message} (Code: ${fallbackData.error?.code || serverData.code})`);
      
    } catch (fetchError) {
      // If fetch itself fails, try server-side route
      console.log('Network error, trying server-side route...', fetchError.message);
      
      try {
        const serverResponse = await fetch('/api/facebook/test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            endpoint: endpoint.replace(/\?.*/, ''), // Remove query parameters  
            pageAccessToken: pageAccessToken
          })
        });
        
        const serverData = await serverResponse.json();
        
        if (serverData.success) {
          return serverData.data;
        }
        
        throw new Error(`${serverData.details} (Code: ${serverData.code})`);
        
      } catch (serverError) {
        throw new Error(`All methods failed: ${fetchError.message}`);
      }
    }
  };

  const testPermission = async (test) => {
    if (!session?.accessToken) return;

    setLoading(prev => ({ ...prev, [test.id]: true }));
    setTestResults(prev => ({ ...prev, [test.id]: null }));

    try {
      let result;
      let endpoint = test.endpoint;
      let lastError = null;

      if (test.requiresPage && selectedPage) {
        // For page-specific tests, use the page ID and page access token
        switch (test.id) {
          case 'page_insights':
            endpoint = `${selectedPage.id}/insights/page_impressions`;
            break;
          case 'page_posts':
            endpoint = `${selectedPage.id}/posts`;
            break;
          case 'page_engagement':
            // Try multiple engagement endpoints
            const engagementEndpoints = [
              `${selectedPage.id}/insights?metric=page_post_engagements`,
              `${selectedPage.id}/insights?metric=page_consumptions`,
              `${selectedPage.id}/insights?metric=page_fan_adds`,
              `${selectedPage.id}/insights?metric=page_impressions`,
              `${selectedPage.id}/feed`
            ];
            
            for (const engagementEndpoint of engagementEndpoints) {
              try {
                result = await makeApiCall(engagementEndpoint, selectedPage.access_token);
                endpoint = engagementEndpoint;
                break; // Success, exit the loop
              } catch (error) {
                lastError = error;
                console.log(`Failed endpoint ${engagementEndpoint}:`, error.message);
                continue; // Try next endpoint
              }
            }
            
            // If all engagement endpoints failed, throw the last error
            if (!result) {
              throw lastError || new Error('All engagement endpoints failed');
            }
            break;
          case 'page_cta':
            endpoint = `${selectedPage.id}/call_to_actions`;
            break;
        }
        
        // If we haven't gotten a result yet, try the endpoint
        if (!result) {
          result = await makeApiCall(endpoint, selectedPage.access_token);
        }
      } else if (test.requiresPage && !selectedPage) {
        throw new Error('Please select a page first');
      } else {
        result = await makeApiCall(endpoint);
      }

      setTestResults(prev => ({
        ...prev,
        [test.id]: {
          success: true,
          data: result,
          message: `✅ ${test.name} permission is working correctly`,
          endpoint: endpoint // Show which endpoint worked
        }
      }));

    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [test.id]: {
          success: false,
          error: error.message,
          message: `❌ ${test.name} permission failed: ${error.message}`
        }
      }));
    } finally {
      setLoading(prev => ({ ...prev, [test.id]: false }));
    }
  };

  const fetchPages = async () => {
    if (!session?.accessToken) return;
    
    setLoading(prev => ({ ...prev, pages: true }));
    
    try {
      const result = await makeApiCall('me/accounts');
      setPages(result.data || []);
      if (result.data && result.data.length > 0) {
        setSelectedPage(result.data[0]); // Auto-select first page
      }
    } catch (error) {
      console.error('Failed to fetch pages:', error);
    } finally {
      setLoading(prev => ({ ...prev, pages: false }));
    }
  };

  const testAllSelected = async () => {
    for (const test of permissionTests) {
      if (selectedTests.has(test.id)) {
        await testPermission(test);
        // Add a small delay between tests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  };

  const toggleTestSelection = (testId) => {
    setSelectedTests(prev => {
      const newSet = new Set(prev);
      if (newSet.has(testId)) {
        newSet.delete(testId);
      } else {
        newSet.add(testId);
      }
      return newSet;
    });
  };

  const selectAllTests = () => {
    setSelectedTests(new Set(permissionTests.map(test => test.id)));
  };

  const clearAllTests = () => {
    setSelectedTests(new Set());
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Facebook Permissions Tester
          </h1>
          <div className="text-center">
            <button
              onClick={() => signIn('facebook')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md flex items-center justify-center mx-auto transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              Connect with Facebook
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Facebook Permissions Tester
              </h1>
              <p className="text-gray-600">
                Logged in as: <span className="font-medium">{session.user?.name || session.user?.email}</span>
              </p>
            </div>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Page Selection */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={fetchPages}
                disabled={loading.pages}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
              >
                {loading.pages ? 'Loading...' : 'Load Pages'}
              </button>
              
              {pages.length > 0 && (
                <select
                  value={selectedPage?.id || ''}
                  onChange={(e) => {
                    const page = pages.find(p => p.id === e.target.value);
                    setSelectedPage(page);
                  }}
                  className="border rounded-md px-3 py-2 bg-white"
                >
                  <option value="">Select a page</option>
                  {pages.map(page => (
                    <option key={page.id} value={page.id}>
                      {page.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            
            {selectedPage && (
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-blue-800">
                  Selected Page: <span className="font-medium">{selectedPage.name}</span>
                  <span className="ml-2 text-xs bg-blue-200 px-2 py-1 rounded">
                    {selectedPage.category}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Token Debug Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Debug Information</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Access Token Present:</strong> {session?.accessToken ? 'Yes' : 'No'}</p>
            <p><strong>Token Length:</strong> {session?.accessToken?.length || 'N/A'}</p>
            <p><strong>Token Preview:</strong> {session?.accessToken ? `${session.accessToken.substring(0, 20)}...` : 'N/A'}</p>
            <p><strong>User Email:</strong> {session?.user?.email || 'N/A'}</p>
            <p><strong>User ID:</strong> {session?.user?.id || 'N/A'}</p>
          </div>
          
          <button
            onClick={async () => {
              try {
                const response = await fetch('/api/auth/session');
                const sessionData = await response.json();
                console.log('Full session data:', sessionData);
                alert('Check console for full session data');
              } catch (error) {
                console.error('Failed to fetch session:', error);
              }
            }}
            className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Debug Session
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Permission Tests</h2>
            <button
              onClick={selectAllTests}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              Select All
            </button>
            <button
              onClick={clearAllTests}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={testAllSelected}
              disabled={selectedTests.size === 0}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded transition-colors"
            >
              Test Selected ({selectedTests.size})
            </button>
          </div>
        </div>

        {/* Test Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {permissionTests.map((test) => {
            const result = testResults[test.id];
            const isLoading = loading[test.id];
            const isSelected = selectedTests.has(test.id);
            const canTest = !test.requiresPage || (test.requiresPage && selectedPage);

            return (
              <div
                key={test.id}
                className={`bg-white rounded-lg shadow-lg p-6 border-2 transition-all ${
                  isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleTestSelection(test.id)}
                      className="mr-3 h-4 w-4 text-blue-600"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{test.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                      <p className="text-xs text-blue-600 mt-1">
                        Permission: {test.permission}
                      </p>
                    </div>
                  </div>
                </div>

                {test.requiresPage && !selectedPage && (
                  <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 text-sm rounded">
                    ⚠️ Requires page selection
                  </div>
                )}

                <button
                  onClick={() => testPermission(test)}
                  disabled={isLoading || !canTest}
                  className={`w-full px-4 py-2 rounded-md transition-colors mb-4 ${
                    !canTest
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {isLoading ? 'Testing...' : 'Test Permission'}
                </button>

                {/* Results */}
                {result && (
                  <div className={`p-3 rounded-md text-sm ${
                    result.success 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    <p className="font-medium mb-2">{result.message}</p>
                    
                    {result.success && result.endpoint && (
                      <p className="text-xs mb-2 opacity-70">
                        Endpoint: {result.endpoint.replace(selectedPage?.id, 'PAGE_ID')}
                      </p>
                    )}
                    
                    {result.success && result.data && (
                      <details className="mt-2">
                        <summary className="cursor-pointer font-medium">View Data</summary>
                        <pre className="mt-2 text-xs overflow-auto max-h-40 bg-white p-2 rounded border">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </details>
                    )}
                    
                    {!result.success && (
                      <p className="text-xs mt-1 opacity-80">
                        {result.error}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary */}
        {Object.keys(testResults).length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Test Summary</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-800">
                  {Object.values(testResults).filter(r => r?.success).length}
                </div>
                <div className="text-green-600">Passed</div>
              </div>
              <div className="p-4 bg-red-100 rounded-lg">
                <div className="text-2xl font-bold text-red-800">
                  {Object.values(testResults).filter(r => r && !r.success).length}
                </div>
                <div className="text-red-600">Failed</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}