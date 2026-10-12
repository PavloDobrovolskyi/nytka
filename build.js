// Збирає сайт у папку dist/:          node build.js       (без залежностей, будь-який Node 16+)
// Збирає застосунок у папку app/www/:  node build.js app   (потрібен npm install у app/)
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = __dirname;
const kb = n => (n / 1024).toFixed(0) + " КБ";
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

if (process.argv[2] === "app") { buildApp(); return; }

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

console.log(`Готово: dist/ · index.html ${kb(Buffer.byteLength(html))} · ${files.length + 1} файлів · ${version}`);

// ---------- застосунок для iOS/Android (Capacitor) ----------
// Той самий код, що й сайт, плюс нативний шар з app/src: сховище, нагадування, блокування, PDF, щоденник тощо.
function buildApp() {
  const APP = path.join(ROOT, "app");
  const WWW = path.join(APP, "www");
  const esbuild = require(path.join(APP, "node_modules", "esbuild"));
  fs.rmSync(WWW, { recursive: true, force: true });
  fs.mkdirSync(WWW, { recursive: true });

  const js = SCRIPTS.map(f => fs.readFileSync(path.join(SRC, f), "utf8")).join("\n");
  let tpl = fs.readFileSync(path.join(SRC, "index.html"), "utf8");
  const swTag = /<script>if\("serviceWorker"[\s\S]*?<\/script>\n?/;
  if (!swTag.test(tpl)) throw new Error("Не знайшов реєстрацію sw.js у шаблоні");
  tpl = tpl
    .replace('<link rel="manifest" href="manifest.webmanifest">\n', "")
    .replace(swTag, "")
    .replace("<script>\n/*@APP@*/", '<link rel="stylesheet" href="app.css">\n<script src="native.js"></script>\n<script>\n/*@APP@*/');
  const html = tpl.replace("/*@APP@*/", () => js);
  fs.writeFileSync(path.join(WWW, "index.html"), html);

  fs.cpSync(PUB, WWW, { recursive: true, filter: f => !/manifest\.webmanifest$/.test(f) });
  fs.cpSync(path.join(APP, "pdf-fonts"), path.join(WWW, "pdf-fonts"), { recursive: true });
  fs.copyFileSync(path.join(APP, "src", "app.css"), path.join(WWW, "app.css"));

  const common = { bundle: true, minify: true, format: "iife", target: ["es2020", "safari15"], charset: "utf8", logLevel: "warning" };
  esbuild.buildSync({ ...common, entryPoints: [path.join(APP, "src", "main.js")], outfile: path.join(WWW, "native.js") });
  // jsPDF вміє малювати HTML через html2canvas/canvg/dompurify — нам це не потрібно, тож не тягнемо їх у збірку
  esbuild.buildSync({ ...common, entryPoints: [path.join(APP, "src", "pdf.js")], outfile: path.join(WWW, "pdf.js"), external: ["html2canvas", "canvg", "dompurify", "core-js"] });

  const size = f => kb(fs.statSync(path.join(WWW, f)).size);
  console.log(`Готово: app/www · index.html ${size("index.html")} · native.js ${size("native.js")} · pdf.js ${size("pdf.js")}`);
}
