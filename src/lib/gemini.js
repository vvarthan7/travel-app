import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is required but not set. Please set your Google Gemini API key.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Free model
