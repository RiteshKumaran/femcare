"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface CycleInfoProps {
  prediction: {
    nextPeriodDate: Date;
    periodLength: number;
    cycleLength: number;
    lastPeriodDate: Date;
  };
}

export function CycleInfo({ prediction }: CycleInfoProps) {
  const getCyclePhase = () => {
    const daysSinceLastPeriod = Math.ceil(
      (new Date().getTime() - new Date(prediction.lastPeriodDate).getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastPeriod <= prediction.periodLength) return "Menstrual";
    if (daysSinceLastPeriod <= 14) return "Follicular";
    if (daysSinceLastPeriod <= 16) return "Ovulation";
    return "Luteal";
  };

  const formatDate = (date: Date) => {
    try {
      return formatDistanceToNow(new Date(date.getTime()), { addSuffix: true });
    } catch (error) {
      return "Calculating...";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-pink-900">Next Period</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">
            {formatDate(prediction.nextPeriodDate)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-pink-900">Cycle Phase</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{getCyclePhase()}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-pink-900">Cycle Length</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{prediction.cycleLength} days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-pink-900">Period Length</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{prediction.periodLength} days</p>
        </CardContent>
      </Card>
    </div>
  );
}