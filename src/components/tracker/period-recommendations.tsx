
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface RecommendationsProps {
  painLevel: number;
  hascramps: boolean;
}

export function PeriodRecommendations({ painLevel, hascramps }: RecommendationsProps) {
  const getRecommendations = () => {
    const recommendations = {
      dos: [
        "Stay hydrated with water",
        "Get adequate rest",
        "Maintain a balanced diet",
      ],
      donts: [
        "Avoid excessive caffeine",
        "Avoid processed foods",
        "Avoid stressful situations",
      ]
    };

    // Add recommendations based on pain level
    if (painLevel >= 7) {
      recommendations.dos.push(
        "Apply heat therapy",
        "Practice gentle yoga",
        "Take warm baths",
        "Consider anti-inflammatory foods",
        "Drink ginger or turmeric tea"
      );
      recommendations.donts.push(
        "Avoid intense exercise",
        "Avoid cold beverages",
        "Avoid skipping meals"
      );
    } else if (painLevel >= 4) {
      recommendations.dos.push(
        "Light exercise like walking",
        "Gentle stretching",
        "Include iron-rich foods",
        "Practice deep breathing"
      );
    }

    // Add recommendations for cramps
    if (hascramps) {
      recommendations.dos.push(
        "Massage lower abdomen",
        "Try chamomile tea",
        "Eat magnesium-rich foods",
        "Practice relaxation techniques"
      );
      recommendations.donts.push(
        "Avoid tight clothing",
        "Avoid prolonged sitting"
      );
    }

    return recommendations;
  };

  const { dos, donts } = getRecommendations();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pink-900">Personalized Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700">Do's</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {dos.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">Don'ts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {donts.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}