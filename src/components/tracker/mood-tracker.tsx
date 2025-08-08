"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MOODS = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😴", label: "Tired" },
  { emoji: "🤢", label: "Nauseous" },
  { emoji: "😌", label: "Calm" },
];

export function MoodTracker({ date }: { date: Date }) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {MOODS.map(({ emoji, label }) => (
            <Button
              key={label}
              variant={selectedMood === label ? "default" : "outline"}
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => setSelectedMood(label)}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-sm">{label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}