import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function learnFromGemini(question, results) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const context = results.map(r => `${r.title} - ${r.url}`).join("\n");

    const prompt = `
    Tu es le professeur de mon IA.
    Question : ${question}
    Résultats DuckDuckGo :
    ${context}
    Explique de façon claire, lisible et éducative.
    `;

    const resp = await model.generateContent(prompt);
    return resp.response.text();
  } catch (err) {
    console.error("Erreur Gemini:", err.message);
    return "⚠️ Impossible d’apprendre pour l’instant.";
  }
}
