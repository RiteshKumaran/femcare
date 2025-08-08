"use client";

import { useState, useEffect } from "react";
import { WellnessAssessment } from "./wellness-assessment";

export function InitialAssessment({ children }: { children: React.ReactNode }) {
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  useEffect(() => {
    const assessmentStatus = localStorage.getItem("wellnessAssessmentCompleted");
    if (assessmentStatus === "true") {
      setHasCompletedAssessment(true);
    }
  }, []);

  const handleAssessmentComplete = () => {
    localStorage.setItem("wellnessAssessmentCompleted", "true");
    setHasCompletedAssessment(true);
  };

  if (!hasCompletedAssessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-pink-900">Welcome to SheEvolves!</h2>
            <p className="text-gray-600">
              Let's start by understanding your wellness needs better. Please complete this quick assessment.
            </p>
          </div>
          <WellnessAssessment onComplete={handleAssessmentComplete} />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}