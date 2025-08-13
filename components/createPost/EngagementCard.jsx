import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { 
  BarChart3,
  
} from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '../ui/button';



const EngagementChart = ({ data, selectedTime, onTimeSelect }) => {
  const optimalTimes = data.filter(d => d.engagement >= 80);
  
  const platformData = data.reduce((acc, curr) => {
    curr.platforms.forEach(platform => {
      const existing = acc.find(item => item.name === platform);
      if (existing) {
        existing.value += curr.engagement;
      } else {
        acc.push({ name: platform, value: curr.engagement });
      }
    });
    return acc;
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Engagement Analytics
        </CardTitle>
        <CardDescription>Optimal posting times based on your audience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="hourly">
          <TabsList className="grid grid-cols-2 w-full max-w-xs">
            <TabsTrigger value="hourly">Hourly</TabsTrigger>
            <TabsTrigger value="platforms">By Platform</TabsTrigger>
          </TabsList>
          <TabsContent value="hourly" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="engagement" 
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="platforms" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        <div>
          <h4 className="text-sm font-medium mb-2">Suggested Times</h4>
          <div className="grid grid-cols-3 gap-2">
            {optimalTimes.map((time, index) => (
              <Button
                key={index}
                variant={selectedTime === time.time ? "default" : "outline"}
                size="sm"
                onClick={() => onTimeSelect(time.time)}
              >
                {time.time}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementChart;