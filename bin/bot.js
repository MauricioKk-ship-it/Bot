#!/usr/bin/env node
import readlineSync from "readline-sync";
import duckduckgo from "duckduckgo";
import { learnFromGemini } from "../log/Apt.js";
import { saveKnowledge } from "../log/knowledge.js";

async function askQuestion(question) {
  console.log("🤖 Recherche sur DuckDuckGo...");
  const results = await duckduckgo.search(question);

  console.log("\n📚 Résultats trouvés :");
  results.slice(0, 5).forEach((r, i) => console.log(`${i + 1}. ${r.title} - ${r.url}`));

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
