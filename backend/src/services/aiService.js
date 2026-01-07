import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  TECH_ANALYST_SYSTEM_PROMPT,
  GHOSTWRITER_SYSTEM_PROMPT,
} from "../utils/prompts.js";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Step 1: Convert raw GitHub JSON into a technical summary
 */
const generateTechnicalSummary = async (activityData) => {
  const prompt = `
  ${TECH_ANALYST_SYSTEM_PROMPT}
  
  RAW DATA:
  ${JSON.stringify(activityData, null, 2)}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Summary Error:", error);
    return "Updated some files."; // Fallback
  }
};

/**
 * Step 2: Convert technical summary into a social post
 */
export const generateSocialPost = async (
  activityData,
  platform = "twitter",
  tone = "casual"
) => {
  // 1. Get the facts first
  const technicalSummary = await generateTechnicalSummary(activityData);

  // 2. Draft the post
  const prompt = `
  ${GHOSTWRITER_SYSTEM_PROMPT}

  CONTEXT:
  - Platform: ${platform}
  - Tone: ${tone}
  - Work Done: ${technicalSummary}

  Generate the post text only. No preamble.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return {
      summary: technicalSummary,
      post: response.text().trim(),
    };
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate post.");
  }
};
