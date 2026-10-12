// Точка входу нативного шару. Ядро (src/app.js) бачить window.NYX і підключає розширення.
import * as P from "./platform.js";
import { attach, attached, gate, KEY, LOCK_KEY } from "./ui.js";

window.NYX = {
  store: P.store,
  attach,
  // ядро стартує, коли дані прочитані з пам'яті телефона і (якщо ввімкнено) застосунок розблоковано
  ready: Promise.all([P.preload([KEY, LOCK_KEY]), attached]).then(gate)
};
