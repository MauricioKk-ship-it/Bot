#!/usr/bin/env node
import readlineSync from "readline-sync";

// Fetch pour DuckDuckGo
async function searchDuck(query) {
  console.log("🤖 Recherche sur DuckDuckGo...");
  const res = await fetch(
    `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`
  );
  const data = await res.json();

  // On extrait les premiers résultats
  const results = data.RelatedTopics
    .filter(t => t.Text && t.FirstURL)
    .map(t => ({ title: t.Text, url: t.FirstURL }));

  console.log("\n📚 Résultats trouvés :");
  results.slice(0, 5).forEach((r, i) => {
    console.log(`${i + 1}. ${r.title} - ${r.url}`);
  });

  return results;
}

// Exemple d’intégration Gemini
import { learnFromGemini } from "../log/Apt.js";
import { saveKnowledge } from "../log/knowledge.js";

async function askQuestion(question) {
  const results = await searchDuck(question);

  console.log("\n🤖 Gemini analyse les résultats...");
  const enriched = await learnFromGemini(question, results);

  await saveKnowledge(question, enriched);
  console.log("\n✅ Savoir enregistré !");
}

async function main() {
  console.log("💡 Bot Dragon démarré ! Tape 'exit' pour quitter.");

  while (true) {
    const query = readlineSync.question("\n💬 Pose ta question : ");
    if (query.toLowerCase() === "exit") break;
    await askQuestion(query);
  }

  console.log("👋 Au revoir !");
}

main();
