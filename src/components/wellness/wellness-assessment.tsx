"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const questions = [
  {
    id: 1,
    question: "How would you rate your stress level today?",
    options: ["Very Low", "Low", "Moderate", "High", "Very High"],
  },
  {
    id: 2,
    question: "How would you rate your sleep quality last night?",
    options: ["Excellent", "Good", "Fair", "Poor", "Very Poor"],
  },
  {
    id: 3,
    question: "How would you describe your mood today?",
    options: ["Very Happy", "Happy", "Neutral", "Sad", "Very Sad"],
  },
  {
    id: 4,
    question: "How would you rate your energy level?",
    options: ["Very High", "High", "Moderate", "Low", "Very Low"],
  },
  {
    id: 5,
    question: "How would you rate your anxiety level?",
    options: ["None", "Mild", "Moderate", "High", "Severe"],
  },
];

export function WellnessAssessment({ onComplete }: { onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically save the answers to your backend
    console.log("Answers:", answers);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-pink-900">
          Wellness Assessment
        </CardTitle>
        <div className="flex justify-center space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded ${
                index <= currentStep ? "bg-pink-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="min-h-[200px]">
          <h3 className="text-lg font-medium mb-4">
            {questions[currentStep].question}
          </h3>
          <RadioGroup
            value={answers[questions[currentStep].id]}
            onValueChange={(value) =>
              setAnswers({ ...answers, [questions[currentStep].id]: value })
            }
          >
            {questions[currentStep].options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep === questions.length - 1 ? (
            <Button onClick={handleSubmit} className="bg-pink-600 hover:bg-pink-700">
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!answers[questions[currentStep].id]}
              className="bg-pink-600 hover:bg-pink-700"
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}