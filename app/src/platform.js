// Нативні можливості з запасним варіантом для браузера (щоб застосунок можна було перевірити й без телефона).
import { Capacitor, registerPlugin } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";
import { Share } from "@capacitor/share";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { LocalNotifications } from "@capacitor/local-notifications";
import { App } from "@capacitor/app";
import { BiometricAuth } from "@aparajita/capacitor-biometric-auth";

export const native = Capacitor.isNativePlatform();
export const platform = Capacitor.getPlatform(); // "ios" | "android" | "web"

/* ---------- сховище: синхронне читання з кешу, запис у фоні ---------- */
const cache = {};
const dirty = new Set();
let timer = null;
export async function preload(keys) {
  for (const k of keys) {
    if (native) cache[k] = (await Preferences.get({ key: k })).value;
    else { try { cache[k] = localStorage.getItem(k); } catch (e) { cache[k] = null; } }
  }
}
export function flush() {
  clearTimeout(timer); timer = null;
  for (const k of dirty) {
    const v = cache[k];
    if (native) { v == null ? Preferences.remove({ key: k }) : Preferences.set({ key: k, value: v }); }
    else { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} }
  }
  dirty.clear();
}
export const store = {
  get: k => (k in cache ? cache[k] : null),
  set: (k, v) => { cache[k] = v; dirty.add(k); clearTimeout(timer); timer = setTimeout(flush, 300); },
  del: k => { cache[k] = null; dirty.add(k); flush(); }
};

/* ---------- вібрація ---------- */
export function haptic(kind) {
  if (!native) return;
  try {
    if (kind === "success") Haptics.notification({ type: NotificationType.Success });
    else Haptics.impact({ style: kind === "medium" ? ImpactStyle.Medium : ImpactStyle.Light });
  } catch (e) {}
}

/* ---------- поділитися ---------- */
function b64ToBlob(b64, mime) {
  const bin = atob(b64), arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}
function download(blob, name) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
// data: base64 (isB64=true) або звичайний текст
export async function shareFile(name, data, mime, isB64, title) {
  if (!native) { download(isB64 ? b64ToBlob(data, mime) : new Blob([data], { type: mime }), name); return "downloaded"; }
  const r = await Filesystem.writeFile({ path: name, data, directory: Directory.Cache, ...(isB64 ? {} : { encoding: Encoding.UTF8 }) });
  try { await Share.share({ title, files: [r.uri], dialogTitle: title }); return "shared"; }
  catch (e) { return "cancelled"; }
}
export async function shareText(text, title) {
  if (native) { try { await Share.share({ title, text, dialogTitle: title }); return "shared"; } catch (e) { return "cancelled"; } }
  if (navigator.share) { try { await navigator.share({ title, text }); return "shared"; } catch (e) { return "cancelled"; } }
  try { await navigator.clipboard.writeText(text); return "copied"; } catch (e) { return "failed"; }
}

/* ---------- нагадування ---------- */
export async function notifyPermission(ask) {
  if (!native) return "unavailable";
  try {
    let p = (await LocalNotifications.checkPermissions()).display;
    if (p !== "granted" && ask) p = (await LocalNotifications.requestPermissions()).display;
    return p;
  } catch (e) { return "unavailable"; }
}
export async function scheduleAll(list) {
  if (!native) return;
  try {
    const pending = (await LocalNotifications.getPending()).notifications || [];
    if (pending.length) await LocalNotifications.cancel({ notifications: pending.map(n => ({ id: n.id })) });
    if (list.length) await LocalNotifications.schedule({ notifications: list });
  } catch (e) { console.warn("notifications", e); }
}
export function onNotificationTap(fn) {
  if (!native) return;
  LocalNotifications.addListener("localNotificationActionPerformed", a => fn((a.notification && a.notification.extra) || {}));
}

/* ---------- біометрія ---------- */
export async function biometry() {
  if (!native) return { available: false, type: "" };
  try {
    const r = await BiometricAuth.checkBiometry();
    const names = { 1: "Touch ID", 2: "Face ID", 3: "fingerprint", 4: "face", 5: "iris" };
    return { available: !!r.isAvailable, type: names[r.biometryType] || "" };
  } catch (e) { return { available: false, type: "" }; }
}
export async function bioAuth(reason, cancel) {
  try {
    await BiometricAuth.authenticate({ reason, cancelTitle: cancel, androidTitle: "Нитка", androidSubtitle: reason, allowDeviceCredential: false, iosFallbackTitle: "" });
    return true;
  } catch (e) { return false; }
}

/* ---------- життєвий цикл ---------- */
export function onPause(fn) {
  if (native) App.addListener("pause", fn);
  document.addEventListener("visibilitychange", () => { if (document.hidden) fn(); });
}
export function onResume(fn) {
  if (native) App.addListener("resume", fn);
  else document.addEventListener("visibilitychange", () => { if (!document.hidden) fn(); });
}
export function onBack(fn) { if (native && platform === "android") App.addListener("backButton", fn); }
export function minimize() { if (native && platform === "android") App.minimizeApp(); }
export async function appVersion() {
  if (!native) return "web";
  try { const i = await App.getInfo(); return `${i.version} (${i.build})`; } catch (e) { return ""; }
}

/* ---------- віджет (власний нативний модуль NytkaWidget) ---------- */
const Widget = registerPlugin("NytkaWidget");
export async function widgetUpdate(json) {
  if (!native) return;
  try { await Widget.update({ json }); } catch (e) { /* модуль ще не додано — не страшно */ }
}
