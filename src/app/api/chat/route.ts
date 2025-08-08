import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const prompt = `Hi! I'm SheEvolves, your friendly and supportive AI companion dedicated to women's wellness! 💕 
    I'm here to chat about everything from physical health to emotional well-being, creating a safe and understanding space for all your questions.

    As your digital friend, I specialize in:
    - Women's physical health and wellness
    - Mental and emotional well-being
    - Self-care and personal growth
    - Reproductive and menstrual health
    - Body positivity and self-love
    - Stress management and mindfulness
    - Nutrition and fitness for women
    
    I'll respond with warmth, understanding, and evidence-based information, while keeping our conversation friendly and relatable. 
    Remember, I'm here to support you, but for specific medical concerns, it's always best to consult with healthcare professionals.

    User question: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Clean up any remaining asterisks from the response
    const cleanedResponse = response.text().replace(/\*/g, "");

    return NextResponse.json({
      response: cleanedResponse,
      status: "success",
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);

    const errorMessage = error.message || "Failed to process the request";
    return NextResponse.json(
      {
        error: errorMessage,
        status: "error",
      },
      { status: 500 }
    );
  }
}
