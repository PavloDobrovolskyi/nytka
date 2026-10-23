// Функції, яких немає на сайті: «Сьогодні», щоденник, підготовка до сесії, перевірка місяця з графіком,
// налаштування (нагадування, блокування), свайпи, PDF, резервна копія файлом, віджет.
import * as P from "./platform.js";
import { S as STR } from "./strings.js";

export const KEY = "nytka-v1";
export const LOCK_KEY = "nytka-lock";
const HEX = { red: "#c81e2a", indigo: "#2c3c9a", green: "#2c6b47", ochre: "#b4761a", plum: "#7b2c6c", teal: "#11707a" };

let A = null, H = null, booted = false, pendingView = null;
let resolveAttached; export const attached = new Promise(r => (resolveAttached = r));
const ui = { composer: null, del: null, prepArm: false, pickFocus: false, ck: {}, pinForm: false, bio: { available: false, type: "" }, notif: "", backup: null, lockArm: false, paused: 0, locked: false, ver: "" };

const t = k => A.t(k);
const esc = s => A.esc(s);
const $ = s => document.querySelector(s);
const blankX = () => ({ focus: null, journal: [], checks: [], prep: { items: [], text: "", date: "" }, set: { weekly: { on: false, wd: 1, h: 19, m: 0 }, monthly: { on: false } }, swipes: 0, sortDone: null, history: [] });
function X() { const D = A.D; if (!D.x) D.x = blankX(); const b = blankX(); for (const k in b) if (D.x[k] == null) D.x[k] = b[k]; return D.x; }
const mineVals = () => A.V.filter(v => A.S(v.e).s === 2);
const focusVal = () => { const f = X().focus; return f && A.S(f).s === 2 ? A.BY[f] : null; };
const dayKey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const daysBetween = (a, b) => Math.floor((b - a) / 864e5);
const loc = () => (A.D.lang === "en" ? "en-GB" : "uk-UA");
const fmtDate = (d, o) => new Intl.DateTimeFormat(loc(), o).format(d);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const ICONS = {
  today: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>',
  journal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h11a2 2 0 012 2v16H8a2 2 0 01-2-2z"/><path d="M6 19a2 2 0 012-2h11M10 7h6M10 11h6"/></svg>',
  session: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 5h11a2 2 0 012 2v6a2 2 0 01-2 2H9l-4 3v-3H4a2 2 0 01-2-2V7a2 2 0 012-2z"/><path d="M17 9h3a2 2 0 012 2v5a2 2 0 01-2 2h-1v3l-4-3h-3"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>'
};

/* ================= підключення до ядра ================= */
export function attach(api, hooks) {
  A = api; H = hooks;
  Object.assign(A.T.uk, STR.uk); Object.assign(A.T.en, STR.en); Object.assign(A.IC, ICONS);
  H.home = "today";
  // Вкладки: Сьогодні (зі щоденником) · Цінності (сортування + усі) · Мої · Сесія; налаштування — шестерня
  H.tabs = () => [["today", t("today")], ["values", t("libShort")], ["mine", t("mine")], ["session", t("sessionT")]];
  H.bottom = H.tabs;
  H.route = v => { if (v === "sort" || v === "lib") { ui.valMode = v; return "values"; } if (v === "prep") return "session"; return v; };
  H.tabOf = v => ({ journal: "today", check: "mine" })[v] || v;
  Object.assign(H.views, { today, journal, values, session, check, settings });
  A.IC.values = A.IC.lib;
  H.noSummary = true;  // «Підсумок» живе у вкладці «Сесія»
  H.afterRender = afterRender;
  H.onPick = () => P.haptic("light");
  H.acceptsX = true;   // код резервної копії переносить і щоденник, перевірки, підготовку
  H.ownSwipe = true;   // свайпи на картці — свої (з вібрацією і підказкою)
  H.shortCard = true;  // у застосунку картка сортування коротка, повний опис — у «Детальніше»
  H.onChange = onDataChange;
  H.onWipe = () => { A.D.x = blankX(); };
  H.sheetExtra = v => `<section class="me xme" id="xme">${xme(v)}</section>`;
  H.mineExtra = mineExtra;
  H.sumTools = () => `<button class="btn small" data-x="pdf">${esc(t("pdfBtn"))}</button>`;
  H.share = (text, url) => P.shareText(text + " " + url, "Нитка").then(r => r === "copied" && toast(A.t("linkCopied")));
  H.backupPanel = () => "";  // резервна копія — лише в налаштуваннях
  document.documentElement.classList.add("is-app", "is-" + P.platform);
  document.addEventListener("click", onClick, true);
  document.addEventListener("input", onInput);
  document.addEventListener("change", onChangeEv);
  const lang = document.querySelector(".top .lang");
  if (lang && !$("#gear")) lang.insertAdjacentHTML("beforebegin", `<button class="ib gear" data-go="settings" id="gear">${ICONS.gear}</button>`);
  document.body.insertAdjacentHTML("beforeend", `<div class="toast" id="toast" role="status" aria-live="polite"></div><div class="doc-wrap" id="doc" hidden></div>`);
  P.onBack(onBack);
  P.onNotificationTap(ex => { if (!ex.view) return; booted ? A.go(ex.view) : (pendingView = ex.view); });
  P.onPause(() => { ui.paused = Date.now(); P.flush(); });
  P.onResume(() => { if (lockCfg().on && ui.paused && Date.now() - ui.paused > 30000) showLock(); });
  P.biometry().then(b => (ui.bio = b));
  P.appVersion().then(v => (ui.ver = v));
  resolveAttached();
}

function afterRender(v) {
  const g = $("#gear"); if (g) { g.setAttribute("aria-label", t("settings")); g.toggleAttribute("aria-current", v === "settings"); }
  if (!booted) { booted = true; onDataChange(); if (pendingView) { const pv = pendingView; pendingView = null; setTimeout(() => A.go(pv), 0); } }
  if (v === "sort" || v === "values") { valSeg(); if (ui.valMode === "sort") swipes(); }
}

function onBack() {
  if (!$("#doc").hidden) { closeDoc(); return; }
  if (ui.locked) return;
  if (A.sess.openE) { A.closeDetail(); return; }
  if (A.view !== "today") { A.go("today"); return; }
  P.minimize();
}

function toast(msg) {
  const el = $("#toast"); if (!el) return;
  el.textContent = msg; el.classList.add("on");
  clearTimeout(ui.toastT); ui.toastT = setTimeout(() => el.classList.remove("on"), 2200);
}

/* ================= зміни даних: віджет і нагадування ================= */
let chgT = null, lastSig = "";
function onDataChange() {
  clearTimeout(chgT);
  chgT = setTimeout(() => {
    if (!A.D) return;
    { const x = X(), full = !A.counts()[0]; if (full && !x.sortDone) { x.sortDone = new Date().toISOString(); A.save(); } }
    const fv = focusVal(), tops = mineVals().filter(v => A.S(v.e).top);
    const pick = fv || tops[0] || mineVals()[0] || null;
    P.widgetUpdate(JSON.stringify({
      lang: A.D.lang, label: t("widgetLabel"), empty: t("widgetEmpty"),
      name: pick ? A.nm(pick) : "", step: pick ? A.f(pick, "k") : "",
      color: pick ? HEX[A.COL[pick.c]] : HEX.red, cells: pick ? A.cells(pick.e) : []
    }));
    const s = X().set, sig = JSON.stringify([A.D.lang, fv && fv.e, s]);
    if (sig !== lastSig) { lastSig = sig; if (s.weekly.on || s.monthly.on) reschedule(false); }
  }, 600);
}
async function reschedule(ask) {
  const s = X().set, fv = focusVal(), list = [];
  if (s.weekly.on) list.push({ id: 1001, title: t("nWeeklyT"), body: t("nWeeklyB")(fv ? A.nm(fv) : "", fv ? A.f(fv, "k") : ""), schedule: { on: { weekday: s.weekly.wd + 1, hour: s.weekly.h, minute: s.weekly.m } }, smallIcon: "ic_stat_nytka", extra: { view: "today" } });
  if (s.monthly.on) list.push({ id: 1002, title: t("nMonthlyT"), body: t("nMonthlyB"), schedule: { on: { day: 1, hour: s.weekly.h, minute: s.weekly.m } }, smallIcon: "ic_stat_nytka", extra: { view: "check" } });
  if (list.length) { ui.notif = await P.notifyPermission(ask); if (ui.notif !== "granted") return; }
  await P.scheduleAll(list);
}

/* ================= «Цінності»: сортування + усі цінності ================= */
function values() {
  if (!ui.valMode) ui.valMode = A.counts()[0] ? "sort" : "lib";
  ui.valMode === "sort" ? A.sortView() : A.libView();
}
function valSeg() {
  if ($("#vseg")) return;
  $("#view").insertAdjacentHTML("afterbegin", `<div class="seg vseg" id="vseg"><button data-x="vmode" data-m="sort" aria-pressed="${ui.valMode === "sort"}">${esc(t("sort"))}</button><button data-x="vmode" data-m="lib" aria-pressed="${ui.valMode === "lib"}">${esc(t("allSeg"))}</button></div>`);
}

/* ================= пересортування раз на пів року ================= */
const RESORT_DAYS = 182;
function resortState() {
  const x = X(); if (!x.sortDone) return { due: false, next: null };
  const left = RESORT_DAYS - daysBetween(Date.parse(x.sortDone), Date.now());
  return { due: left <= 0, next: new Date(Date.parse(x.sortDone) + RESORT_DAYS * 864e5) };
}
function startResort() {
  const x = X(), my = mineVals();
  x.history.push({ d: dayKey(new Date()), mine: my.map(v => v.e), top: my.filter(v => A.S(v.e).top).map(v => v.e) });
  for (const e in A.D.st) { const s = A.D.st[e]; s.s = 0; s.top = false; }   // оцінки й нотатки лишаються
  x.sortDone = null; A.sess.hist = []; ui.valMode = "sort"; A.save(); A.shell(); A.go("sort");
}
function resortPanel() {
  const x = X(), last = x.history[x.history.length - 1], st = resortState(), done = !A.counts()[0];
  let cmp = "";
  if (last) {
    if (!done) cmp = `<p class="muted">${esc(t("cmpWait"))}</p>`;
    else {
      const now = mineVals().map(v => v.e), was = new Set(last.mine);
      const came = now.filter(e => !was.has(e)), left = last.mine.filter(e => !now.includes(e)), stay = now.filter(e => was.has(e));
      const chips = list => list.length ? `<div class="pickchips">${list.map(e => A.BY[e]).filter(Boolean).map(v => `<button class="pchip" data-detail="${esc(v.e)}">${A.sign(v, "csign")}${esc(A.nm(v))}</button>`).join("")}</div>` : `<p class="muted small">—</p>`;
      cmp = `<p class="lbl">${esc(t("cmpCame"))}</p>${chips(came)}<p class="lbl" style="margin-top:12px">${esc(t("cmpLeft"))}</p>${chips(left)}<p class="lbl" style="margin-top:12px">${esc(t("cmpStay"))}</p>${chips(stay)}`;
    }
  }
  return `<section class="panel"><h2>${esc(last ? t("cmpT")(fmtDate(new Date(last.d + "T12:00"), { day: "numeric", month: "long", year: "numeric" })) : t("resortT"))}</h2>
    ${cmp}${st.next ? `<p class="hint" style="margin-top:12px">${esc(st.due ? t("resortDue") : t("resortNext")(fmtDate(st.next, { day: "numeric", month: "long", year: "numeric" })))}</p>` : ""}
    ${done ? `<div class="tools"><button class="btn small ${st.due ? "red" : ""}" data-x="resort">${esc(ui.resortArm ? t("resortAsk") : st.due ? t("resortGo") : t("resortNow"))}</button></div>` : ""}</section>`;
}

/* ================= «Сьогодні» ================= */
function today() {
  const x = X(), c = A.counts(), done = A.TOTAL - c[0], my = mineVals(), fv = focusVal();
  const weekAgo = Date.now() - 7 * 864e5;
  const wk = fv ? x.journal.filter(j => j.e === fv.e && Date.parse(j.d) >= weekAgo).length : 0;
  let focus;
  if (fv && !ui.pickFocus) {
    focus = `<div class="focus">${A.sign(fv, "fsign", true)}<div class="fbody"><p class="cl-name">${esc(t("focusT"))}</p><h2><button class="link" data-detail="${esc(fv.e)}">${esc(A.nm(fv))}</button></h2>
      <p class="fstep"><span class="lbl">${esc(t("step"))}</span>${esc(A.f(fv, "k"))}</p><p class="muted small">${esc(t("thisWeek")(wk))}</p></div></div>
      ${ui.composer && ui.composer.where === "today" ? composer() : `<div class="tools"><button class="btn small red" data-x="cmp" data-step="1" data-where="today">✓ ${esc(t("stepDone"))}</button><button class="btn small" data-x="cmp" data-step="0" data-where="today">${esc(t("addThought"))}</button><button class="btn small ghost" data-x="pickfocus">${esc(t("focusChange"))}</button></div>`}`;
  } else if (my.length) {
    focus = `<p class="cl-name">${esc(t("focusT"))}</p><p>${esc(t("focusPick"))}</p><div class="pickchips">${my.map(v => `<button class="pchip ${x.focus === v.e ? "on" : ""}" data-x="focus" data-e="${esc(v.e)}">${A.sign(v, "csign")}${esc(A.nm(v))}</button>`).join("")}</div>${fv ? `<p><button class="btn small ghost" data-x="pickfocus">${esc(t("cancel"))}</button></p>` : ""}`;
  } else {
    focus = `<p class="cl-name">${esc(t("focusT"))}</p><h2>${esc(t("startT"))}</h2><p class="muted">${esc(t("startP"))}</p><p><button class="btn red" data-go="sort">${esc(t("startSort"))} →</button></p>`;
  }
  const worked = my.filter(v => A.workN(v.e) === 3).length;
  const progress = `<section class="card"><h3 class="ch">${esc(t("progressT"))}</h3>
    <div class="prog"><div class="track"><i style="width:${(done / A.TOTAL) * 100}%"></i></div><span>${done} ${t("of")} ${A.TOTAL} ${t("sorted")}</span></div>
    <div class="stats"><span><b>${my.length}</b> / 12 ${esc(t("mineN"))}</span><span><b>${worked}</b> / ${my.length || 0} ${esc(t("workedN"))}</span></div>
    ${c[0] && done ? `<p><button class="btn small" data-go="sort">${esc(t("contSort"))} →</button></p>` : ""}</section>`;
  let checkCard = "";
  if (my.length) {
    const st = checkState();
    checkCard = `<section class="card"><h3 class="ch">${esc(t("checkT"))}</h3>${st.due ? `<p>${esc(t("checkDue"))}</p><p><button class="btn small red" data-go="check">${esc(t("checkGo"))} →</button></p>` : st.ready ? `<p class="muted">${esc(t("checkNext")(st.left))}</p>` : `<p class="muted">${esc(t("checkFirst"))}</p>`}</section>`;
  }
  const rs = resortState();
  const resortCard = rs.due ? `<section class="card"><h3 class="ch">${esc(t("resortT"))}</h3><p>${esc(t("resortDue"))}</p><p><button class="btn small red" data-x="resort">${esc(ui.resortArm ? t("resortAsk") : t("resortGo"))}</button></p></section>` : "";
  const recent = x.journal.slice().sort((a, b) => (a.d < b.d ? 1 : -1)).slice(0, 3);
  const jCard = `<section class="card"><h3 class="ch">${esc(t("journal"))}</h3>
    ${ui.composer && ui.composer.where === "journal" ? composer() : `<div class="tools"><button class="btn small" data-x="cmp" data-step="0" data-where="journal">${esc(t("jWrite"))}</button>${x.journal.length ? `<button class="btn small ghost" data-go="journal">${esc(t("jAll"))} →</button>` : ""}</div>`}
    ${recent.length ? `<ul class="jlist">${recent.map(j => entryHtml(j, true).replace('<div class="jmeta"><span>', `<div class="jmeta"><span>${esc(fmtDate(new Date(j.d), { day: "numeric", month: "short" }))}, `)).join("")}</ul>` : `<p class="muted small">${esc(t("jEmptyToday"))}</p>`}</section>`;
  $("#view").innerHTML = `<div class="xhead"><p class="eyebrow">${esc(fmtDate(new Date(), { weekday: "long", day: "numeric", month: "long" }))}</p><h1>${esc(t("today"))}</h1></div>
    <section class="card hero-card">${focus}</section>
    ${resortCard}${jCard}
    <div class="cards">${progress}${checkCard}</div>${A.foot()}`;
}
function checkState() {
  const x = X(), last = x.checks.length ? x.checks[x.checks.length - 1].d : null;
  const ready = mineVals().some(v => A.S(v.e).imp != null && A.S(v.e).liv != null);
  if (!last) return { due: ready, ready, left: 0 };
  const d = daysBetween(Date.parse(last + "T00:00"), Date.now());
  return { due: d >= 30, ready: true, left: Math.max(1, 30 - d) };
}

/* ================= композитор запису ================= */
function composer() {
  const c = ui.composer, my = mineVals();
  const sel = c.where === "journal" ? `<label class="fl">${esc(t("valueL"))}<select id="cmpVal"><option value="">${esc(t("noValue"))}</option>${my.map(v => `<option value="${esc(v.e)}" ${v.e === c.e ? "selected" : ""}>${esc(A.nm(v))}</option>`).join("")}</select></label>
     <label class="chk"><input type="checkbox" id="cmpStep" ${c.step ? "checked" : ""}> ${esc(t("isStep"))}</label>` : "";
  return `<div class="cmp">${sel}<textarea id="cmpText" placeholder="${esc(c.step && c.where !== "journal" ? t("howWasIt") : c.where === "journal" ? t("jPh") : t("thought"))}"></textarea>
    <div class="tools"><button class="btn small primary" data-x="cmpsave">${esc(t("save"))}</button>${c.where === "journal" && A.view === "journal" ? "" : `<button class="btn small ghost" data-x="cmpcancel">${esc(t("cancel"))}</button>`}</div></div>`;
}
function saveEntry() {
  const c = ui.composer; if (!c) return;
  const text = ($("#cmpText") || {}).value || "";
  const e = c.where === "journal" ? ($("#cmpVal") || {}).value || null : c.e;
  const step = c.where === "journal" ? !!($("#cmpStep") || {}).checked : !!c.step;
  if (!text.trim() && !step) { $("#cmpText") && $("#cmpText").focus(); return; }
  X().journal.push({ id: uid(), d: new Date().toISOString(), e, step, text: text.trim() });
  A.save(); P.haptic(step ? "success" : "light"); toast(t("saved"));
  ui.composer = c.where === "journal" && A.view === "journal" ? { where: "journal", e: X().focus, step: false } : null;
  refresh(c.where);
}
function refresh(where) {
  if (where === "sheet" && A.sess.openE) { const box = $("#xme"); if (box) box.innerHTML = xme(A.BY[A.sess.openE]); return; }
  A.rerender();
}

/* ================= щоденник ================= */
function entryHtml(j, showVal) {
  const v = j.e && A.BY[j.e], d = new Date(j.d);
  const armed = ui.del === j.id;
  return `<li class="je"><div class="jmeta"><span>${esc(fmtDate(d, { hour: "2-digit", minute: "2-digit" }))}</span>${j.step ? `<span class="badge-step">✓ ${esc(t("stepBadge"))}</span>` : ""}${showVal && v ? `<button class="vchip" data-detail="${esc(v.e)}">${A.sign(v, "csign")}${esc(A.nm(v))}</button>` : ""}
    <button class="jdel ${armed ? "armed" : ""}" data-x="jdel" data-id="${esc(j.id)}" aria-label="${esc(t("del"))}">${armed ? esc(t("delAsk")) : "✕"}</button></div>${j.text ? `<p>${esc(j.text)}</p>` : ""}</li>`;
}
function journal() {
  const x = X();
  if (!ui.composer || ui.composer.where !== "journal") ui.composer = { where: "journal", e: x.focus, step: false };
  const list = x.journal.slice().sort((a, b) => (a.d < b.d ? 1 : -1));
  const groups = []; let cur = null;
  for (const j of list) { const k = j.d.slice(0, 10); if (!cur || cur.k !== k) { cur = { k, items: [] }; groups.push(cur); } cur.items.push(j); }
  $("#view").innerHTML = `<div class="xhead"><h1>${esc(t("journalT"))}</h1><p class="muted">${esc(t("journalP"))}</p></div>
    <section class="card">${composer()}</section>
    ${groups.length ? groups.map(g => `<section class="jday"><h3>${esc(fmtDate(new Date(g.k + "T12:00"), { weekday: "long", day: "numeric", month: "long" }))}</h3><ul class="jlist">${g.items.map(j => entryHtml(j, true)).join("")}</ul></section>`).join("") : `<p class="empty">${esc(t("jEmpty"))}</p>`}
    ${A.foot()}`;
}

/* ================= розділ у картці цінності ================= */
function xme(v) {
  const x = X(), isMine = A.S(v.e).s === 2;
  const list = x.journal.filter(j => j.e === v.e).sort((a, b) => (a.d < b.d ? 1 : -1));
  const inPrep = x.prep.items.includes(v.e);
  const toggles = isMine ? `<div class="tools"><button class="btn small ${x.focus === v.e ? "on" : ""}" data-x="focus" data-e="${esc(v.e)}" data-where="sheet">${x.focus === v.e ? "★ " + esc(t("focusIs")) : "☆ " + esc(t("focusSet"))}</button>
     <button class="btn small ${inPrep ? "on" : ""}" data-x="preptoggle" data-e="${esc(v.e)}">${inPrep ? "✓ " + esc(t("prepToggleOn")) : esc(t("prepToggleOn"))}</button></div>` : "";
  const cmp = ui.composer && ui.composer.where === "sheet" && ui.composer.e === v.e ? composer()
    : `<div class="tools"><button class="btn small" data-x="cmp" data-step="1" data-where="sheet" data-e="${esc(v.e)}">✓ ${esc(t("stepDone"))}</button><button class="btn small ghost" data-x="cmp" data-step="0" data-where="sheet" data-e="${esc(v.e)}">${esc(t("addThought"))}</button></div>`;
  return `${toggles}<div class="me-head"><h3>${esc(t("jThis"))}</h3></div>
    ${list.length ? `<ul class="jlist">${list.slice(0, 5).map(j => entryHtml({ ...j }, false).replace('<div class="jmeta"><span>', `<div class="jmeta"><span>${esc(fmtDate(new Date(j.d), { day: "numeric", month: "short" }))}, `)).join("")}</ul>${list.length > 5 ? `<p><button class="link" data-go="journal">${esc(t("jMore")(list.length - 5))} →</button></p>` : ""}` : `<p class="muted small">${esc(t("jThisEmpty"))}</p>`}
    ${cmp}`;
}

/* ================= «Мої»: графік і підготовка до сесії ================= */
function mineExtra() {
  const x = X(), my = mineVals();
  let trend = "";
  if (my.length) {
    trend = `<section class="panel"><h2>${esc(t("trendT"))}</h2><p class="hint">${esc(t("trendHint"))}</p>${x.checks.length ? chart() : `<p class="empty" style="padding:6px 0">${esc(checkState().ready ? t("checkDue") : t("checkFirst"))}</p>`}
      <div class="tools"><button class="btn small ${checkState().due ? "red" : ""}" data-go="check">${esc(t("checkGo"))} →</button></div></section>`;
  }
  return `${trend}${x.history.length || x.sortDone ? resortPanel() : ""}`;
}
function chart() {
  const x = X(), snaps = x.checks.slice(-12);
  const my = mineVals(), tops = my.filter(v => A.S(v.e).top);
  const lines = (tops.length ? tops : my.slice(0, 5)).map(v => ({ v, pts: snaps.map((s, i) => (s.v[v.e] ? { i, g: s.v[v.e][0] - s.v[v.e][1] } : null)).filter(Boolean) })).filter(l => l.pts.length);
  const avg = snaps.map((s, i) => { const vals = Object.values(s.v); return vals.length ? { i, g: vals.reduce((a, b) => a + (b[0] - b[1]), 0) / vals.length } : null; }).filter(Boolean);
  const all = [0, ...avg.map(p => p.g), ...lines.flatMap(l => l.pts.map(p => p.g))];
  let lo = Math.floor(Math.min(...all)), hi = Math.ceil(Math.max(...all, 4)); if (hi - lo < 4) hi = lo + 4;
  const W = 420, Hh = 210, L = 28, R = 10, T = 10, B = 26, n = snaps.length;
  const X_ = i => (n === 1 ? (L + W - R) / 2 : L + (i * (W - L - R)) / (n - 1));
  const Y_ = g => T + ((hi - g) * (Hh - T - B)) / (hi - lo);
  const step = hi - lo > 8 ? 4 : 2, ticks = []; for (let g = Math.ceil(lo / step) * step; g <= hi; g += step) ticks.push(g);
  const path = pts => pts.map((p, k) => `${k ? "L" : "M"}${X_(p.i).toFixed(1)} ${Y_(p.g).toFixed(1)}`).join("");
  const PAL = ["red", "indigo", "green", "ochre", "plum", "teal"];
  lines.forEach((l, i) => (l.c = `var(--th-${PAL[i % PAL.length]})`));
  const col = v => lines.find(l => l.v === v).c;
  const svg = `<svg class="chart" viewBox="0 0 ${W} ${Hh}" role="img" aria-label="${esc(t("trendT"))}">
    ${ticks.map(g => `<line x1="${L}" x2="${W - R}" y1="${Y_(g)}" y2="${Y_(g)}" class="${g === 0 ? "zero" : "grid"}"/><text x="${L - 6}" y="${Y_(g) + 4.5}" text-anchor="end" class="ax">${g}</text>`).join("")}
    ${snaps.map((s, i) => `<text x="${X_(i)}" y="${Hh - 8}" text-anchor="${n > 1 && i === 0 ? "start" : n > 1 && i === n - 1 ? "end" : "middle"}" class="ax">${esc(fmtDate(new Date(s.d + "T12:00"), { day: "numeric", month: "short" }))}</text>`).join("")}
    ${lines.map(l => `<path d="${path(l.pts)}" fill="none" style="stroke:${col(l.v)}" stroke-width="2.2" stroke-linejoin="round"/>${l.pts.map(p => `<circle cx="${X_(p.i)}" cy="${Y_(p.g)}" r="3.5" style="fill:${col(l.v)}"/>`).join("")}`).join("")}
    <path d="${path(avg)}" fill="none" class="avg" stroke-width="3" stroke-dasharray="6 5"/>${avg.map(p => `<circle cx="${X_(p.i)}" cy="${Y_(p.g)}" r="4" class="avgdot"/>`).join("")}
  </svg>`;
  return `<div class="chartbox">${svg}</div><div class="glegend">${lines.map(l => `<span><i style="background:${col(l.v)}"></i>${esc(A.nm(l.v))}</span>`).join("")}<span><i class="avgkey"></i>${esc(t("trendAvg"))}</span></div>${n === 1 ? `<p class="muted small">${esc(t("trendOne"))}</p>` : ""}`;
}

/* ================= перевірка місяця ================= */
function check() {
  const my = mineVals();
  ui.ck = {};
  my.forEach(v => { const s = A.S(v.e); ui.ck[v.e] = { imp: s.imp, liv: s.liv }; });
  const rng = (v, k, val) => `<div class="rng ${val == null ? "unset" : ""}" id="ckw-${k}-${A.V.indexOf(v)}"><label for="ck-${k}-${A.V.indexOf(v)}">${esc(t(k))}<output id="cko-${k}-${A.V.indexOf(v)}">${val == null ? "—" : val}</output></label>
      <input type="range" min="0" max="10" step="1" value="${val == null ? 5 : val}" id="ck-${k}-${A.V.indexOf(v)}" data-ck="${esc(v.e)}" data-k="${k}"></div>`;
  $("#view").innerHTML = `<div class="xhead"><h1>${esc(t("checkT"))}</h1><p class="muted">${esc(t("checkP"))}</p></div>
    ${my.length ? `<div class="ckl">${my.map(v => { const s = A.S(v.e); return `<section class="card ck"><div class="ckh">${A.sign(v, "csign")}<b>${esc(A.nm(v))}</b></div>${rng(v, "imp", s.imp)}${rng(v, "liv", s.liv)}</section>`; }).join("")}</div>
    <div class="tools sticky-save"><button class="btn red" data-x="cksave">${esc(t("checkSave"))}</button></div>` : `<p class="empty">${esc(t("checkNoMine"))}</p>`}${A.foot()}`;
}
function saveCheck() {
  const snap = { d: dayKey(new Date()), v: {} };
  for (const e in ui.ck) { const c = ui.ck[e]; if (c.imp != null && c.liv != null) { snap.v[e] = [c.imp, c.liv]; A.setS(e, { imp: c.imp, liv: c.liv }); } }
  if (!Object.keys(snap.v).length) { toast(t("checkFirst")); return; }
  const x = X(); if (x.checks.length && x.checks[x.checks.length - 1].d === snap.d) x.checks.pop();
  x.checks.push(snap); A.save(); P.haptic("success"); toast(t("checkSaved")); A.go("mine");
}

/* ================= підготовка до сесії ================= */
function session() {
  const x = X(), p = x.prep, my = mineVals();
  const since = Date.now() - 14 * 864e5;
  const recent = x.journal.filter(j => Date.parse(j.d) >= since).sort((a, b) => (a.d < b.d ? 1 : -1));
  const rows = p.items.map(e => A.BY[e]).filter(Boolean).map(v => { const s = A.S(v.e); const sub = [s.imp != null && s.liv != null ? `${t("sumImp")} ${s.imp} · ${t("sumLiv")} ${s.liv}` : "", s.note ? s.note.slice(0, 80) : ""].filter(Boolean).join(" · ");
    return `<div class="row">${A.sign(v, "sg")}<button class="rn" data-detail="${esc(v.e)}"><b>${esc(A.nm(v))}</b><span>${esc(sub || A.other(v))}</span></button><button class="star" data-x="preprm" data-e="${esc(v.e)}" aria-label="${esc(t("prepToggleOff"))}">✕</button></div>`; }).join("");
  const add = my.filter(v => !p.items.includes(v.e));
  $("#view").innerHTML = `<div class="xhead"><h1>${esc(t("sessionT"))}</h1><p class="muted">${esc(t("prepP"))}</p></div>
    <section class="panel"><label class="fl" for="prepDate">${esc(t("prepDate"))}</label><input type="date" id="prepDate" class="inp" value="${esc(p.date)}"></section>
    <section class="panel"><h2>${esc(t("prepVals"))}</h2>${rows ? `<div class="rows">${rows}</div>` : `<p class="muted">${esc(t("prepEmptyVals"))}</p>`}
      ${add.length ? `<p class="lbl" style="margin-top:14px">${esc(t("prepAdd"))}</p><div class="pickchips">${add.map(v => `<button class="pchip" data-x="prepadd" data-e="${esc(v.e)}">${A.sign(v, "csign")}${esc(A.nm(v))}</button>`).join("")}</div>` : ""}</section>
    <section class="panel"><h2>${esc(t("prepText"))}</h2><textarea id="prepText" class="ta" placeholder="${esc(t("prepTextPh"))}">${esc(p.text)}</textarea></section>
    <section class="panel"><h2>${esc(t("prepRecent"))}</h2>${recent.length ? `<ul class="jlist">${recent.map(j => entryHtml(j, true).replace('<div class="jmeta"><span>', `<div class="jmeta"><span>${esc(fmtDate(new Date(j.d), { day: "numeric", month: "short" }))}, `)).join("")}</ul>` : `<p class="muted">${esc(t("prepRecentEmpty"))}</p>`}</section>
    <div class="tools"><button class="btn primary" data-x="prepshare">${esc(t("prepShare"))}</button><button class="btn" data-x="pdf">${esc(t("prepPdf"))}</button><button class="btn ghost" data-x="prepdone">${esc(ui.prepArm ? t("prepDoneAsk") : t("prepDone"))}</button></div>
    <section class="panel" style="margin-top:22px"><h2>${esc(t("sumT"))}</h2><p class="hint">${esc(t("sumHint"))}</p>
      <pre class="summary" id="sum">${esc(A.summaryText())}</pre>
      <div class="tools"><button class="btn small primary" id="copySum">${esc(t("copy"))}</button></div></section>
    ${A.foot()}`;
}
function prepText() {
  const x = X(), p = x.prep;
  let o = `${t("prepT").toUpperCase()}${p.date ? " · " + fmtDate(new Date(p.date + "T12:00"), { day: "numeric", month: "long" }) : ""}\n`;
  const vals = p.items.map(e => A.BY[e]).filter(Boolean);
  if (vals.length) { o += `\n${t("prepVals")}:\n`; vals.forEach((v, i) => { const s = A.S(v.e); o += `${i + 1}. ${A.nm(v)}`; if (s.imp != null && s.liv != null) o += ` (${t("sumImp")} ${s.imp}/10 · ${t("sumLiv")} ${s.liv}/10)`; o += "\n"; if (s.note) o += `   ${t("sumNote")}: ${s.note.trim()}\n`; }); }
  if (p.text.trim()) o += `\n${t("prepText")}:\n${p.text.trim()}\n`;
  const since = Date.now() - 14 * 864e5, rec = x.journal.filter(j => Date.parse(j.d) >= since).sort((a, b) => (a.d > b.d ? 1 : -1));
  if (rec.length) { o += `\n${t("prepRecent")}:\n`; rec.forEach(j => { const v = j.e && A.BY[j.e]; o += `• ${fmtDate(new Date(j.d), { day: "numeric", month: "short" })}${v ? " · " + A.nm(v) : ""}${j.step ? " · ✓ " + t("stepBadge") : ""}${j.text ? ": " + j.text : ""}\n`; }); }
  return o.trim();
}

/* ================= PDF ================= */
let pdfLoading = null;
function loadPdf() {
  if (window.NYPDF) return Promise.resolve();
  return pdfLoading || (pdfLoading = new Promise((ok, no) => { const s = document.createElement("script"); s.src = "pdf.js"; s.onload = ok; s.onerror = no; document.head.appendChild(s); }));
}
async function makePdf() {
  toast(t("pdfMaking"));
  try {
    await loadPdf();
    const my = mineVals(), x = X();
    const val = v => { const s = A.S(v.e); return { name: A.nm(v), other: A.other(v), imp: s.imp, liv: s.liv, note: (s.note || "").trim(), ex: (s.ex || "").trim(), cells: A.cells(v.e), color: HEX[A.COL[v.c]] }; };
    const since = Date.now() - 14 * 864e5;
    const model = {
      lang: A.D.lang, title: t("pdfTitle"), subtitle: t("pdfFor"), date: fmtDate(new Date(), { day: "numeric", month: "long", year: "numeric" }),
      labels: { top: t("sumTop"), rest: my.some(v => A.S(v.e).top) ? t("sumRest") : t("mineList"), imp: t("sumImp"), liv: t("sumLiv"), gap: t("pdfGap"), note: t("noteL"), ex: t("exL"), prep: t("pdfPrep"), prepText: t("prepText"), journal: t("pdfJournal"), step: t("stepBadge"), made: t("pdfMade") },
      top: my.filter(v => A.S(v.e).top).map(val), rest: my.filter(v => !A.S(v.e).top).map(val),
      prep: { date: x.prep.date ? fmtDate(new Date(x.prep.date + "T12:00"), { day: "numeric", month: "long" }) : "", items: x.prep.items.map(e => A.BY[e]).filter(Boolean).map(v => A.nm(v)), text: x.prep.text.trim() },
      journal: x.journal.filter(j => Date.parse(j.d) >= since).sort((a, b) => (a.d > b.d ? 1 : -1)).map(j => ({ d: fmtDate(new Date(j.d), { day: "numeric", month: "short" }), name: j.e && A.BY[j.e] ? A.nm(A.BY[j.e]) : "", step: !!j.step, text: j.text }))
    };
    const b64 = await window.NYPDF.make(model);
    await P.shareFile(`nytka-${dayKey(new Date())}.pdf`, b64, "application/pdf", true, t("pdfTitle"));
  } catch (e) { console.error(e); toast("PDF: " + (e && e.message || e)); }
}

/* ================= резервна копія ================= */
function backupPanel() {
  // Головне — код (той самий формат, що на сайті); файл — запасний спосіб для великого щоденника чи копії в iCloud.
  return `<section class="panel"><h2>${esc(t("backupT"))}</h2><p class="hint">${esc(t("backupHint"))}</p>
    ${A.codePanel()}
    <p class="hint" style="margin-top:14px">${esc(t("backupFileHint"))}</p>
    <div class="tools"><button class="btn small ghost" data-x="bsave">${esc(t("backupSave"))}</button><label class="btn small ghost" for="bfile">${esc(t("backupLoad"))}</label><input type="file" id="bfile" class="vh" accept="application/json,.json,text/plain,.txt"><span class="note-ok" id="bmsg"></span></div>
    <div id="bconfirm"></div></section>`;
}
async function backupSave() {
  // усередині файлу — той самий код, що й у полі «Код»
  const payload = { app: "nytka", v: 2, exported: new Date().toISOString(), code: await A.makeCode() };
  const r = await P.shareFile(`nytka-backup-${dayKey(new Date())}.json`, JSON.stringify(payload, null, 1), "application/json", false, t("backupT"));
  if (r === "downloaded") toast(t("saved"));
}
function backupRead(file) {
  const fr = new FileReader();
  fr.onload = async () => {
    try {
      const raw = String(fr.result || "");
      let j = null; try { j = JSON.parse(raw); } catch (e) { }
      if (j && j.app === "nytka" && j.data && typeof j.data.st === "object") {   // старий формат файлу (до 1.2)
        const st = {}; for (const k in j.data.st) if (A.BY[k]) st[k] = j.data.st[k];
        ui.backup = { lang: j.data.lang === "en" ? "en" : "uk", st, x: j.data.x && typeof j.data.x === "object" ? j.data.x : blankX() };
      } else {                                                                 // новий файл з кодом або просто текст із кодом
        const r = await A.readCode(j && j.code ? j.code : raw);
        ui.backup = { lang: A.D.lang, st: r.st, x: r.x || X() };
      }
      const n = Object.keys(ui.backup.st).length;
      $("#bconfirm").innerHTML = `<div class="warnbox">${esc(t("backupAsk")(n))}<div class="tools"><button class="btn small red" data-x="bapply">${esc(t("backupYes"))}</button><button class="btn small ghost" data-x="bcancel">${esc(t("cancel"))}</button></div></div>`;
    } catch (e) { $("#bmsg").textContent = t("backupBad"); }
  };
  fr.readAsText(file);
}

/* ================= налаштування ================= */
function lockCfg() { try { return JSON.parse(P.store.get(LOCK_KEY) || "null") || { on: false }; } catch (e) { return { on: false }; } }
function setLock(c) { P.store.set(LOCK_KEY, JSON.stringify(c)); P.flush(); }
async function hashPin(salt, pin) {
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + ":" + pin));
  return Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, "0")).join("");
}
function settings() {
  const s = X().set, lk = lockCfg();
  const wd = [1, 2, 3, 4, 5, 6, 0];
  const time = `${String(s.weekly.h).padStart(2, "0")}:${String(s.weekly.m).padStart(2, "0")}`;
  const sw = (id, on, label) => `<label class="sw"><span>${esc(label)}</span><input type="checkbox" id="${id}" ${on ? "checked" : ""}><i></i></label>`;
  const pinForm = `<div class="pinf"><label class="fl" for="pin1">${esc(t("pinNew"))}</label><input id="pin1" class="inp" type="password" inputmode="numeric" autocomplete="off" maxlength="6">
     <label class="fl" for="pin2">${esc(t("pinRepeat"))}</label><input id="pin2" class="inp" type="password" inputmode="numeric" autocomplete="off" maxlength="6">
     <div class="tools"><button class="btn small primary" data-x="pinsave">${esc(t("pinSave"))}</button><button class="btn small ghost" data-x="pincancel">${esc(t("cancel"))}</button><span class="note-ok" id="pinmsg"></span></div></div>`;
  $("#view").innerHTML = `<div class="xhead"><h1>${esc(t("settings"))}</h1></div>
   <section class="panel set"><h2>${esc(t("tellB"))}</h2><p class="hint">${esc(t("tellHint"))}</p><div class="tools"><button class="btn small" data-share>${esc(t("tellB"))}</button></div></section>
   <section class="panel set"><h2>${esc(t("setLang"))}</h2><div class="seg"><button data-lang="uk" aria-pressed="${A.D.lang === "uk"}">Українська</button><button data-lang="en" aria-pressed="${A.D.lang === "en"}">English</button></div></section>
   <section class="panel set"><h2>${esc(t("setRemind"))}</h2>
     ${sw("remW", s.weekly.on, t("remWeekly"))}
     <div class="row2"><label class="fl">${esc(t("remDay"))}<select id="remDay" class="inp">${wd.map(d => `<option value="${d}" ${s.weekly.wd === d ? "selected" : ""}>${esc(t("weekdays")[d])}</option>`).join("")}</select></label>
       <label class="fl">${esc(t("remTime"))}<input id="remTime" class="inp" type="time" value="${time}"></label></div>
     ${sw("remM", s.monthly.on, t("remMonthly"))}
     ${!P.native ? `<p class="muted small">${esc(t("remWeb"))}</p>` : ui.notif && ui.notif !== "granted" && (s.weekly.on || s.monthly.on) ? `<p class="warnbox">${esc(t("remDenied"))}</p>` : ""}</section>
   <section class="panel set"><h2>${esc(t("setLock"))}</h2>
     ${sw("lockOn", lk.on || ui.pinForm, t("lockOn"))}
     ${ui.pinForm ? pinForm : ""}
     ${lk.on && !ui.pinForm ? `${ui.bio.available ? sw("lockBio", lk.bio, t("lockBio")(ui.bio.type)) : ""}<div class="tools"><button class="btn small" data-x="pinchange">${esc(t("lockChange"))}</button></div>` : ""}</section>
   ${backupPanel().replace('<section class="panel">', '<section class="panel set">')}
   <section class="panel set"><h2>${esc(t("setAbout"))}</h2>
     <p class="kv"><span>${esc(t("version"))}</span><b>${esc(ui.ver || "1.0")}</b></p>
     <p class="kv"><span>${esc(t("contact"))}</span><b>nytka.ua@gmail.com</b></p>
     <div class="tools"><button class="btn small" data-go="about">${esc(t("aboutL"))}</button><a class="btn small" href="privacy.html#${A.D.lang}">${esc(t("privacyL"))}</a><a class="btn small" href="support.html#${A.D.lang}">${esc(t("supportL"))}</a><a class="btn small" href="help.html#${A.D.lang}">${esc(t("helpL"))}</a></div></section>
   <section class="panel set danger"><h2>${esc(t("dangerT"))}</h2><p class="hint">${esc(t("dangerHint"))}</p>
     <div class="tools"><button class="btn small" id="wipe" style="border-color:var(--red);color:var(--red)">${esc(t("wipe"))}</button><span class="note-ok" id="wipeMsg"></span></div></section>`;
}
async function savePin() {
  const a = ($("#pin1") || {}).value || "", b = ($("#pin2") || {}).value || "", m = $("#pinmsg");
  if (!/^\d{4,6}$/.test(a)) { m.textContent = t("pinShort"); return; }
  if (a !== b) { m.textContent = t("pinMismatch"); return; }
  const salt = uid() + uid(), old = lockCfg();
  setLock({ on: true, salt, hash: await hashPin(salt, a), bio: old.bio && ui.bio.available ? true : false });
  ui.pinForm = false; P.haptic("success"); toast(t("pinSaved")); A.rerender();
}

/* ================= блокування ================= */
let unlockResolve = null;
export function gate() {
  ui.lang = (() => { try { return JSON.parse(P.store.get(KEY) || "{}").lang || "uk"; } catch (e) { return "uk"; } })();
  if (!lockCfg().on) return Promise.resolve();
  return new Promise(r => { unlockResolve = r; showLock(); });
}
function lt(k) { const L = (A && A.D && A.D.lang) || ui.lang || "uk"; return STR[L][k] != null ? STR[L][k] : A.T[L][k]; }
async function showLock() {
  const lk = lockCfg(); if (!lk.on || ui.locked) return;
  ui.locked = true; ui.lockArm = false; document.documentElement.classList.add("locked");
  let el = $("#lock"); if (!el) { document.body.insertAdjacentHTML("beforeend", `<div class="lockscr" id="lock" role="dialog" aria-modal="true"></div>`); el = $("#lock"); }
  const bio = lk.bio ? await P.biometry() : { available: false };
  el.innerHTML = `<div class="lockin">${A.sign({ e: "Nytka", c: "freedom" }, "lsign", true)}<h2>${esc(lt("lockT"))}</h2>
    <input id="lockPin" class="inp pinin" type="password" inputmode="numeric" autocomplete="off" maxlength="6" aria-label="PIN">
    <p class="lmsg" id="lockMsg"></p>
    <div class="tools center"><button class="btn primary" data-x="unlock">${esc(lt("lockOpen"))}</button>${bio.available ? `<button class="btn" data-x="unbio">${esc(lt("lockBioBtn")(bio.type))}</button>` : ""}</div>
    <p><button class="link small" data-x="lockforgot">${esc(lt("lockForgot"))}</button></p><div id="lockReset"></div></div>`;
  el.hidden = false;
  if (bio.available) tryBio(); else setTimeout(() => { const i = $("#lockPin"); i && i.focus(); }, 60);
}
async function tryBio() { if (await P.bioAuth(lt("lockReason"), lt("cancel"))) unlock(); else { const i = $("#lockPin"); i && i.focus(); } }
async function tryPin() {
  const lk = lockCfg(), v = ($("#lockPin") || {}).value || "";
  if (await hashPin(lk.salt, v) === lk.hash) unlock();
  else { $("#lockMsg").textContent = lt("lockWrong"); $("#lockPin").value = ""; P.haptic("medium"); }
}
function unlock() {
  ui.locked = false; document.documentElement.classList.remove("locked");
  const el = $("#lock"); if (el) { el.hidden = true; el.innerHTML = ""; }
  if (unlockResolve) { const r = unlockResolve; unlockResolve = null; r(); }
}
function resetAll() {
  const lang = (A.D && A.D.lang) || ui.lang || "uk";
  P.store.set(KEY, JSON.stringify({ lang, st: {}, x: blankX() })); P.store.del(LOCK_KEY); P.flush();
  if (booted) { A.D = { lang, st: {}, x: blankX() }; A.save(); }
  unlock(); if (booted) A.go("today");
}

/* ================= документи (політика, підтримка) всередині застосунку ================= */
async function openDoc(href) {
  const [file, hash] = href.split("#");
  try {
    const html = await (await fetch(file)).text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const sec = doc.getElementById(hash || A.D.lang) || doc.querySelector("section");
    $("#doc").innerHTML = `<div class="doc"><div class="sh-bar"><span></span><button class="ib" data-x="docclose" aria-label="${esc(t("close"))}">✕</button></div><div class="docbody">${sec ? sec.innerHTML : ""}</div></div>`;
    $("#doc").hidden = false;
  } catch (e) { toast(String(e)); }
}
function closeDoc() { $("#doc").hidden = true; $("#doc").innerHTML = ""; }

/* ================= свайпи на картці сортування ================= */
function swipes() {
  const card = $(".scard"); if (!card || card.dataset.sw) return;
  card.dataset.sw = "1";
  const x = X();
  if (x.swipes < 3) { const f = $(".sort-foot"); if (f) f.insertAdjacentHTML("afterend", `<p class="swipe-hint">${esc(t("swipeHint"))}</p>`); }
  card.insertAdjacentHTML("beforeend", `<span class="stamp st-yes">${esc(t("st")[2])}</span><span class="stamp st-no">${esc(t("st")[3])}</span>`);
  let sx = 0, sy = 0, dx = 0, on = false, horiz = null, buzzed = false;
  const yes = card.querySelector(".st-yes"), no = card.querySelector(".st-no");
  const reset = () => { card.style.transition = "transform .2s ease"; card.style.transform = ""; yes.style.opacity = no.style.opacity = 0; setTimeout(() => (card.style.transition = ""), 220); };
  card.addEventListener("pointerdown", e => { if (e.button > 0 || e.target.closest("button,a")) return; on = true; horiz = null; buzzed = false; sx = e.clientX; sy = e.clientY; dx = 0; });
  card.addEventListener("pointermove", e => {
    if (!on) return;
    const mx = e.clientX - sx, my = e.clientY - sy;
    if (horiz === null && (Math.abs(mx) > 8 || Math.abs(my) > 8)) { horiz = Math.abs(mx) > Math.abs(my); if (horiz) card.setPointerCapture(e.pointerId); }
    if (!horiz) return;
    dx = mx; card.style.transform = `translateX(${dx}px) rotate(${dx / 28}deg)`;
    const k = Math.min(1, Math.abs(dx) / 110); (dx > 0 ? yes : no).style.opacity = k * .55; (dx > 0 ? no : yes).style.opacity = 0;
    if (k >= 1 && !buzzed) { buzzed = true; P.haptic("light"); } if (k < 1) buzzed = false;
  });
  const end = () => {
    if (!on) return; on = false; if (!horiz) return;
    if (Math.abs(dx) < 110) { reset(); return; }
    const val = dx > 0 ? 2 : 3, e = (document.querySelector(".choices [data-pick]") || {}).dataset.e;
    card.style.transition = "transform .18s ease-in, opacity .18s"; card.style.transform = `translateX(${dx > 0 ? 130 : -130}%) rotate(${dx > 0 ? 18 : -18}deg)`; card.style.opacity = 0;
    P.haptic("medium"); X().swipes++;
    setTimeout(() => A.pick(e, val), 170);
  };
  card.addEventListener("pointerup", end); card.addEventListener("pointercancel", () => { on = false; reset(); });
}

/* ================= події ================= */
function onClick(ev) {
  const a = ev.target.closest("a[href$='.html'], a[href*='.html#']");
  if (a && !a.target) { ev.preventDefault(); ev.stopPropagation(); openDoc(a.getAttribute("href")); return; }
  if (ev.target.closest("#wipe")) {
    ev.stopPropagation();
    if (!ui.wipeArm) { ui.wipeArm = true; $("#wipeMsg").textContent = t("wipeAsk"); setTimeout(() => { ui.wipeArm = false; const m = $("#wipeMsg"); if (m) m.textContent = ""; }, 3500); return; }
    ui.wipeArm = false; ui.valMode = null; A.D.st = {}; A.D.x = blankX(); A.sess.hist = []; A.save(); A.shell(); A.rerender(); P.haptic("medium"); return;
  }
  const el = ev.target.closest("[data-x]"); if (!el) return;
  const x = X(), k = el.dataset.x;
  ev.stopPropagation();
  switch (k) {
    case "cmp": ui.composer = { where: el.dataset.where, e: el.dataset.e || (focusVal() || {}).e || null, step: el.dataset.step === "1" }; refresh(el.dataset.where); setTimeout(() => { const ta = $("#cmpText"); ta && ta.focus(); }, 30); break;
    case "cmpsave": saveEntry(); break;
    case "cmpcancel": { const w = ui.composer && ui.composer.where; ui.composer = null; refresh(w); break; }
    case "pickfocus": ui.pickFocus = !ui.pickFocus; A.rerender(); break;
    case "focus": x.focus = x.focus === el.dataset.e && el.dataset.where === "sheet" ? null : el.dataset.e; ui.pickFocus = false; A.save(); P.haptic("light"); el.dataset.where === "sheet" ? refresh("sheet") : A.rerender(); break;
    case "preptoggle": { const i = x.prep.items.indexOf(el.dataset.e); i >= 0 ? x.prep.items.splice(i, 1) : x.prep.items.push(el.dataset.e); A.save(); P.haptic("light"); refresh("sheet"); break; }
    case "prepadd": x.prep.items.push(el.dataset.e); A.save(); A.rerender(); break;
    case "preprm": x.prep.items = x.prep.items.filter(e => e !== el.dataset.e); A.save(); A.rerender(); break;
    case "prepshare": P.shareText(prepText(), t("prepT")).then(r => r === "copied" && toast(t("copied"))); break;
    case "prepdone":
      if (!ui.prepArm) { ui.prepArm = true; A.rerender(); setTimeout(() => { if (ui.prepArm) { ui.prepArm = false; if (A.view === "session") A.rerender(); } }, 3500); break; }
      ui.prepArm = false; x.prep = { items: [], text: "", date: "" }; A.save(); toast(t("prepCleared")); A.rerender(); break;
    case "jdel":
      if (ui.del !== el.dataset.id) { ui.del = el.dataset.id; refresh(A.sess.openE ? "sheet" : A.view); setTimeout(() => { if (ui.del === el.dataset.id) ui.del = null; }, 3500); break; }
      x.journal = x.journal.filter(j => j.id !== el.dataset.id); ui.del = null; A.save(); refresh(A.sess.openE ? "sheet" : A.view); break;
    case "cksave": saveCheck(); break;
    case "vmode": ui.valMode = el.dataset.m; A.rerender(); break;
    case "resort":
      if (!ui.resortArm) { ui.resortArm = true; A.rerender(); setTimeout(() => { if (ui.resortArm) { ui.resortArm = false; if (A.view === "today" || A.view === "mine") A.rerender(); } }, 4000); break; }
      ui.resortArm = false; startResort(); toast(t("resortStarted")); break;
    case "pdf": makePdf(); break;
    case "bsave": backupSave(); break;
    case "bapply": { const b = ui.backup; if (!b) break; A.D = { ...A.D, ...b }; X(); A.save(); ui.backup = null; A.shell(); A.rerender(); toast(t("backupDone")); break; }
    case "bcancel": ui.backup = null; $("#bconfirm").innerHTML = ""; break;
    case "pinsave": savePin(); break;
    case "pincancel": ui.pinForm = false; A.rerender(); break;
    case "pinchange": ui.pinForm = true; A.rerender(); break;
    case "unlock": tryPin(); break;
    case "unbio": tryBio(); break;
    case "lockforgot": ui.lockArm = false; $("#lockReset").innerHTML = `<button class="btn small" style="border-color:var(--red);color:var(--red)" data-x="lockreset">${esc(lt("lockReset"))}</button>`; break;
    case "lockreset":
      if (!ui.lockArm) { ui.lockArm = true; el.textContent = lt("lockResetAsk"); break; }
      resetAll(); break;
    case "docclose": closeDoc(); break;
  }
}
function onInput(e) {
  const el = e.target;
  if (el.dataset.ck) { const v = +el.value, idx = el.id.split("-").pop(); ui.ck[el.dataset.ck][el.dataset.k] = v; const o = $(`#cko-${el.dataset.k}-${idx}`); if (o) o.textContent = v; const w = $(`#ckw-${el.dataset.k}-${idx}`); if (w) w.classList.remove("unset"); return; }
  if (el.id === "prepText") { X().prep.text = el.value; A.save(); return; }
  if (el.id === "lockPin" && el.value.length >= 4 && /^\d+$/.test(el.value)) { const lk = lockCfg(); hashPin(lk.salt, el.value).then(h => { if (h === lk.hash) unlock(); }); }
}
function onChangeEv(e) {
  const el = e.target, s = X().set;
  switch (el.id) {
    case "prepDate": X().prep.date = el.value; A.save(); break;
    case "remW": s.weekly.on = el.checked; A.save(); reschedule(true).then(() => A.view === "settings" && A.rerender()); break;
    case "remM": s.monthly.on = el.checked; A.save(); reschedule(true).then(() => A.view === "settings" && A.rerender()); break;
    case "remDay": s.weekly.wd = +el.value; A.save(); reschedule(false); break;
    case "remTime": { const [h, m] = (el.value || "19:00").split(":").map(Number); s.weekly.h = h || 0; s.weekly.m = m || 0; A.save(); reschedule(false); break; }
    case "lockOn": if (el.checked) { ui.pinForm = true; } else { ui.pinForm = false; setLock({ on: false }); } A.rerender(); break;
    case "lockBio": { const c = lockCfg(); c.bio = el.checked; setLock(c); break; }
    case "bfile": if (el.files && el.files[0]) backupRead(el.files[0]); el.value = ""; break;
  }
}
