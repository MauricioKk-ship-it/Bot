#!/usr/bin/env node
import readlineSync from "readline-sync";
import pkg from "duckduckgo";
const duckduckgo = pkg;

import { learnFromGemini } from "../log/Apt.js";
import { saveKnowledge } from "../log/knowledge.js";

// Fonction pour faire une recherche DuckDuckGo
async function searchDuck(query) {
  console.log("🤖 Recherche sur DuckDuckGo...");
  try {
    const results = await duckduckgo.search(query);

    console.log("\n📚 Résultats trouvés :");
    results.slice(0, 5).forEach((r, i) => {
      console.log(`${i + 1}. ${r.title} - ${r.url}`);
    });

    return results;
  } catch (err) {
    console.error("❌ Erreur DuckDuckGo :", err);
    return [];
  }
}

// Fonction principale pour poser une question et apprendre
async function askQuestion(question) {
  const results = await searchDuck(question);

  console.log("\n🤖 Gemini analyse les résultats...");
  const enriched = await learnFromGemini(question, results);

  await saveKnowledge(question, enriched);
  console.log("\n✅ Savoir enregistré !");
}

// Boucle principale du bot
async function main() {
  console.log("💡 Bot Dragon démarré ! Tape 'exit' pour quitter.");

  while (true) {
    const query = readlineSync.question("\n💬 Pose ta question : ");
    if (query.toLowerCase() === "exit") break;
    await askQuestion(query);
  }

  console.log("👋 Au revoir !");
}

// Lancer le bot
main();
