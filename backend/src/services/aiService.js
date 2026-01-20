import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  TECH_ANALYST_SYSTEM_PROMPT,
  GHOSTWRITER_SYSTEM_PROMPT,
} from "../utils/prompts.js";

// Use 1.5-flash for higher rate limits
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
  generationConfig: { responseMimeType: "application/json" }, // Force JSON output
});

export const generateSocialPost = async (
  activityData,
  platform = "twitter",
  tone = "casual",
) => {
  // MERGED PROMPT: We ask for both the analysis AND the post in one go.
  const combinedPrompt = `
  You are an AI pipeline for DevPostGen. Perform two steps.

  ### STEP 1: ANALYZE (The Tech Lead)
  ${TECH_ANALYST_SYSTEM_PROMPT}

  ### STEP 2: WRITE POST (The Ghostwriter)
  ${GHOSTWRITER_SYSTEM_PROMPT}

  ---
  
  ### INPUT CONTEXT:
  - **Raw Activity Data**: ${JSON.stringify(activityData)}
  - **Target Platform**: ${platform}
  - **Target Tone**: ${tone}

  ### OUTPUT INSTRUCTIONS:
  Return a valid JSON object with exactly two keys:
  {
    "technical_summary": "The concise 2-sentence technical summary",
    "social_post": "The final generated post text based on the summary"
  }
  `;

  try {
    const result = await model.generateContent(combinedPrompt);
    const response = await result.response;
    const jsonResponse = JSON.parse(response.text());

    return {
      summary: jsonResponse.technical_summary,
      post: jsonResponse.social_post,
    };
  } catch (error) {
    console.error("AI Generation Error:", error);

    // Graceful degradation if API fails
    if (error.message.includes("429")) {
      throw new Error(
        "AI is currently overloaded. Please try again in 30 seconds.",
      );
    }

    // Fallback if parsing fails
    return {
      summary: "Analyzed daily activity.",
      post: "Just checking in! #coding",
    };
  }
};
