import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function checkSymptoms(symptoms: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `As a medical AI assistant for Vrinda Face & Superspeciality Hospital, analyze the following symptoms and provide a preliminary assessment. 
      IMPORTANT: Include a strong disclaimer that this is not a professional medical diagnosis and the user should consult a doctor immediately for serious concerns.
      
      Symptoms: ${symptoms}
      
      Structure the response with:
      1. Possible Causes (brief)
      2. Recommended Department at Vrinda Hospital
      3. Urgency Level
      4. Next Steps`,
      config: {
        systemInstruction: "You are a helpful and cautious medical AI assistant. You provide information based on symptoms but always emphasize the need for professional medical consultation.",
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm unable to process your request at the moment. Please consult a medical professional directly.";
  }
}
