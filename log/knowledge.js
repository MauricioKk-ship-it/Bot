import fs from "fs";
const file = new URL("./knowledge.json", import.meta.url).pathname;

export async function saveKnowledge(question, answer) {
  let data = [];
  if (fs.existsSync(file)) {
    data = JSON.parse(fs.readFileSync(file, "utf-8"));
  }
  data.push({ question, answer, date: new Date().toISOString() });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
