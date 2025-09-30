#!/usr/bin/env node
import readlineSync from "readline-sync";
import duckduckgo from "duckduckgo-search";
import { learnFromGemini } from "../log/Apt.js";
import { saveKnowledge } from "../log/knowledge.js";

async function askQuestion(question) {
  console.log("🤖 Recherche sur DuckDuckGo...");
  const results = await duckduckgo(question, { maxResults: 5 });

  console.log("\n📚 Résultats trouvés :");
  results.forEach((r, i) => console.log(`${i + 1}. ${r.title} - ${r.url}`));

  // Gemini = prof -> enrichit le savoir
  const enriched = await learnFromGemini(question, results);
  await saveKnowledge(question, enriched);

  console.log("\n✅ Savoir enregistré !");
}

async function main() {
  while (true) {
    const query = readlineSync.question("\n💬 Pose ta question (ou 'exit'): ");
    if (query.toLowerCase() === "exit") break;
    await askQuestion(query);
  }
}

main();
