"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-provider";
import { Calendar } from "@/components/tracker/calendar";
import { CycleInfo } from "@/components/tracker/cycle-info";
import { PeriodForm } from "@/components/tracker/period-form";
import { Button } from "@/components/ui/button";
import { PeriodRecommendations } from "@/components/tracker/period-recommendations";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PeriodPrediction {
  nextPeriodDate: Date;
  periodLength: number;
  cycleLength: number;
  lastPeriodDate: Date;
  futurePeriods: Date[];
  painLevel: number;
  hascramps: boolean;
}

export default function TrackerPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [prediction, setPrediction] = useState<PeriodPrediction | null>(null);

  const calculatePrediction = (data: {
    lastPeriodDate: Date;
    periodLength: number;
    cycleLength: number;
    painLevel: number;
    hascramps: boolean;
  }) => {
    const futurePeriods = [];
    let nextDate = new Date(data.lastPeriodDate);

    for (let i = 0; i < 4; i++) {
      nextDate = new Date(nextDate);
      nextDate.setDate(nextDate.getDate() + data.cycleLength);
      futurePeriods.push(new Date(nextDate));
    }

    setPrediction({
      ...data,
      lastPeriodDate: new Date(data.lastPeriodDate),
      nextPeriodDate: futurePeriods[0],
      futurePeriods,
      painLevel: data.painLevel,
      hascramps: data.hascramps,
    });
  };

  const handleReset = () => {
    setPrediction(null);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Button
        variant="ghost"
        className="text-pink-600 mb-4"
        onClick={() => router.push("/dashboard")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl mx-auto font-bold text-primary">
          Period Tracker
        </h1>
        {prediction && (
          <Button
            variant="ghost"
            className="text-pink-600 hover:text-pink-700"
            onClick={handleReset}
          >
            ← Back to Form
          </Button>
        )}
      </div>

      {!prediction ? (
        <PeriodForm onSubmit={calculatePrediction} />
      ) : (
        <div className="space-y-6">
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            prediction={prediction}
            onBack={handleReset}
          />
          <CycleInfo prediction={prediction} />
          <PeriodRecommendations
            painLevel={prediction.painLevel}
            hascramps={prediction.hascramps}
          />
        </div>
      )}
    </div>
  );
}
