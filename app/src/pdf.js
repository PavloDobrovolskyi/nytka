// PDF «для терапевта». Окремий файл: завантажується лише тоді, коли людина натискає кнопку.
import { jsPDF } from "jspdf";

const INK = "#151514", MUTED = "#67655f", LINE = "#d8d5cc", RED = "#c81e2a", SOFT = "#f3f2ee";
const FONTS = [["commissioner-400.ttf", "Commissioner", "normal"], ["commissioner-600.ttf", "Commissioner", "bold"], ["unbounded-600.ttf", "Unbounded", "normal"]];
let fontData = null;

function toB64(buf) {
  const bytes = new Uint8Array(buf); let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
}
async function loadFonts() {
  if (fontData) return fontData;
  fontData = await Promise.all(FONTS.map(async ([f]) => toB64(await (await fetch("pdf-fonts/" + f)).arrayBuffer())));
  return fontData;
}

async function make(m) {
  const data = await loadFonts();
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  FONTS.forEach(([f, name, style], i) => { doc.addFileToVFS(f, data[i]); doc.addFont(f, name, style); });
  const W = 210, Hp = 297, M = 18, CW = W - 2 * M;
  let y = M;

  const font = (f, size, color, style) => { doc.setFont(f, style || "normal"); doc.setFontSize(size); doc.setTextColor(color || INK); };
  const lineH = size => size * 0.3528 * 1.45; // pt → mm × міжрядок
  const need = h => { if (y + h > Hp - M - 8) { doc.addPage(); y = M; } };
  const para = (text, size, color, x = M, w = CW, style) => {
    font("Commissioner", size, color, style);
    const lines = doc.splitTextToSize(text, w);
    for (const ln of lines) { need(lineH(size)); doc.text(ln, x, y + size * 0.3528); y += lineH(size); }
  };
  const heading = text => { need(16); y += 4; font("Unbounded", 13, INK); doc.text(text, M, y + 4.6); y += 8; doc.setDrawColor(INK); doc.setLineWidth(0.5); doc.line(M, y, M + CW, y); y += 5; };

  // знак-вишивка цінності (сітка 11×11, хрестики)
  const sign = (cells, color, x0, y0, size) => {
    const u = size / 11, p = u * 0.2;
    doc.setLineWidth(u * 0.26); doc.setLineCap("round");
    for (const [cx, cy, val] of cells) {
      doc.setDrawColor(val === 1 ? INK : color);
      const X = x0 + cx * u, Y = y0 + cy * u;
      doc.line(X + p, Y + p, X + u - p, Y + u - p); doc.line(X + u - p, Y + p, X + p, Y + u - p);
    }
  };
  // шкала 0–10: чорна точка — важливо, червоне кільце — як живу зараз
  const scale = (imp, liv, x0, y0, w) => {
    doc.setDrawColor(LINE); doc.setLineWidth(0.6); doc.line(x0, y0, x0 + w, y0);
    const X = v => x0 + (v / 10) * w;
    doc.setDrawColor(RED); doc.setLineWidth(1.4); doc.line(X(Math.min(imp, liv)), y0, X(Math.max(imp, liv)), y0);
    doc.setFillColor(INK); doc.circle(X(imp), y0, 1.4, "F");
    doc.setFillColor("#ffffff"); doc.setDrawColor(RED); doc.setLineWidth(0.7); doc.circle(X(liv), y0, 1.3, "FD");
  };

  // шапка
  font("Unbounded", 22, INK); doc.text(m.title, M, y + 7); y += 12;
  font("Commissioner", 10.5, MUTED); doc.text(`${m.subtitle} · ${m.date}`, M, y + 3.5); y += 10;

  const L = m.labels;
  const value = (v, i) => {
    need(26);
    const top = y;
    sign(v.cells, v.color, M, top, 13);
    const x = M + 18, w = CW - 18;
    font("Commissioner", 12.5, INK, "bold"); doc.text(`${i + 1}. ${v.name}`, x, top + 4.5);
    const nw = doc.getTextWidth(`${i + 1}. ${v.name}`);
    font("Commissioner", 9.5, MUTED); doc.text(v.other, x + nw + 3, top + 4.5);
    y = top + 8;
    if (v.imp != null && v.liv != null) {
      const g = v.imp - v.liv;
      font("Commissioner", 9.5, INK); const lbl = `${L.imp} ${v.imp}/10 · ${L.liv} ${v.liv}/10 · ${L.gap} ${g > 0 ? "−" : g < 0 ? "+" : ""}${Math.abs(g)}`;
      doc.text(lbl, x, y + 3.2); scale(v.imp, v.liv, x + doc.getTextWidth(lbl) + 5, y + 2.1, Math.min(42, w - doc.getTextWidth(lbl) - 6)); y += 6;
    }
    y = Math.max(y, top + 15);
    if (v.note) { para(L.note, 8.5, MUTED, x, w, "bold"); para(v.note, 10, INK, x, w); y += 1; }
    if (v.ex) { para(L.ex, 8.5, MUTED, x, w, "bold"); para(v.ex, 10, INK, x, w); }
    y += 4; doc.setDrawColor(LINE); doc.setLineWidth(0.2); need(2); doc.line(x, y - 2, M + CW, y - 2);
  };

  if (m.top.length) { heading(L.top); m.top.forEach(value); }
  if (m.rest.length) { heading(L.rest); m.rest.forEach(value); }

  if (m.prep.items.length || m.prep.text) {
    heading(L.prep + (m.prep.date ? ` · ${m.prep.date}` : ""));
    m.prep.items.forEach((n, i) => para(`${i + 1}. ${n}`, 10.5, INK));
    if (m.prep.text) { y += 2; para(L.prepText, 8.5, MUTED, M, CW, "bold"); para(m.prep.text, 10.5, INK); }
  }
  if (m.journal.length) {
    heading(L.journal);
    for (const j of m.journal) {
      const head = [j.d, j.name, j.step ? L.step : ""].filter(Boolean).join(" · ");
      need(10); para(head, 9, MUTED, M, CW, "bold"); if (j.text) para(j.text, 10, INK); y += 1.5;
    }
  }

  // нижній колонтитул на кожній сторінці
  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p); font("Commissioner", 8, MUTED);
    doc.text(`${L.made} · ${m.date}`, M, Hp - 10);
    doc.text(`${p} / ${pages}`, W - M, Hp - 10, { align: "right" });
  }
  return doc.output("datauristring").split(",")[1];
}

window.NYPDF = { make };
