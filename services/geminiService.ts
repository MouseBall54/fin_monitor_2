
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AnalysisState, NewsItem } from "../types";

export const fetchMacroAnalysis = async (indicators: any[]): Promise<AnalysisState> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  const prompt = `
    As a senior macroeconomic analyst, provide a professional summary and risk assessment based on these indicators:
    ${JSON.stringify(indicators)}
    
    Identify potential risks, key takeaways, and assign a market risk level (low, medium, or high).
    Return the response in a structured format with summary, riskLevel, and keyTakeaways.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const data = JSON.parse(response.text || "{}");
    return {
      summary: data.summary || "Unable to generate analysis.",
      riskLevel: data.riskLevel || "medium",
      keyTakeaways: data.keyTakeaways || [],
      lastUpdated: new Date().toLocaleTimeString(),
    };
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const fetchLatestMacroNews = async (): Promise<NewsItem[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  const prompt = "What are the top 5 global macroeconomic news events happening right now? Focus on Central Banks, Inflation, and Geopolitics.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    // Extract grounding chunks as source links
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const news: NewsItem[] = chunks.map((chunk: any, index: number) => ({
      title: chunk.web?.title || `Macro Event ${index + 1}`,
      url: chunk.web?.uri || "#",
      source: "Google Search",
      snippet: chunk.web?.title || "Latest updates from global markets.",
    }));

    return news.slice(0, 5);
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [];
  }
};
