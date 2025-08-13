import React from 'react'
import { Button } from '@/components/ui/button'; 
import { X } from 'lucide-react';
import { getElements } from './elementConstants';


const Elements = ({ setShowElements,canvas }) => {
  return (
   <div className="fixed left-16 top-0 bottom-0 w-80 bg-white border-r shadow-lg z-50 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-purple-50 to-pink-50">
            <div>
              <h3 className="font-bold text-lg text-gray-800">Elements</h3>
              <p className="text-sm text-gray-600">Add shapes to your design</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowElements(false)}
              className="p-2 hover:bg-white/50 rounded-lg"
            >
              <X size={16} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-6">
              {getElements(canvas).map((category) => (
                <div key={category.category}>
                  <h4 className="font-semibold text-sm text-gray-700 mb-3 flex items-center gap-2">
                    <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                    {category.category}
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        onClick={item.action}
                        className="group relative bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:border-purple-300 hover:from-purple-50 hover:to-pink-50"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-2 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-200">
                            <item.icon 
                              size={20} 
                              className="text-gray-600 group-hover:text-white transition-colors duration-200" 
                            />
                          </div>
                          <span className="font-medium text-xs text-gray-700 group-hover:text-gray-900">
                            {item.name}
                          </span>
                          <span className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {item.description}
                          </span>
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}        
    
export default Elements
