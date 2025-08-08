"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Add helper functions for date manipulation
function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

interface PeriodPrediction {
  futurePeriods: Date[];
  periodLength: number;
}

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  prediction: PeriodPrediction;
}

export function Calendar({
  selectedDate,
  onDateSelect,
  prediction,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const isPeriodDay = (date: Date) => {
    return prediction.futurePeriods.some((periodStart) => {
      const periodEnd = new Date(periodStart);
      periodEnd.setDate(periodEnd.getDate() + prediction.periodLength);
      return date >= periodStart && date <= periodEnd;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-800">
          Menstruation estimation for the next 3 months
        </h2>
        <div className="flex gap-2 md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setCurrentMonth((prev) => {
                const newDate = new Date(prev);
                newDate.setMonth(prev.getMonth() - 1);
                return newDate;
              });
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setCurrentMonth((prev) => {
                const newDate = new Date(prev);
                newDate.setMonth(prev.getMonth() + 1);
                return newDate;
              });
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex gap-4 overflow-hidden">
          {[0, 1, 2].map((monthOffset) => {
            const monthDate = new Date(currentMonth);
            monthDate.setMonth(currentMonth.getMonth() + monthOffset);

            return (
              <div key={monthOffset} className="flex-1 min-w-full md:min-w-0">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  {monthDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <div className="grid grid-cols-7 gap-1">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div
                      key={day}
                      className="text-xs text-gray-500 p-1 text-center"
                    >
                      {day}
                    </div>
                  ))}
                  {getDaysInMonth(monthDate).map((date, i) => (
                    <div
                      key={i}
                      className={cn(
                        "p-1 relative aspect-square flex flex-col items-center justify-center",
                        isPeriodDay(date) && "bg-pink-100 rounded",
                        date.getMonth() !== monthDate.getMonth() &&
                          "text-gray-500"
                      )}
                    >
                      <span className="text-sm">{date.getDate()}</span>
                      {isPeriodDay(date) && (
                        <div className="absolute bottom-8">
                          <div className="text-pink-500">🩸</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center text-gray-600">
        Please note that this is only an estimation of your menstrual cycle.
      </div>
    </div>
  );
}

// Helper function to get all days in a month's calendar view
function getDaysInMonth(date: Date) {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const days = [];

  // Include days from previous month
  const startDay = start.getDay();
  for (let i = 0; i < startDay; i++) {
    const prevDay = new Date(start);
    prevDay.setDate(prevDay.getDate() - (startDay - i));
    days.push(prevDay);
  }

  // Current month days
  for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
    days.push(new Date(day));
  }

  // Include days from next month
  const endDay = end.getDay();
  for (let i = 1; i < 7 - endDay; i++) {
    const nextDay = new Date(end);
    nextDay.setDate(nextDay.getDate() + i);
    days.push(nextDay);
  }

  return days;
}
