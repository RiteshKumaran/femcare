"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { date: "Mon", stress: 3, mood: 4, sleep: 3, energy: 4, anxiety: 2 },
  { date: "Tue", stress: 4, mood: 3, sleep: 4, energy: 3, anxiety: 3 },
  { date: "Wed", stress: 2, mood: 4, sleep: 4, energy: 4, anxiety: 2 },
  { date: "Thu", stress: 3, mood: 5, sleep: 3, energy: 5, anxiety: 1 },
  { date: "Fri", stress: 2, mood: 4, sleep: 4, energy: 4, anxiety: 2 },
  { date: "Sat", stress: 1, mood: 5, sleep: 5, energy: 5, anxiety: 1 },
  { date: "Sun", stress: 2, mood: 4, sleep: 4, energy: 4, anxiety: 2 },
];

export function WellnessInsights() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-pink-900">Wellness Insights</CardTitle>
        <p className="text-gray-600">Your wellness trends over the past week</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="stress" stroke="#ef4444" name="Stress" />
              <Line type="monotone" dataKey="mood" stroke="#3b82f6" name="Mood" />
              <Line type="monotone" dataKey="sleep" stroke="#8b5cf6" name="Sleep" />
              <Line type="monotone" dataKey="energy" stroke="#10b981" name="Energy" />
              <Line type="monotone" dataKey="anxiety" stroke="#f59e0b" name="Anxiety" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 p-4 bg-pink-50 rounded-lg">
          <h4 className="font-medium text-pink-900 mb-2">Weekly Insights</h4>
          <p className="text-gray-700">
            Based on your responses, your wellness scores have been improving. Your stress and anxiety levels have decreased, 
            while your sleep quality and energy levels show positive trends. Keep maintaining your healthy routines!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}