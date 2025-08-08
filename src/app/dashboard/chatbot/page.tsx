"use client";

import { AiChat } from "@/components/chatbot/ai-chat";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChatbotPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-8 space-y-6">
      <Button
        variant="ghost"
        className="text-pink-600"
        onClick={() => router.push("/dashboard")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div>
        <h1 className="text-3xl font-bold text-pink-900">AI Health Assistant</h1>
        <p className="text-gray-600 mt-2">
          Chat with our AI assistant about women's health and wellness
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <AiChat />
      </div>
    </div>
  );
}