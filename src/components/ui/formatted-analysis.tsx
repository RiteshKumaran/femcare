"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface FormattedAnalysisProps {
  analysis: string;
}

export function FormattedAnalysis({ analysis }: FormattedAnalysisProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(analysis);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Format the analysis text
  const formatAnalysis = (text: string) => {
    return text
      .split("\n")
      .map((paragraph, index) => {
        if (paragraph.trim() === "") return null;

        // Check if it's a header (starts with **text** or #)
        if (paragraph.match(/^\*\*(.*?)\*\*/) || paragraph.startsWith("#")) {
          const headerText = paragraph
            .replace(/^\*\*(.*?)\*\*/, "$1")
            .replace(/^#+\s*/, "");
          return (
            <h4
              key={index}
              className="font-semibold text-gray-800 mt-4 mb-2 text-lg"
            >
              {headerText}
            </h4>
          );
        }

        // Check if it's a bullet point
        if (paragraph.match(/^[\-\*]\s/) || paragraph.match(/^\d+\.\s/)) {
          return (
            <div key={index} className="flex items-start mb-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700 leading-relaxed">
                {paragraph.replace(/^[\-\*]\s/, "").replace(/^\d+\.\s/, "")}
              </p>
            </div>
          );
        }

        // Check if it's a warning or important note
        if (
          paragraph.toLowerCase().includes("important") ||
          paragraph.toLowerCase().includes("warning") ||
          paragraph.toLowerCase().includes("disclaimer") ||
          paragraph.toLowerCase().includes("consult")
        ) {
          return (
            <div
              key={index}
              className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4"
            >
              <p className="text-yellow-800 font-medium">{paragraph}</p>
            </div>
          );
        }

        // Check if it's a recommendation
        if (
          paragraph.toLowerCase().includes("recommend") ||
          paragraph.toLowerCase().includes("suggest") ||
          paragraph.toLowerCase().includes("should")
        ) {
          return (
            <div
              key={index}
              className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4"
            >
              <p className="text-blue-800">{paragraph}</p>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-3">
            {paragraph}
          </p>
        );
      })
      .filter(Boolean);
  };

  return (
    <div className="relative">
      {/* Copy button */}
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="absolute top-0 right-0 z-10"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-1" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </>
        )}
      </Button>

      {/* Formatted analysis */}
      <div className="prose prose-sm max-w-none pt-8">
        {formatAnalysis(analysis)}
      </div>
    </div>
  );
}
