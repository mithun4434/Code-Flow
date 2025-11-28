import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeRuntimeError = async (
  code: string,
  errorOutput: string,
  language: string
): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `
      You are an expert code debugger.
      The following ${language} code failed to run or produced an error in a sandboxed environment.
      
      CODE:
      \`\`\`${language}
      ${code}
      \`\`\`
      
      ERROR OUTPUT:
      ${errorOutput}
      
      Please explain what caused this error and suggest a fix. Keep it concise and technical.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Unable to generate analysis.";
  } catch (err) {
    console.error("Gemini Analysis Error:", err);
    return "AI Analysis unavailable. Please check your API key.";
  }
};

export const optimizeCode = async (
  code: string,
  language: string
): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `
      Analyze this ${language} code for performance improvements and best practices.
      
      CODE:
      \`\`\`${language}
      ${code}
      \`\`\`
      
      Return the response in Markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No optimizations found.";
  } catch (err) {
    console.error("Gemini Optimization Error:", err);
    return "Optimization service unavailable.";
  }
};
