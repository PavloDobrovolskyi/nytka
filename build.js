// Збирає сайт у папку dist/. Запуск: node build.js
// Без залежностей — працює на будь-якому Node 16+.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = __dirname;
const SRC = path.join(ROOT, "src");
const PUB = path.join(ROOT, "public");
const OUT = path.join(ROOT, "dist");

// Порядок важливий: спершу контент, потім застосунок.
const SCRIPTS = [
  "content/uk-values.js",          // 166 цінностей (жовті й сині) українською
  "content/uk-values-red.js",      // 26 «червоних» цінностей
  "content/uk-shadow-and-steps.js",// «коли її забагато» і «маленький крок» українською
  "content/en-1.js",               // англійські тексти
  "content/en-2.js",
  "content/en-3.js",
  "app.js"                         // інтерфейс і логіка
];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// 1. index.html: шаблон + вбудовані скрипти (один файл = одне завантаження)
const js = SCRIPTS.map(f => fs.readFileSync(path.join(SRC, f), "utf8")).join("\n");
const tpl = fs.readFileSync(path.join(SRC, "index.html"), "utf8");
if (!tpl.includes("/*@APP@*/")) throw new Error("У src/index.html немає мітки /*@APP@*/");
const html = tpl.replace("/*@APP@*/", () => js);
fs.writeFileSync(path.join(OUT, "index.html"), html);

// 2. Статичні файли з public/ без змін
fs.cpSync(PUB, OUT, { recursive: true });

// 3. sw.js: список файлів і версія (хеш вмісту) — щоб телефони самі підтягували оновлення
const files = [];
(function walk(dir, rel) {
  for (const name of fs.readdirSync(dir).sort()) {
    const full = path.join(dir, name), r = rel ? rel + "/" + name : name;
    if (fs.statSync(full).isDirectory()) walk(full, r);
    else if (!name.endsWith(".txt")) files.push(r);
  }
})(OUT, "");
const hash = crypto.createHash("sha256");
for (const f of files) hash.update(f).update(fs.readFileSync(path.join(OUT, f)));
const version = "nytka-" + hash.digest("hex").slice(0, 10);
const sw = fs.readFileSync(path.join(SRC, "sw.js"), "utf8")
  .replace("__VERSION__", version)
  .replace("__FILES__", JSON.stringify(["./", ...files]));
fs.writeFileSync(path.join(OUT, "sw.js"), sw);

const kb = n => (n / 1024).toFixed(0) + " КБ";
console.log(`Готово: dist/ · index.html ${kb(Buffer.byteLength(html))} · ${files.length + 1} файлів · ${version}`);
