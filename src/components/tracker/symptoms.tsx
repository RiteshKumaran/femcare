"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SYMPTOMS = [
  "Cramps",
  "Headache",
  "Bloating",
  "Fatigue",
  "Acne",
  "Breast Tenderness",
  "Mood Swings",
  "Back Pain",
];

export function Symptoms({ date }: { date: Date }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Symptoms</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SYMPTOMS.map((symptom) => (
            <Button
              key={symptom}
              variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
              className="h-auto py-2"
              onClick={() => toggleSymptom(symptom)}
            >
              {symptom}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}