// Тексти, які є тільки в застосунку. Додаються до T.uk / T.en ядра.
export const S = {
uk: {
  today: "Сьогодні", journal: "Щоденник", settings: "Налаштування", libShort: "Цінності",
  weekdays: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"],
  // Сьогодні
  focusT: "Фокус тижня", focusPick: "Обери цінність, на якій зосередишся цього тижня.",
  focusNone: "Спершу познач хоча б одну цінність як «Моє».", focusChange: "Змінити", focusSet: "Зробити фокусом тижня", focusIs: "Фокус тижня",
  stepDone: "Я зробив крок", addThought: "Записати думку", thisWeek: n => n ? `Цього тижня: ${n} ${plural(n, "запис", "записи", "записів")}` : "Цього тижня ще нічого не записано",
  progressT: "Прогрес", sorted: "оцінено", mineN: "у «Моє»", workedN: "опрацьовано", contSort: "Продовжити сортування",
  checkT: "Перевірка місяця", checkDue: "Дві хвилини: ще раз оціни «важливо» і «як я живу» для своїх цінностей. Так видно, що змінюється.",
  checkNext: n => `Наступна перевірка через ${n} ${plural(n, "день", "дні", "днів")}.`, checkGo: "Пройти перевірку",
  checkFirst: "Заповни дві шкали хоча б для однієї цінності з «Моє», і тут з'явиться щомісячна перевірка.",
  prepT: "До наступної сесії", prepCount: n => n ? `${n} ${plural(n, "тема", "теми", "тем")} для розмови` : "Поки нічого не відкладено", prepOpen: "Відкрити",
  startT: "Почни з сортування", startP: "Пройди цінності по одній і познач ті, що відгукуються.",
  // композитор запису
  howWasIt: "Як це було? Кілька слів (необов'язково)", thought: "Що думаєш про цю цінність?", save: "Зберегти", cancel: "Скасувати", saved: "Записано",
  isStep: "Це крок до цінності", noValue: "Без цінності", valueL: "Цінність",
  // Щоденник
  journalT: "Щоденник", journalP: "Кроки й думки про твої цінності. Корисно перечитати перед сесією.",
  jEmpty: "Записів поки немає. Відміть крок на екрані «Сьогодні» або додай думку тут.", jAdd: "Додати запис", jPh: "Що сталося, що помітив, що відчув…",
  stepBadge: "крок", del: "Видалити", delAsk: "Ще раз — видалити", jThis: "Щоденник цієї цінності", jThisEmpty: "Тут з'являться твої кроки й думки про цю цінність.", jMore: n => `Ще ${n} у щоденнику`,
  // підготовка до сесії
  prepP: "Збери, що хочеш обговорити з психотерапевтом, і поділися перед зустріччю або відкрий на сесії.",
  prepDate: "Дата сесії", prepVals: "Цінності для розмови", prepAdd: "Додати з «Моє»", prepText: "Що хочу обговорити", prepTextPh: "Питання, ситуації, що турбує…",
  prepRecent: "Що відбувалося за останні 2 тижні", prepRecentEmpty: "Записів у щоденнику за цей час немає.",
  prepShare: "Поділитися текстом", prepPdf: "PDF", prepDone: "Сесія відбулась", prepDoneAsk: "Ще раз — очистити список", prepCleared: "Список очищено",
  prepToggleOn: "Обговорити на сесії", prepToggleOff: "Прибрати з сесії", prepEmptyVals: "Додай цінності кнопкою нижче або з картки цінності.",
  // Перевірка місяця
  checkP: "Оціни ще раз кожну цінність з «Моє». Порівняння з попередніми перевірками з'явиться в «Мої».",
  checkSave: "Зберегти перевірку", checkSaved: "Перевірку збережено", checkNoMine: "У «Моє» поки порожньо.",
  // графік
  trendT: "Як змінюється розрив", trendHint: "Розрив = «важливо» мінус «живу зараз». Що нижче лінія, то ближче твоє життя до того, що для тебе важливо.",
  trendOne: "Це перша перевірка. Лінії з'являться після наступної.", trendAvg: "в середньому",
  // PDF і резервна копія
  pdfBtn: "PDF для терапевта", pdfMaking: "Готую PDF…", pdfTitle: "Мої цінності", pdfFor: "Підсумок для роботи з психотерапевтом", pdfPrep: "До наступної сесії", pdfJournal: "Щоденник за 2 тижні",
  pdfGap: "розрив", pdfMade: "Створено в застосунку «Нитка»",
  backupT: "Резервна копія", backupHint: "Збережи файл у «Файли», на хмарний диск чи надішли собі. На новому телефоні відкрий його кнопкою «Відновити з файлу».",
  backupSave: "Зберегти файл", backupLoad: "Відновити з файлу", backupBad: "Це не файл резервної копії «Нитки».",
  backupAsk: n => `Замінити поточні дані даними з файлу (${n} ${plural(n, "цінність", "цінності", "цінностей")})?`, backupYes: "Так, замінити", backupDone: "Дані відновлено",
  // Налаштування
  setLang: "Мова", setRemind: "Нагадування", remWeekly: "Щотижня: маленький крок", remMonthly: "Раз на місяць: перевірка", remDay: "День", remTime: "Час",
  remDenied: "Сповіщення вимкнені. Увімкни їх для «Нитки» в налаштуваннях телефона.", remWeb: "Нагадування працюють у застосунку на телефоні.",
  setLock: "Захист", lockOn: "Блокувати застосунок", lockBio: t => `Відкривати через ${t || "біометрію"}`, lockChange: "Змінити PIN",
  pinNew: "Новий PIN (4–6 цифр)", pinRepeat: "Повтори PIN", pinSave: "Зберегти PIN", pinMismatch: "PIN не збігаються", pinShort: "Потрібно 4–6 цифр", pinSaved: "PIN збережено",
  setData: "Дані", setAbout: "Про застосунок", version: "Версія", contact: "Пошта підтримки",
  // Блокування
  lockT: "Введи PIN", lockOpen: "Відкрити", lockWrong: "Неправильний PIN", lockBioBtn: t => `Відкрити через ${t || "біометрію"}`, lockReason: "Відкрити «Нитку»",
  lockForgot: "Забув PIN", lockReset: "Стерти всі дані й скинути PIN", lockResetAsk: "Ще раз — стерти все без відновлення",
  // Свайпи
  swipeHint: "Свайп вправо — «Моє», вліво — «Ні»",
  // Нагадування
  nWeeklyT: "Нитка · крок тижня", nWeeklyB: (v, k) => v ? `${v}: ${k}` : "Обери цінність тижня і зроби маленький крок.",
  nMonthlyT: "Нитка · перевірка місяця", nMonthlyB: "Дві хвилини: як змінилося «важливо ↔ як я живу»?",
  widgetLabel: "Фокус тижня", widgetEmpty: "Відкрий «Нитку» й обери цінність тижня"
},
en: {
  today: "Today", journal: "Journal", settings: "Settings", libShort: "Values",
  weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  focusT: "Focus of the week", focusPick: "Pick the value you'll focus on this week.",
  focusNone: "First mark at least one value as “Mine”.", focusChange: "Change", focusSet: "Make it this week's focus", focusIs: "Focus of the week",
  stepDone: "I took a step", addThought: "Write a thought", thisWeek: n => n ? `This week: ${n} ${n === 1 ? "entry" : "entries"}` : "Nothing written this week yet",
  progressT: "Progress", sorted: "rated", mineN: "in “Mine”", workedN: "worked through", contSort: "Continue sorting",
  checkT: "Monthly check", checkDue: "Two minutes: rate “matters” and “how I live” again for your values. It shows what's changing.",
  checkNext: n => `Next check in ${n} ${n === 1 ? "day" : "days"}.`, checkGo: "Start the check",
  checkFirst: "Fill in both scales for at least one value in “Mine” and the monthly check will appear here.",
  prepT: "Before the next session", prepCount: n => n ? `${n} ${n === 1 ? "topic" : "topics"} to discuss` : "Nothing set aside yet", prepOpen: "Open",
  startT: "Start with sorting", startP: "Go through the values one by one and mark the ones that resonate.",
  howWasIt: "How did it go? A few words (optional)", thought: "What do you think about this value?", save: "Save", cancel: "Cancel", saved: "Saved",
  isStep: "This is a step towards the value", noValue: "No value", valueL: "Value",
  journalT: "Journal", journalP: "Steps and thoughts about your values. Worth rereading before a session.",
  jEmpty: "No entries yet. Mark a step on the Today screen or add a thought here.", jAdd: "Add entry", jPh: "What happened, what you noticed, what you felt…",
  stepBadge: "step", del: "Delete", delAsk: "Tap again to delete", jThis: "Journal for this value", jThisEmpty: "Your steps and thoughts about this value will appear here.", jMore: n => `${n} more in the journal`,
  prepP: "Gather what you want to discuss with your psychotherapist, share it before the meeting or open it during the session.",
  prepDate: "Session date", prepVals: "Values to discuss", prepAdd: "Add from “Mine”", prepText: "What I want to discuss", prepTextPh: "Questions, situations, what's on your mind…",
  prepRecent: "What happened in the last 2 weeks", prepRecentEmpty: "No journal entries in this period.",
  prepShare: "Share as text", prepPdf: "PDF", prepDone: "Session done", prepDoneAsk: "Tap again to clear the list", prepCleared: "List cleared",
  prepToggleOn: "Discuss in session", prepToggleOff: "Remove from session", prepEmptyVals: "Add values with the button below or from a value card.",
  checkP: "Rate each value in “Mine” again. The comparison with earlier checks will appear in “Mine”.",
  checkSave: "Save the check", checkSaved: "Check saved", checkNoMine: "“Mine” is empty for now.",
  trendT: "How the gap is changing", trendHint: "Gap = “matters” minus “living it now”. The lower the line, the closer your life is to what matters to you.",
  trendOne: "This is your first check. Lines will appear after the next one.", trendAvg: "average",
  pdfBtn: "PDF for therapist", pdfMaking: "Making the PDF…", pdfTitle: "My values", pdfFor: "Summary for work with a psychotherapist", pdfPrep: "Before the next session", pdfJournal: "Journal, last 2 weeks",
  pdfGap: "gap", pdfMade: "Created with the Nytka app",
  backupT: "Backup", backupHint: "Save the file to Files or a cloud drive, or send it to yourself. On a new phone, open it with “Restore from file”.",
  backupSave: "Save file", backupLoad: "Restore from file", backupBad: "This isn't a Nytka backup file.",
  backupAsk: n => `Replace current data with the file's data (${n} ${n === 1 ? "value" : "values"})?`, backupYes: "Yes, replace", backupDone: "Data restored",
  setLang: "Language", setRemind: "Reminders", remWeekly: "Weekly: a small step", remMonthly: "Monthly: the check", remDay: "Day", remTime: "Time",
  remDenied: "Notifications are off. Turn them on for Nytka in your phone's settings.", remWeb: "Reminders work in the phone app.",
  setLock: "Protection", lockOn: "Lock the app", lockBio: t => `Unlock with ${t || "biometrics"}`, lockChange: "Change PIN",
  pinNew: "New PIN (4–6 digits)", pinRepeat: "Repeat PIN", pinSave: "Save PIN", pinMismatch: "PINs don't match", pinShort: "Use 4–6 digits", pinSaved: "PIN saved",
  setData: "Data", setAbout: "About", version: "Version", contact: "Support email",
  lockT: "Enter PIN", lockOpen: "Unlock", lockWrong: "Wrong PIN", lockBioBtn: t => `Unlock with ${t || "biometrics"}`, lockReason: "Unlock Nytka",
  lockForgot: "Forgot PIN", lockReset: "Erase all data and reset PIN", lockResetAsk: "Tap again to erase everything for good",
  swipeHint: "Swipe right for “Mine”, left for “No”",
  nWeeklyT: "Nytka · step of the week", nWeeklyB: (v, k) => v ? `${v}: ${k}` : "Pick a value for the week and take a small step.",
  nMonthlyT: "Nytka · monthly check", nMonthlyB: "Two minutes: how has “matters ↔ how I live” changed?",
  widgetLabel: "Focus of the week", widgetEmpty: "Open Nytka and pick a value for the week"
}
};
function plural(n, one, few, many) {
  const a = n % 10, b = n % 100;
  if (a === 1 && b !== 11) return one;
  if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return few;
  return many;
}
