import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { message, images, medicalHistory } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Enhanced prompt specifically for women's health
    const systemPrompt = `You are a specialized AI health assistant focused on women's health and disease prediction. 
    Your role is to analyze symptoms, medical history, and images to provide preliminary health insights specifically for women.
    
    IMPORTANT GUIDELINES:
    - Focus on women's health conditions including PCOS, endometriosis, breast cancer, cervical cancer, ovarian issues, reproductive health, hormonal imbalances
    - Always emphasize that this is a preliminary analysis and recommend consulting healthcare professionals
    - Be empathetic and supportive in your responses
    - If analyzing medical images, describe what you observe and suggest possible conditions, but always recommend professional medical evaluation
    - Provide actionable next steps and lifestyle recommendations when appropriate
    - Consider age-specific health concerns (teenage, reproductive age, menopause, elderly)
    - Format your response clearly with headers and bullet points for better readability
    - Use **bold text** for important sections and warnings
    - Always include a disclaimer about consulting healthcare professionals
    
    RESPONSE FORMAT:
    - Start with a brief overview
    - Use **Analysis:** for your main findings
    - Use **Recommendations:** for actionable advice
    - Use **Next Steps:** for what the person should do
    - End with **Important Disclaimer:** about medical consultation
    
    Medical History Context: ${medicalHistory || "Not provided"}
    
    Please analyze the following query and provide helpful insights:`;

    let parts = [systemPrompt, message];

    // Process images if provided
    if (images && images.length > 0) {
      for (const imageData of images) {
        // Extract MIME type from data URL
        const mimeTypeMatch = imageData.match(/^data:([^;]+);base64,/);
        const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : "image/jpeg";

        // Remove data URL prefix if present
        const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, "");

        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        });
      }
    }

    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      analysis: text,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in AI prediction:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to analyze your query. Please try again.",
      },
      { status: 500 }
    );
  }
}
