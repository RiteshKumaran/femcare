"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

interface PeriodFormProps {
  onSubmit: (data: {
    lastPeriodDate: Date;
    periodLength: number;
    cycleLength: number;
    painLevel: number;
    hascramps: boolean;
  }) => void;
}

export function PeriodForm({ onSubmit }: PeriodFormProps) {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [periodLength, setPeriodLength] = useState("5");
  const [cycleLength, setCycleLength] = useState("28");
  const [painLevel, setPainLevel] = useState(1);
  const [hascramps, setHasCramps] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      lastPeriodDate: new Date(lastPeriodDate),
      periodLength: Number(periodLength),
      cycleLength: Number(cycleLength),
      painLevel,
      hascramps,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md w-full mx-auto">
      <div className="space-y-2">
        <Label htmlFor="lastPeriodDate">Last Period Start Date</Label>
        <Input
          id="lastPeriodDate"
          type="date"
          value={lastPeriodDate}
          onChange={(e) => setLastPeriodDate(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="periodLength">Period Length (days)</Label>
        <Input
          id="periodLength"
          type="number"
          min="1"
          max="10"
          value={periodLength}
          onChange={(e) => setPeriodLength(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cycleLength">Cycle Length (days)</Label>
        <Input
          id="cycleLength"
          type="number"
          min="21"
          max="35"
          value={cycleLength}
          onChange={(e) => setCycleLength(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Pain Level (1-10)</Label>
        <div className="space-y-2">
          <Slider
            value={[painLevel]}
            onValueChange={(value) => setPainLevel(value[0])}
            min={1}
            max={10}
            step={1}
            className="w-full"
          />
          <p className="text-sm text-gray-500 text-right">Current pain level: {painLevel}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="cramps"
          checked={hascramps}
          onCheckedChange={(checked) => setHasCramps(checked as boolean)}
        />
        <Label htmlFor="cramps">Experiencing Cramps</Label>
      </div>

      <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
        Calculate
      </Button>
    </form>
  );
}
