(function(){
"use strict";
/* NX — розширення застосунку (є тільки в збірці для iOS/Android; на сайті null).
   H — точки розширення; на сайті порожні, тож поведінка сайту не змінюється. */
const NX=window.NYX||null;
const H={};
/* ---------- strings ---------- */
const T={
uk:{brand:"Нитка",sort:"Сортування",lib:"Усі цінності",mine:"Мої",home:"Головна",
 eyebrow:"192 цінності · українською та англійською",h1:"Знайди свої <em>12</em> цінностей",
 lead:"Пройди всі цінності по одній картці, поглиб ті, що відгукуються, і звузь до найважливіших. Підходить для самостійної роботи і для роботи з психотерапевтом.",
 start:"Почати",startSort:"Почати сортування",cont:"Продовжити",browse:"Переглянути всі",
 privacy:"Усе, що ти позначаєш і пишеш, зберігається тільки на цьому пристрої.",
 how:[["Відсортуй","Для кожної цінності: «Моє», «Можливо» або «Ні». Не думай довго, довіряй першому відгуку."],["Поглиб","Відкрий картку: тінь цінності, питання до себе, маленький крок, твої нотатки і дві шкали."],["Звузь","Залиш 12, познач топ-5 і подивись, де розходяться «важливо для мене» і «як я живу зараз». Підсумок можна показати терапевту."]],
 st:{2:"Моє",1:"Можливо",3:"Ні",0:"Не оцінені"},stShort:{2:"Моє",1:"Може",3:"Ні"},
 rated:"оцінено",of:"з",more:"Детальніше",back:"Назад",skip:"Пропустити",
 life:"У житті",ask:"Спитай себе",what:"Що це",confuse:"Не плутати",shadow:"Коли її забагато",questions:"Питання до себе",step:"Маленький крок на тиждень",precise:"Точніше",
 gq:["Коли я востаннє жив за цією цінністю?","Що мені заважає жити за нею більше?"],
 forMe:"Для мене",imp:"Наскільки це важливо для мене",liv:"Наскільки я зараз за цим живу",low:"зовсім ні",high:"дуже",
 noteL:"Що це значить для мене",exL:"Приклад з мого життя",notePh:"Своїми словами…",exPh:"Ситуація, де ця цінність проявилась або була порушена…",autosave:"Зберігається автоматично",trk:"Опрацьовано",trkN:{sc:"дві шкали",note:"що це значить для мене",ex:"приклад з життя"},worked:"опрацьовано",
 doneT:"Усі 192 цінності оцінені",doneP:"Тепер переходь до своїх: звузь до 12 і познач топ-5.",toMine:"До моїх цінностей",shareB:"Поділитися «Ниткою»",tellB:"Розповісти про «Нитку»",settings:"Налаштування",aboutSec:"Про «Нитку»",tellHint:"Якщо «Нитка» тобі допомагає, надішли її тому, кому вона теж може знадобитися.",dangerT:"Небезпечна зона",dangerHint:"Стирає всі позначки, оцінки й нотатки в цьому браузері. Скасувати не можна, тож спершу збережи код резервної копії.",shareMsg:"«Нитка» — простір для пошуку власних цінностей: 192 цінності з поясненнями. Безкоштовно і без реєстрації.",linkCopied:"Посилання скопійовано",shareHint:"Знаєш когось, кому це теж знадобиться?",
 allT:"Усі цінності",search:"Пошук: свобода, freedom…",all:"Усі",nothing:"Нічого не знайдено.",
 mineT:"Мої цінності",mineP:"Тут збирається все, що ти позначив. Ціль — 12 цінностей у «Моє», з них 5 найголовніших.",
 mineList:"Моє",maybeList:"Можливо",over:"Більше 12. Порівняй схожі і переведи частину в «Можливо».",
 emptyMine:"Поки нічого. Почни з сортування.",top5:"Топ-5",topHint:"Зірочкою познач 5 найголовніших.",toMineBtn:"У «Моє»",
 gapT:"Важливо для мене ↔ як я живу зараз",gapHint:"Тут порівнюються дві оцінки з карток твоїх цінностей: наскільки цінність для тебе важлива і наскільки ти зараз за нею живеш. Угорі — найбільші розриви: там у житті бракує чогось важливого, і це добра тема для розмови з психотерапевтом. Мінус означає, що ти живеш за цінністю менше, ніж вона для тебе важить. Плюс — що віддаєш їй більше.",
 gapLeg:["наскільки важливо","наскільки живу за нею зараз"],gapEmpty:"Відкрий будь-яку цінність зі списку «Моє» і внизу картки посунь обидва повзунки: «Наскільки це важливо для мене» і «Наскільки я зараз за цим живу». Тут з'явиться порівняння.",
 sumT:"Підсумок",sumHint:"Текст, який можна скопіювати і показати терапевту чи зберегти в нотатках.",copy:"Скопіювати",copied:"Скопійовано",
 backupT:"Резервна копія",backupHint:"Дані живуть у цьому браузері. Щоб перенести їх на інший пристрій або в застосунок «Нитка», згенеруй і скопіюй код, а там встав його в нижнє поле.",
 genB:"Згенерувати код",exportB:"Скопіювати код",importB:"Відновити з коду",importPh:"Встав сюди код з іншого пристрою…",outPh:"Натисни «Згенерувати код», і він з'явиться тут",copiedCode:"Код скопійовано. Збережи його в нотатках або надішли собі.",copyManual:"Цей браузер не дав скопіювати код. Відкрий сайт у Safari чи Chrome і спробуй ще раз.",codeOk:(m,r)=>`✓ Код розпізнано: ${m} у «Моє», ${r} оцінено. Поточні позначки буде замінено.`,imported:"Відновлено",badCode:"Код не розпізнано. Перевір, що скопійовано весь код, від NYTKA до останнього символу.",pasteFirst:"Спершу встав код у поле вище.",
 wipe:"Стерти все",wipeAsk:"Натисни ще раз, щоб стерти всі дані",
 sumHead:"МОЇ ЦІННОСТІ",sumTop:"Топ-5",sumRest:"Інші з 12",sumImp:"важливо",sumLiv:"живу зараз",sumNote:"Для мене",sumEx:"Приклад",sumStep:"Крок",
 noStore:"Браузер не дозволяє зберігати дані — позначки зникнуть після закриття сторінки. Скористайся резервною копією.",
 foot:["Нитка — інструмент для самопізнання, твій помічник у роботі з психотерапевтом."],mStat:["обрано","у топ-5","опрацьовано"],
 close:"Закрити",privacyL:"Конфіденційність",aboutL:"Про проєкт",
 aboutEyebrow:"Простір для пошуку власних цінностей",
 aboutP:["«Нитка» — інструмент самопізнання для тих, хто хоче краще зрозуміти себе: самостійно або разом із психотерапевтом. Цінності — це те, що для тебе по-справжньому важливо: свобода, близькі, чесність, спокій. Вони, як нитка, проходять крізь усі твої рішення, навіть коли ти про них не думаєш.","Тут 192 цінності, кожна з поясненням, прикладом з життя і питаннями до себе. Ти сортуєш їх на «Моє», «Можливо» й «Ні», звужуєш до 12 найважливіших і дивишся, наскільки твоє життя зараз з ними збігається."],
 aboutSmall:"Без реєстрації: усе, що ти позначаєш і пишеш, лишається на твоєму пристрої.",
 aboutGo:"Почати",aboutCont:"Продовжити",supportL:"Підтримка",helpL:"Допомога",prev:"Попередня",next:"Наступна",remove:"Прибрати з «Моє»"},
en:{brand:"Nytka",sort:"Sort",lib:"All values",mine:"Mine",home:"Home",
 eyebrow:"192 values · Ukrainian and English",h1:"Find your <em>12</em> core values",
 lead:"Go through every value one card at a time, explore the ones that resonate, and narrow down to what matters most. Works on your own or alongside a therapist.",
 start:"Start",startSort:"Start sorting",cont:"Continue",browse:"Browse all",
 privacy:"Everything you mark and write is stored only on this device.",
 how:[["Sort","For each value: “Mine”, “Maybe” or “No”. Don't overthink it, trust your first response."],["Explore","Open a card: the value's shadow side, questions, a small step, your notes and two scales."],["Narrow","Keep 12, mark your top 5 and see where “what matters to me” and “how I live now” differ. Share the summary with your therapist."]],
 st:{2:"Mine",1:"Maybe",3:"No",0:"Not rated"},stShort:{2:"Mine",1:"Maybe",3:"No"},
 rated:"rated",of:"of",more:"More",back:"Back",skip:"Skip",
 life:"In life",ask:"Ask yourself",what:"What it is",confuse:"Don't confuse",shadow:"When there's too much",questions:"Questions for yourself",step:"A small step this week",precise:"More precisely",
 gq:["When did I last live by this value?","What stops me living by it more?"],
 forMe:"For me",imp:"How important this is to me",liv:"How much I live by it now",low:"not at all",high:"a lot",
 noteL:"What it means to me",exL:"An example from my life",notePh:"In your own words…",exPh:"A situation where this value showed up or was violated…",autosave:"Saved automatically",trk:"Worked through",trkN:{sc:"both scales",note:"what it means to me",ex:"example from life"},worked:"worked through",
 doneT:"All 192 values rated",doneP:"Now go to yours: narrow down to 12 and mark your top 5.",toMine:"Go to my values",shareB:"Share Nytka",tellB:"Tell someone about Nytka",settings:"Settings",aboutSec:"About Nytka",tellHint:"If Nytka helps you, send it to someone who might need it too.",dangerT:"Danger zone",dangerHint:"Erases all marks, ratings and notes in this browser. This can't be undone, so save a backup code first.",shareMsg:"Nytka — a space to find your own values: 192 values with explanations. Free, no sign-up.",linkCopied:"Link copied",shareHint:"Know someone who might need this too?",
 allT:"All values",search:"Search: freedom, свобода…",all:"All",nothing:"Nothing found.",
 mineT:"My values",mineP:"Everything you've marked gathers here. The goal is 12 values in “Mine”, 5 of them the most important.",
 mineList:"Mine",maybeList:"Maybe",over:"More than 12. Compare similar ones and move some to “Maybe”.",
 emptyMine:"Nothing yet. Start with sorting.",top5:"Top 5",topHint:"Star the 5 most important.",toMineBtn:"To “Mine”",
 gapT:"What matters to me ↔ how I live now",gapHint:"This compares two ratings from your value cards: how important a value is to you and how much you live by it right now. The biggest gaps are at the top: something important is missing from your life there, and it's a good topic to bring to your psychotherapist. A minus means you live by the value less than it matters to you. A plus means you give it more.",
 gapLeg:["how important","how much I live by it now"],gapEmpty:"Open any value in your “Mine” list and move both sliders at the bottom of the card: “How important this is to me” and “How much I live by it now”. The comparison will appear here.",
 sumT:"Summary",sumHint:"Text you can copy and share with your therapist or keep in your notes.",copy:"Copy",copied:"Copied",
 backupT:"Backup",backupHint:"Your data lives in this browser. To move it to another device or to the Nytka app, generate and copy the code, then paste it into the lower field there.",
 genB:"Generate code",exportB:"Copy code",importB:"Restore from code",importPh:"Paste the code from your other device here…",outPh:"Tap “Generate code” and it will appear here",copiedCode:"Code copied. Keep it in your notes or send it to yourself.",copyManual:"This browser didn't allow copying. Open the site in Safari or Chrome and try again.",codeOk:(m,r)=>`✓ Code recognised: ${m} in “Mine”, ${r} rated. Your current marks will be replaced.`,imported:"Restored",badCode:"Code not recognised. Make sure you copied the whole code, from NYTKA to the very last character.",pasteFirst:"Paste the code into the field above first.",
 wipe:"Erase everything",wipeAsk:"Tap again to erase all data",
 sumHead:"MY VALUES",sumTop:"Top 5",sumRest:"The rest of my 12",sumImp:"matters",sumLiv:"living it now",sumNote:"For me",sumEx:"Example",sumStep:"Step",
 noStore:"This browser doesn't allow saving — marks will disappear when the page closes. Use the backup.",
 foot:["Nytka is a tool for self-discovery — your companion in working with a psychotherapist."],mStat:["chosen","in top 5","worked through"],
 close:"Close",privacyL:"Privacy",aboutL:"About",
 aboutEyebrow:"A space to find your own values",
 aboutP:["Nytka is a self-discovery tool for anyone who wants to understand themselves better, on their own or together with a psychotherapist. Values are what truly matters to you: freedom, the people close to you, honesty, calm. Like a thread, they run through all your decisions, even when you don't think about them.","There are 192 values here, each with an explanation, an example from life and questions for yourself. You sort them into “Mine”, “Maybe” and “No”, narrow down to the 12 that matter most, and see how closely your life matches them right now."],
 aboutSmall:"No sign-up: everything you mark and write stays on your device.",
 aboutGo:"Start",aboutCont:"Continue",supportL:"Support",helpL:"Get help",prev:"Previous",next:"Next",remove:"Remove from “Mine”"}
};
const COL={freedom:"red",courage:"ochre",achieve:"plum",mastery:"indigo",mind:"teal",order:"green",integrity:"indigo",justice:"plum",security:"green",calm:"teal",joy:"ochre",people:"red"};

/* ---------- data ---------- */
const V=[],BY={},CL={};
CLUSTERS.forEach(c=>{CL[c.id]=c;c.v.forEach(v=>{v.c=c.id;V.push(v);BY[v.e]=v})});
const TOTAL=V.length;

/* ---------- storage ---------- */
const KEY="nytka-v1";
const STORE=(NX&&NX.store)||{get:k=>localStorage.getItem(k),set:(k,v)=>localStorage.setItem(k,v)};
let D={lang:"uk",st:{}};let canStore=true;
function loadData(){
  try{const r=JSON.parse(STORE.get(KEY)||"null");if(r&&typeof r==="object"&&r.st)D=r;if(!NX){localStorage.setItem("__n","1");localStorage.removeItem("__n")}}catch(e){canStore=false}
  if(!D.lang)D.lang=(navigator.language||"").toLowerCase().startsWith("uk")?"uk":"uk";
}
function save(){try{STORE.set(KEY,JSON.stringify(D))}catch(e){}if(H.onChange)H.onChange()}
const S=e=>D.st[e]||{};
function setS(e,patch){const o=Object.assign({},D.st[e]||{},patch);Object.keys(o).forEach(k=>{if(o[k]===undefined||o[k]===""||o[k]===0&&k==="s"||o[k]===false)delete o[k]});if(Object.keys(o).length)D.st[e]=o;else delete D.st[e];save()}

/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const t=k=>T[D.lang][k];
const nm=v=>D.lang==="en"?v.e:v.u;
const other=v=>D.lang==="en"?v.u:v.e;
function f(v,k){if(D.lang==="en")return (EN[v.e]||{})[k]||"";if(k==="s")return X_UK[v.e][0];if(k==="k")return X_UK[v.e][1];return v[k]||""}
const cName=id=>D.lang==="en"?EN_C[id][0]:CL[id].name;
const cIntro=id=>D.lang==="en"?EN_C[id][1]:CL[id].intro;
const counts=()=>{const c={0:0,1:0,2:0,3:0};V.forEach(v=>c[S(v.e).s||0]++);return c};

/* ---------- cross-stitch sign generator ---------- */
function rng(seed){let h=2166136261>>>0;for(let i=0;i<seed.length;i++){h^=seed.charCodeAt(i);h=Math.imul(h,16777619)>>>0}if(!h)h=1;return()=>{h^=h<<13;h>>>=0;h^=h>>>17;h^=h<<5;h>>>=0;return h/4294967296}}
const signCache={};
function cells(seed){
  if(signCache[seed])return signCache[seed];
  const r=rng(seed),R=5,diamond=r()<.5,g={};
  for(let i=0;i<=R;i++)for(let j=0;j<=i;j++){
    let p=diamond?.36:.28;if(i===j)p=.6;if(j===0)p=.48;if(i===R)p-=.12;if(!diamond&&(i+j)%2===1)p*=.45;
    g[i+","+j]=(i===0)?2:(r()<p?((i+j)%3===0?1:2):0);
  }
  const ring=3+Math.floor(r()*3);for(let j=0;j<=ring;j+=2)g[ring+","+j]=g[ring+","+j]||2;if(!diamond){g["1,0"]=0;g["1,1"]=r()<.5?1:0}
  const out=[];
  for(let y=-R;y<=R;y++)for(let x=-R;x<=R;x++){
    const a=Math.abs(x),b=Math.abs(y);let i,j;
    if(diamond){i=Math.min(R,a+b);j=Math.min(i,Math.abs(a-b));if(a+b>R)continue}else{i=Math.max(a,b);j=Math.min(a,b)}
    const val=g[i+","+j];if(val)out.push([x+R,y+R,val]);
  }
  return signCache[seed]=out;
}
function sign(v,cls,stitch){
  const n=11,u=100/n,pad=u*.2;let a="",b="";
  cells(v.e).forEach(([x,y,val])=>{const X=x*u,Y=y*u;
    const s=stitch?`M${(X+pad).toFixed(1)} ${(Y+pad).toFixed(1)}L${(X+u-pad).toFixed(1)} ${(Y+u-pad).toFixed(1)}M${(X+u-pad).toFixed(1)} ${(Y+pad).toFixed(1)}L${(X+pad).toFixed(1)} ${(Y+u-pad).toFixed(1)}`
      :`M${(X+.7).toFixed(1)} ${(Y+.7).toFixed(1)}h${(u-1.4).toFixed(1)}v${(u-1.4).toFixed(1)}h-${(u-1.4).toFixed(1)}z`;
    if(val===1)a+=s;else b+=s});
  const c=`var(--th-${COL[v.c]})`;
  return stitch
    ?`<svg class="${cls||""}" viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke-linecap="round" stroke-width="${(u*.26).toFixed(1)}"><path d="${a}" style="stroke:var(--ink)"/><path d="${b}" style="stroke:${c}"/></g></svg>`
    :`<svg class="${cls||""}" viewBox="0 0 100 100" aria-hidden="true"><path d="${a}" style="fill:var(--ink)"/><path d="${b}" style="fill:${c}"/></svg>`;
}

/* ---------- icons ---------- */
const IC={
 gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>',
 sort:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="7" width="16" height="13" rx="3"/><path d="M7 4h10"/></svg>',
 lib:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>',
 mine:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9.5"/></svg>',
 home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 11l8-6 8 6v9H4z"/></svg>',
 star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/></svg>',
 lock:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="7" width="10" height="7" rx="1.5"/><path d="M5.5 7V5a2.5 2.5 0 015 0v2"/></svg>'
};

/* ---------- shell ---------- */
// «Мої» внизу: нулик, а всередині — скільки цінностей у «Моє»
function mineIcon(n){
  if(!n)return IC.mine;
  const fs=n>99?7.5:n>9?9.5:11;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9.5"/><text x="12" y="12.4" text-anchor="middle" dominant-baseline="middle" class="mi-n" font-size="${fs}">${n}</text></svg>`;
}
let view="home";
const sess={skipped:new Set(),hist:[],lf:"all",lc:"all",lq:"",openE:null,armed:false};
function shell(){
  document.documentElement.lang=D.lang==="en"?"en":"uk";
  document.title=t("brand");
  $("#brand").innerHTML=sign({e:"Nytka",c:"freedom"},"",false)+esc(t("brand"));
  const base=[["sort",t("sort")],["lib",t("lib")],["mine",t("mine")]];
  const tabs=H.tabs?H.tabs(base):base;
  const cur=H.tabOf?H.tabOf(view):view;
  $("#tabs").innerHTML=tabs.map(([k,l])=>`<button data-go="${k}" ${cur===k?'aria-current="page"':""}>${esc(l)}</button>`).join("");
  const c=counts();
  $("#bottom").innerHTML=(H.bottom?H.bottom(base):[["home",t("home")],...base]).map(([k,l])=>`<button data-go="${k}" ${cur===k?'aria-current="page"':""}${k==="mine"&&c[2]?` aria-label="${esc(l)}: ${c[2]}"`:""}>${k==="mine"?mineIcon(c[2]):IC[k]}<span>${esc(l)}</span></button>`).join("");
  const g=$("#gear");if(g){if(!g.innerHTML)g.innerHTML=IC.gear;g.setAttribute("aria-label",t("settings"));g.toggleAttribute("aria-current",view==="settings")}
  $("#lUk").setAttribute("aria-pressed",String(D.lang==="uk"));$("#lEn").setAttribute("aria-pressed",String(D.lang==="en"));
}
function go(v,keepScroll){if(v==="home"&&H.home)v=H.home;if(H.route)v=H.route(v)||v;view=v;shell();document.documentElement.classList.toggle("about-mode",v==="about");(({home:home,sort:sort,lib:lib,mine:mine,about:about})[v]||H.views[v]||(v==="settings"?siteSettings:home))();if(v!=="sort"&&H.afterRender)H.afterRender(v);if(!keepScroll)window.scrollTo(0,0)}
function rerender(){go(view,true)}

/* ---------- home ---------- */
function home(){
  const c=counts(),done=TOTAL-c[0];
  const picks=["Freedom","Courage","Mastery","Wisdom","Integrity","Inner Harmony","Love","Creativity","Joy"].map(e=>BY[e]);
  $("#view").innerHTML=`
  <section class="hero">
    <div>
      <p class="eyebrow">${esc(t("eyebrow"))}</p>
      <h1>${t("h1")}</h1>
      <p class="lead">${esc(t("lead"))}</p>
      <div class="cta"><button class="btn red" data-go="sort">${esc(done?t("cont"):t("startSort"))} →</button><button class="btn" data-go="lib">${esc(t("browse"))}</button></div>
      ${done?`<div class="prog" style="margin-top:20px;max-width:420px"><div class="track"><i style="width:${done/TOTAL*100}%"></i></div><span>${done} ${t("of")} ${TOTAL} ${t("rated")}</span></div>`:""}
      <p class="priv">${IC.lock}<span>${esc(t("privacy"))}</span></p>
      ${canStore?"":`<p class="warnbox" style="margin-top:14px">${esc(t("noStore"))}</p>`}
    </div>
    <div class="hero-art">${picks.map(v=>`<button data-detail="${esc(v.e)}" aria-label="${esc(nm(v))}" title="${esc(nm(v))}">${sign(v,"",true)}</button>`).join("")}</div>
  </section>
  <section class="how">${t("how").map((h,i)=>`<div><span class="n">0${i+1}</span><b>${esc(h[0])}</b><p>${esc(h[1])}</p></div>`).join("")}</section>
  ${done?`<div class="stat-row">${[2,1,3].map(k=>`<span class="pill"><i style="background:var(--${k===2?"mine":k===1?"maybe":"no"})"></i>${esc(t("st")[k])} ${c[k]}</span>`).join("")}</div>`:""}
  ${foot()}`;
}
const foot=()=>`<footer class="foot">${t("foot").map(x=>`<span>${esc(x)}</span>`).join("")}<span class="links"><button class="flink" data-go="about">${esc(t("aboutL"))}</button><a href="privacy.html#${D.lang}">${esc(t("privacyL"))}</a><a href="support.html#${D.lang}">${esc(t("supportL"))}</a><a href="help.html#${D.lang}">${esc(t("helpL"))}</a></span></footer>`;

/* ---------- about: what the project is ---------- */
function about(){
  const started=TOTAL-counts()[0]>0;
  $("#view").innerHTML=`<section class="about"><div class="about-txt">
    ${sign({e:"Nytka",c:"freedom"},"about-sign",true)}
    <p class="eyebrow">${esc(t("aboutEyebrow"))}</p>
    <h1>${esc(t("brand"))}</h1>
    ${t("aboutP").map(x=>`<p class="about-p">${esc(x)}</p>`).join("")}
    <p class="about-small">${esc(t("aboutSmall"))}</p>
    <button class="btn red about-go" data-about="go">${esc(started?t("aboutCont"):t("aboutGo"))} →</button>
    <button class="link about-share" data-share>${esc(t("tellB"))}</button>
  </div>${aboutArt()}</section>`;
}
/* велике полотно для широкого екрана: знак «вишивається» від центру, а з останнього хрестика тягнеться нитка */
function aboutArt(){
  const U=10,O=2,p=2,list=cells("Nytka").slice().sort((a,b)=>Math.hypot(a[0]-5,a[1]-5)-Math.hypot(b[0]-5,b[1]-5));
  const st=list.map(([x,y,val],i)=>{const X=(x+O)*U,Y=(y+O)*U;
    return `<path class="st" style="stroke:${val===1?"var(--ink)":"var(--th-red)"};animation-delay:${180+i*32}ms" d="M${X+p} ${Y+p}L${X+U-p} ${Y+U-p}M${X+U-p} ${Y+p}L${X+p} ${Y+U-p}"/>`}).join("");
  const [lx,ly]=list.reduce((m,c)=>c[1]>m[1]||(c[1]===m[1]&&c[0]>m[0])?c:m);
  const sx=(lx+O)*U+U/2,sy=(ly+O)*U+U-p;
  const thread=`<path class="thread" pathLength="1" style="animation-delay:${280+list.length*32}ms" d="M${sx} ${sy}C${sx+6} ${sy+22} ${sx+40} ${sy+8} ${sx+52} ${sy+26}S${sx+62} ${sy+40} 158 ${sy+36}"/>`;
  return `<div class="about-art" aria-hidden="true"><svg viewBox="0 0 150 150"><defs><pattern id="aida" width="10" height="10" patternUnits="userSpaceOnUse" x="-1" y="-1"><circle cx="1" cy="1" r=".9"/></pattern></defs><rect x="5" y="5" width="140" height="140" fill="url(#aida)"/><g fill="none" stroke-linecap="round" stroke-width="2.6">${st}${thread}</g></svg></div>`;
}

/* ---------- sort ---------- */
function nextTodo(){let v=V.find(x=>!S(x.e).s&&!sess.skipped.has(x.e));if(!v&&sess.skipped.size){sess.skipped.clear();v=V.find(x=>!S(x.e).s)}return v}
function sort(anim){
  const c=counts(),done=TOTAL-c[0],v=nextTodo();
  const prog=`<div class="prog"><div class="track"><i style="width:${done/TOTAL*100}%"></i></div><span>${done} ${t("of")} ${TOTAL}</span></div>`;
  if(!v){$("#view").innerHTML=`<div class="sort">${prog}<div class="done-card">${sign(BY["Inner Harmony"],"",true)}<h2>${esc(t("doneT"))}</h2><p class="muted">${esc(t("doneP"))}</p><p style="margin-top:20px"><button class="btn red" data-go="mine">${esc(t("toMine"))} →</button></p><div class="share-row"><p class="muted">${esc(t("shareHint"))}</p><button class="btn" data-share>${esc(t("shareB"))}</button></div></div></div>`;return}
  const tl=D.lang==="uk"&&v.t?`<p class="tline">${esc(t("precise"))}: <b>${esc(v.t)}</b></p>`:"";
  $("#view").innerHTML=`<div class="sort">${prog}
   <article class="scard ${anim?"enter":""}" aria-live="polite">
    <div class="sc-head">${sign(v,"",true)}<div><p class="cl-name">${esc(cName(v.c))}</p><h2>${esc(nm(v))}</h2><p class="sub">${esc(other(v))}</p></div></div>
    ${tl}<p>${esc(f(v,"m"))}</p>
    <div class="blk"><span class="lbl">${esc(t("life"))}</span><p>${esc(f(v,"l"))}</p></div>
    <div class="blk q ${H.shortCard?"":"xshort"}"><span class="lbl">${esc(t("ask"))}</span><p>${esc(f(v,"q"))}</p></div>${H.shortCard?"":`<div class="xfull">
    ${f(v,"d")?`<div class="blk d"><span class="lbl">${esc(t("confuse"))}</span><p>${esc(f(v,"d"))}</p></div>`:""}
    ${f(v,"s")?`<div class="blk sh"><span class="lbl">${esc(t("shadow"))}</span><p>${esc(f(v,"s"))}</p></div>`:""}
    <div class="blk q"><span class="lbl">${esc(t("questions"))}</span><ol><li>${esc(f(v,"q"))}</li>${t("gq").map(x=>`<li>${esc(x)}</li>`).join("")}</ol></div>
    ${f(v,"k")?`<div class="blk st"><span class="lbl">${esc(t("step"))}</span><p>${esc(f(v,"k"))}</p></div>`:""}</div>`}
    <button class="more" data-detail="${esc(v.e)}">${esc(t("more"))} →</button>
   </article>
   <div class="choices">
    <button class="c-no" data-pick="3" data-e="${esc(v.e)}">${esc(t("st")[3])}</button>
    <button class="c-maybe" data-pick="1" data-e="${esc(v.e)}">${esc(t("st")[1])}</button>
    <button class="c-mine" data-pick="2" data-e="${esc(v.e)}">${esc(t("st")[2])}</button>
   </div>
   <div class="sort-foot"><button data-undo ${sess.hist.length?"":"disabled"}>← ${esc(t("back"))}</button><button data-skip="${esc(v.e)}">${esc(t("skip"))} →</button></div>
  </div>`;
  if(!H.ownSwipe)cardSwipe(v.e);
  if(H.afterRender)H.afterRender("sort");
}
/* свайп по картці на телефоні: вправо — «Моє», вліво — «Ні» */
function cardSwipe(e){
  const card=$(".scard");if(!card)return;
  card.insertAdjacentHTML("beforeend",`<span class="stamp st-yes">${esc(t("st")[2])}</span><span class="stamp st-no">${esc(t("st")[3])}</span>`);
  const yes=card.querySelector(".st-yes"),no=card.querySelector(".st-no"),LIM=100;
  let sx=0,sy=0,dx=0,on=false,horiz=null;
  const reset=()=>{card.style.transition="transform .2s ease";card.style.transform="";yes.style.opacity=no.style.opacity=0;setTimeout(()=>card.style.transition="",220)};
  card.addEventListener("pointerdown",ev=>{if(ev.pointerType==="mouse"||ev.target.closest("button,a"))return;on=true;horiz=null;sx=ev.clientX;sy=ev.clientY;dx=0});
  card.addEventListener("pointermove",ev=>{
    if(!on)return;const mx=ev.clientX-sx,my=ev.clientY-sy;
    if(horiz===null&&(Math.abs(mx)>8||Math.abs(my)>8)){horiz=Math.abs(mx)>Math.abs(my);if(horiz)card.setPointerCapture(ev.pointerId)}
    if(!horiz)return;dx=mx;card.style.transform=`translateX(${dx}px) rotate(${dx/30}deg)`;
    const k=Math.min(1,Math.abs(dx)/LIM);(dx>0?yes:no).style.opacity=k*.55;(dx>0?no:yes).style.opacity=0;
  });
  card.addEventListener("pointerup",()=>{
    if(!on)return;on=false;if(!horiz)return;if(Math.abs(dx)<LIM){reset();return}
    card.style.transition="transform .18s ease-in, opacity .18s";card.style.transform=`translateX(${dx>0?130:-130}%) rotate(${dx>0?18:-18}deg)`;card.style.opacity=0;
    setTimeout(()=>pick(e,dx>0?2:3),170);
  });
  card.addEventListener("pointercancel",()=>{on=false;reset()});
}
function pick(e,val){if(H.onPick)H.onPick(e,val);setS(e,{s:val});sess.hist.push(e);shell();sort(true)}

/* ---------- library ---------- */
function lib(){
  $("#view").innerHTML=`<div class="lib-head"><h1>${esc(t("allT"))}</h1>
   <input class="search" id="q" type="search" placeholder="${esc(t("search"))}" value="${esc(sess.lq)}" aria-label="${esc(t("search"))}">
   <div class="chips" id="fStat">${["all",0,2,1,3].map(k=>`<button class="chip" data-lf="${k}" aria-pressed="${String(sess.lf===String(k))}">${k==="all"?esc(t("all")):`<i style="background:var(--${k===2?"mine":k===1?"maybe":k===3?"no":"line"})"></i>${esc(t("st")[k])}`}</button>`).join("")}</div>
   <div class="chips" id="fCl"><button class="chip" data-lc="all" aria-pressed="${String(sess.lc==="all")}">${esc(t("all"))}</button>${CLUSTERS.map(c=>`<button class="chip" data-lc="${c.id}" aria-pressed="${String(sess.lc===c.id)}"><i style="background:var(--th-${COL[c.id]})"></i>${esc(cName(c.id))}</button>`).join("")}</div>
  </div><div id="groups"></div>${foot()}`;
  libList();
}
function libList(){
  const q=sess.lq.trim().toLowerCase();let any=false;
  const html=CLUSTERS.filter(c=>sess.lc==="all"||sess.lc===c.id).map(c=>{
    const items=c.v.filter(v=>{const s=S(v.e).s||0;if(sess.lf!=="all"&&String(s)!==sess.lf)return false;
      if(q){const hay=(v.u+" "+v.e+" "+f(v,"m")).toLowerCase();if(!hay.includes(q))return false}return true});
    if(!items.length)return "";any=true;
    return `<section class="group" id="g-${c.id}"><h2>${esc(cName(c.id))}<small>${items.length}</small></h2><p class="intro">${esc(cIntro(c.id))}</p>
     <div class="tiles">${items.map(tile).join("")}</div></section>`}).join("");
  $("#groups").innerHTML=any?html:`<p class="empty">${esc(t("nothing"))}</p>`;
}
/* ---------- progress tracker (3 stitches) ---------- */
const WORK=["sc","note","ex"];
function work(e){const s=S(e);return {sc:s.imp!=null&&s.liv!=null,note:!!(s.note&&s.note.trim()),ex:!!(s.ex&&s.ex.trim())}}
const workN=e=>{const w=work(e);return WORK.filter(k=>w[k]).length};
const STITCH=on=>`<svg class="${on?"on":""}" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2L8 8M8 2L2 8"/></svg>`;
function track(e){const w=work(e),n=workN(e);
  const lbl=`${t("trk")}: ${n} ${t("of")} 3 — `+WORK.map(k=>(w[k]?"✓ ":"○ ")+t("trkN")[k]).join(", ");
  return `<span class="trk" role="img" aria-label="${esc(lbl)}" title="${esc(lbl)}">${WORK.map(k=>STITCH(w[k])).join("")}</span>`}
function trackFull(e){const w=work(e);return WORK.map(k=>`<span class="${w[k]?"done":""}">${STITCH(w[k])}${esc(t("trkN")[k])}</span>`).join("")}
function updTrk(){const e=sess.openE;if(!e)return;const a=$("#meTrk"),c=$("#meCount");if(a)a.innerHTML=trackFull(e);if(c)c.textContent=`${workN(e)} ${t("of")} 3`}
function tile(v){const s=S(v.e).s||0;return `<button class="tile" data-detail="${esc(v.e)}" data-s="${s}">${sign(v)}<span class="tn">${esc(nm(v))}</span><span class="ts">${esc(other(v))}</span>${s===2||workN(v.e)?track(v.e):""}${s?`<span class="stmark">${esc(t("stShort")[s])}</span>`:""}</button>`}

/* ---------- detail sheet ---------- */
function openDetail(e){sess.openE=e;renderSheet();const sp=$("#sheet .sheet");if(sp)sp.classList.add("anim");document.body.style.overflow="hidden";const sh=$("#sheet");sh.hidden=false;setTimeout(()=>{const b=sh.querySelector("[data-close-btn]");b&&b.focus({preventScroll:true})},30)}
function closeDetail(){$("#sheet").hidden=true;$("#sheet").innerHTML="";document.body.style.overflow="";sess.openE=null;rerender()}
function renderSheet(){
  const v=BY[sess.openE],st=S(v.e),idx=V.indexOf(v);
  const rng=(id,label,val)=>`<div class="rng ${val==null?"unset":""}" id="w-${id}"><label for="${id}">${esc(label)}<output id="o-${id}">${val==null?"—":val}</output></label>
     <input type="range" id="${id}" min="0" max="10" step="1" value="${val==null?5:val}"><div class="ends"><span>${esc(t("low"))}</span><span>${esc(t("high"))}</span></div></div>`;
  $("#sheet").innerHTML=`<div class="sheet-bg" data-close></div>
  <div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(nm(v))}">
   <div class="sh-bar"><button class="ib" data-nav="${idx-1}" aria-label="${esc(t("prev"))}" ${idx?"":"disabled"}>←</button><span>${esc(cName(v.c))}</span><button class="ib" data-nav="${idx+1}" aria-label="${esc(t("next"))}" ${idx<TOTAL-1?"":"disabled"}>→</button><button class="ib" data-close data-close-btn aria-label="${esc(t("close"))}">✕</button></div>
   <div class="sh-body">
    <div class="sh-hero">${sign(v,"",true)}<div><h2>${esc(nm(v))}</h2><p class="sub">${esc(other(v))}</p>${D.lang==="uk"&&v.t?`<p class="tline" style="margin-top:8px">${esc(t("precise"))}: <b>${esc(v.t)}</b></p>`:""}</div></div>
    <div class="status">${[2,1,3].map(k=>`<button data-v="${k}" data-set="${k}" aria-pressed="${String(st.s===k)}">${esc(t("st")[k])}</button>`).join("")}</div>
    <div class="secs">
     <div class="sec wide"><h3>${esc(t("what"))}</h3><p style="font-size:18px">${esc(f(v,"m"))}</p></div>
     <div class="sec"><h3>${esc(t("life"))}</h3><p>${esc(f(v,"l"))}</p></div>
     ${f(v,"d")?`<div class="sec d"><h3>${esc(t("confuse"))}</h3><p>${esc(f(v,"d"))}</p></div>`:""}
     <div class="sec shadow ${f(v,"d")?"":""}"><h3>${esc(t("shadow"))}</h3><p>${esc(f(v,"s"))}</p></div>
     <div class="sec"><h3>${esc(t("questions"))}</h3><ol><li>${esc(f(v,"q"))}</li>${t("gq").map(x=>`<li>${esc(x)}</li>`).join("")}</ol></div>
     <div class="sec step wide"><h3>${esc(t("step"))}</h3><p>${esc(f(v,"k"))}</p></div>
    </div>
    <section class="me"><div class="me-head"><h3>${esc(t("forMe"))}</h3><span id="meCount">${workN(v.e)} ${t("of")} 3</span></div><div class="metrk" id="meTrk">${trackFull(v.e)}</div>
     ${rng("imp",t("imp"),st.imp)}${rng("liv",t("liv"),st.liv)}
     <div class="fld"><label for="note">${esc(t("noteL"))}</label><textarea id="note" placeholder="${esc(t("notePh"))}">${esc(st.note||"")}</textarea></div>
     <div class="fld"><label for="ex">${esc(t("exL"))}</label><textarea id="ex" placeholder="${esc(t("exPh"))}">${esc(st.ex||"")}</textarea></div>
     <p class="autosave">${esc(t("autosave"))}</p>
    </section>${H.sheetExtra?H.sheetExtra(v):""}
   </div></div>`;
  $("#sheet .sheet").scrollTop=0;
}

/* ---------- код резервної копії: той самий блок на сайті й у застосунку ---------- */
function codePanel(){return `<div class="bk"><div class="io out" id="ioOut" role="status" data-ph="${esc(t("outPh"))}"></div>
    <button class="btn small primary" id="exp">${esc(t("genB"))}</button>
    <p class="note-ok" id="expMsg" role="status"></p></div>
   <div class="bk"><textarea class="io" id="io" placeholder="${esc(t("importPh"))}" aria-label="${esc(t("importPh"))}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"></textarea>
    <button class="btn small" id="impCode">${esc(t("importB"))}</button>
    <p class="note-ok" id="ioMsg" role="status"></p></div>`}
/* ---------- налаштування сайту (шестерня): резервна копія, розповісти, посилання, «Стерти все» внизу ---------- */
function siteSettings(){
  $("#view").innerHTML=`<div class="mine-head"><h1>${esc(t("settings"))}</h1></div>
  <section class="panel"><h2>${esc(t("tellB"))}</h2><p class="hint">${esc(t("tellHint"))}</p><div class="tools"><button class="btn small" data-share>${esc(t("tellB"))}</button></div></section>
  <section class="panel"><h2>${esc(t("backupT"))}</h2><p class="hint">${esc(t("backupHint"))}</p>${codePanel()}</section>
  <section class="panel danger"><h2>${esc(t("dangerT"))}</h2><p class="hint">${esc(t("dangerHint"))}</p>
   <div class="tools"><button class="btn small" id="wipe" style="border-color:var(--red);color:var(--red)">${esc(t("wipe"))}</button><span class="note-ok" id="wipeMsg"></span></div></section>${foot()}`;
}
/* ---------- mine ---------- */
function mine(){
  const my=V.filter(v=>S(v.e).s===2),maybe=V.filter(v=>S(v.e).s===1);
  const tops=my.filter(v=>S(v.e).top).length;
  const row=(v,isMaybe)=>{const s=S(v.e);const sc=(s.imp!=null||s.liv!=null)?`${t("sumImp")} ${s.imp??"—"} · ${t("sumLiv")} ${s.liv??"—"}`:esc(other(v));
    return `<div class="row">${sign(v,"sg")}<button class="rn" data-detail="${esc(v.e)}"><b>${esc(nm(v))}</b><span class="rsub">${!isMaybe||workN(v.e)?track(v.e):""}<span>${sc}</span></span></button>
     ${isMaybe?`<button class="mini" data-promote="${esc(v.e)}">${esc(t("toMineBtn"))}</button>`:`<button class="star" data-top="${esc(v.e)}" aria-pressed="${String(!!s.top)}" aria-label="${esc(t("top5"))}" ${!s.top&&tops>=5?"disabled style='opacity:.35'":""}>${IC.star}</button>`}</div>`};
  const gp=my.filter(v=>S(v.e).imp!=null&&S(v.e).liv!=null).map(v=>({v,i:S(v.e).imp,l:S(v.e).liv})).sort((a,b)=>(b.i-b.l)-(a.i-a.l));
  const sorted=my.slice().sort((a,b)=>(S(b.e).top?1:0)-(S(a.e).top?1:0));
  $("#view").innerHTML=`<div class="mine-head"><h1>${esc(t("mineT"))}</h1><p class="muted" style="max-width:62ch">${esc(t("mineP"))}</p></div>
  <section class="panel"><h2>${esc(t("mineList"))}</h2>
   <div class="mstats"><div><b>${my.length}<i> / 12</i></b><span>${esc(t("mStat")[0])}</span></div><div><b>${tops}<i> / 5</i></b><span>${esc(t("mStat")[1])}</span></div>${my.length?`<div><b>${my.filter(v=>workN(v.e)===3).length}<i> / ${my.length}</i></b><span>${esc(t("mStat")[2])}</span></div>`:""}</div>
   <p class="hint">${esc(t("topHint"))}</p>
   ${my.length>12?`<div class="warnbox">${esc(t("over"))}</div>`:""}
   ${my.length?`<div class="rows">${sorted.map(v=>row(v)).join("")}</div>`:`<p class="empty">${esc(t("emptyMine"))} <button class="more" data-go="sort">${esc(t("sort"))} →</button></p>`}
  </section>
  ${maybe.length?`<section class="panel"><h2>${esc(t("maybeList"))}<small>${maybe.length}</small></h2><div class="rows">${maybe.map(v=>row(v,true)).join("")}</div></section>`:""}
  <section class="panel"><h2>${esc(t("gapT"))}</h2><p class="hint">${esc(t("gapHint"))}</p>
   ${gp.length?`<div class="glegend"><span><i style="background:var(--ink)"></i>${esc(t("gapLeg")[0])}</span><span><i style="border:3px solid var(--red)"></i>${esc(t("gapLeg")[1])}</span></div>
   <div class="gap">${gp.map(({v,i,l})=>`<div class="gp"><b>${esc(nm(v))}</b><div class="gscale"><span class="ln" style="left:${Math.min(i,l)*10}%;width:${Math.abs(i-l)*10}%"></span><span class="di" style="left:${i*10}%"></span><span class="dl" style="left:${l*10}%"></span></div><span class="num">${i-l>0?"−":i-l<0?"+":""}${Math.abs(i-l)}</span></div>`).join("")}
   <div class="gaxis"><span></span><div><span>0</span><span>5</span><span>10</span></div><span></span></div></div>`:`<p class="empty" style="padding:8px 0">${esc(t("gapEmpty"))}</p>`}
  </section>
  ${H.mineExtra?H.mineExtra():""}${H.noSummary?"":`<section class="panel"><h2>${esc(t("sumT"))}</h2><p class="hint">${esc(t("sumHint"))}</p>
   <pre class="summary" id="sum">${esc(summary())}</pre>
   <div class="tools"><button class="btn small primary" id="copySum">${esc(t("copy"))}</button>${H.sumTools?H.sumTools():""}</div>
  </section>`}
  ${foot()}`;
}
/* ---------- код резервної копії ----------
   NYTKA2: стиснутий (deflate) — у 10–20 разів коротший, тож не ріжеться месенджерами на кілька повідомлень.
   NYTKA1: старий формат без стиснення — далі приймається при відновленні. */
const toB64=u=>{let s="";for(let i=0;i<u.length;i+=0x8000)s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000));return btoa(s)};
const streamTo=(data,tr)=>new Response(new Blob([data]).stream().pipeThrough(tr));
async function makeCode(){const json=JSON.stringify(D.x&&typeof D.x==="object"?{...D.st,_x:D.x}:D.st); // _x — дані застосунку (щоденник, перевірки); сайт їх пропускає
  try{if(window.CompressionStream)return "NYTKA2:"+toB64(new Uint8Array(await streamTo(json,new CompressionStream("deflate")).arrayBuffer()))}catch(e){}
  return "NYTKA1:"+toB64(new TextEncoder().encode(json))}
async function readCode(raw){
  const s=String(raw||"").replace(/[\s\u00a0\u200b-\u200d\u2060\ufeff]/g,"");
  const m=s.match(/nytka([12]):([A-Za-z0-9+\/=_%-]+)/i);if(!m)throw 0;
  let d=m[2];if(/%[0-9a-f]{2}/i.test(d))d=decodeURIComponent(d);
  d=d.replace(/-/g,"+").replace(/_/g,"/").replace(/=+$/,"");while(d.length%4)d+="=";
  const bin=atob(d),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
  const txt=m[1]==="2"?await streamTo(u,new DecompressionStream("deflate")).text():new TextDecoder().decode(u);
  const st=JSON.parse(txt);if(!st||typeof st!=="object"||Array.isArray(st))throw 0;
  const out={};Object.keys(st).forEach(k=>{if(BY[k]&&st[k]&&typeof st[k]==="object")out[k]=st[k]});
  return {st:out,x:st._x&&typeof st._x==="object"&&!Array.isArray(st._x)?st._x:null};
}
async function checkCode(){
  const io=$("#io"),m=$("#ioMsg");if(!io||!m)return;const raw=io.value.trim();
  if(!raw){m.textContent="";m.className="note-ok";return}
  try{const {st}=await readCode(raw);if(io.value.trim()!==raw)return;const v=Object.values(st);
    m.textContent=t("codeOk")(v.filter(x=>x.s===2).length,v.filter(x=>x.s>0).length);m.className="note-ok good"}
  catch(x){if(io.value.trim()===raw){m.textContent=t("badCode");m.className="note-ok bad"}}
}
async function restoreCode(){
  const io=$("#io"),raw=((io&&io.value)||"").trim(),say=(k,c)=>{const m=$("#ioMsg");if(m){m.textContent=t(k);m.className="note-ok "+(c||"")}};
  if(!raw){say("pasteFirst");if(io)io.focus();return}
  let r;try{r=await readCode(raw)}catch(x){say("badCode","bad");return}
  D.st=r.st;if(r.x&&H.acceptsX)D.x=r.x;save();shell();rerender();say("imported","good");
}
function summary(){
  const my=V.filter(v=>S(v.e).s===2);if(!my.length)return t("emptyMine");
  const top=my.filter(v=>S(v.e).top),rest=my.filter(v=>!S(v.e).top);
  const line=(v,i)=>{const s=S(v.e);let o=`${i+1}. ${nm(v)} (${other(v)})`;
    if(s.imp!=null||s.liv!=null)o+=`\n   ${t("sumImp")}: ${s.imp??"—"}/10 · ${t("sumLiv")}: ${s.liv??"—"}/10`;
    if(s.note)o+=`\n   ${t("sumNote")}: ${s.note.trim()}`;if(s.ex)o+=`\n   ${t("sumEx")}: ${s.ex.trim()}`;return o};
  let o=t("sumHead")+"\n\n";
  if(top.length)o+=t("sumTop")+"\n"+top.map(line).join("\n")+"\n\n";
  if(rest.length)o+=(top.length?t("sumRest"):t("mineList"))+"\n"+rest.map(line).join("\n");
  return o.trim();
}
/* запасний спосіб копіювання для старих браузерів і вбудованих браузерів месенджерів */
function legacyCopy(txt){const ta=document.createElement("textarea");ta.value=txt;ta.setAttribute("readonly","");
  ta.style.cssText="position:fixed;top:0;left:0;opacity:0;font-size:16px";document.body.appendChild(ta);ta.select();
  try{ta.setSelectionRange(0,txt.length)}catch(e){}let ok=false;try{ok=document.execCommand("copy")}catch(e){}ta.remove();return ok}
function copyText(txt,btn,field,done){
  const ok=()=>{if(btn){btn.textContent=t("copied");setTimeout(()=>btn.textContent=btn.dataset.l,1800)}if(done)done(true)};
  const fb=()=>{legacyCopy(txt)?ok():done&&done(false)};
  try{navigator.clipboard.writeText(txt).then(ok,fb)}catch(e){fb()}}
/* «Поділитися «Ниткою»»: ділимося лише посиланням на сайт, ніколи не даними людини */
const SITE="https://nytka.life";
async function shareSite(btn){
  const text=t("shareMsg");
  if(H.share){H.share(text,SITE);return}
  if(navigator.share){try{await navigator.share({title:"Нитка",text,url:SITE});return}catch(e){if(e&&e.name==="AbortError")return}}
  if(!btn.dataset.l)btn.dataset.l=btn.textContent;
  const done=()=>{btn.textContent=t("linkCopied");setTimeout(()=>btn.textContent=btn.dataset.l,1800)};
  try{await navigator.clipboard.writeText(text+" "+SITE);done()}catch(e){if(legacyCopy(text+" "+SITE))done()}
}
/* «Згенерувати код» → код з'являється в полі, кнопка стає «Скопіювати код» */
async function genCode(btn){const out=$("#ioOut");if(!out)return;btn.disabled=true;
  out.textContent=await makeCode();btn.disabled=false;btn.textContent=btn.dataset.l=t("exportB");btn.dataset.ready="1";
  const m=$("#expMsg");if(m){m.textContent="";m.className="note-ok"}}
function copyCode(btn){const out=$("#ioOut");if(!out||!out.textContent)return;
  copyText(out.textContent,btn,out,ok=>{const m=$("#expMsg");if(m){m.textContent=t(ok?"copiedCode":"copyManual");m.className="note-ok "+(ok?"good":"")}})}

/* ---------- events ---------- */
document.addEventListener("touchstart",()=>{},{passive:true}); // щоб на iPhone працював :active (натиск)
/* текст і зображення не виділяються й не копіюються; працюють тільки поля вводу (нотатки, пошук, поле для вставки коду).
   Код резервної копії копіюється лише кнопкою. */
const editable=n=>{const el=n&&(n.nodeType===3?n.parentElement:n);return !!(el&&el.closest&&el.closest("input,textarea"))};
["copy","cut","selectstart","contextmenu","dragstart"].forEach(ev=>document.addEventListener(ev,e=>{if(!editable(e.target))e.preventDefault()}));
document.addEventListener("click",e=>{
  const el=e.target.closest("button,[data-close]");if(!el)return;
  if(el.dataset.go){if(sess.openE)closeDetail();go(el.dataset.go);return}
  if(el.dataset.about){D.about=1;save();go("home");return}
  if(el.dataset.lang){D.lang=el.dataset.lang;save();if(sess.openE)renderSheet();rerender();return}
  if(el.dataset.detail){openDetail(el.dataset.detail);return}
  if(el.hasAttribute("data-close")){closeDetail();return}
  if(el.dataset.nav){const i=+el.dataset.nav;if(V[i]){sess.openE=V[i].e;renderSheet()}return}
  if(el.dataset.set){const e2=sess.openE,k=+el.dataset.set;setS(e2,{s:S(e2).s===k?0:k});if(S(e2).s!==2)setS(e2,{top:false});renderSheet();shell();return}
  if(el.dataset.pick){pick(el.dataset.e,+el.dataset.pick);return}
  if(el.hasAttribute("data-undo")){const e2=sess.hist.pop();if(e2){setS(e2,{s:0});shell();sort(true)}return}
  if(el.dataset.skip){sess.skipped.add(el.dataset.skip);sort(true);return}
  if(el.dataset.lf!=null){sess.lf=el.dataset.lf;document.querySelectorAll("[data-lf]").forEach(b=>b.setAttribute("aria-pressed",String(b===el)));libList();return}
  if(el.dataset.lc){sess.lc=el.dataset.lc;document.querySelectorAll("[data-lc]").forEach(b=>b.setAttribute("aria-pressed",String(b===el)));libList();return}
  if(el.dataset.top){const s=S(el.dataset.top);setS(el.dataset.top,{top:!s.top});mine();return}
  if(el.dataset.promote){setS(el.dataset.promote,{s:2});shell();mine();return}
  if(el.hasAttribute("data-share")){shareSite(el);return}
  if(el.id==="copySum"){el.dataset.l=t("copy");copyText(summary(),el,$("#sum"));return}
  if(el.id==="exp"){if(el.dataset.ready)copyCode(el);else genCode(el);return}
  if(el.id==="impCode"){restoreCode();return}
  if(el.id==="wipe"){if(!sess.armed){sess.armed=true;$("#wipeMsg").textContent=t("wipeAsk");setTimeout(()=>{sess.armed=false;const m=$("#wipeMsg");if(m)m.textContent=""},3500);return}
    sess.armed=false;D.st={};sess.hist=[];if(H.onWipe)H.onWipe();save();shell();rerender();return}
});
document.addEventListener("input",e=>{
  const el=e.target;
  if(el.id==="q"){sess.lq=el.value;libList();return}
  if(el.id==="io"){checkCode();return}
  if(!sess.openE)return;
  if(el.id==="imp"||el.id==="liv"){const v=+el.value;setS(sess.openE,{[el.id]:v});$("#o-"+el.id).textContent=v;$("#w-"+el.id).classList.remove("unset");updTrk();return}
  if(el.id==="note"||el.id==="ex"){setS(sess.openE,{[el.id]:el.value});updTrk();return}
});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"&&sess.openE){closeDetail();return}
  if(sess.openE||view!=="sort")return;
  if(/^(INPUT|TEXTAREA)$/.test((e.target||{}).tagName||""))return;
  const map={"1":2,"2":1,"3":3};const v=nextTodo();
  if(map[e.key]&&v){e.preventDefault();pick(v.e,map[e.key])}
});
H.views={};
const API={codePanel,sortView:sort,libView:lib,summaryText:summary,readCode,makeCode,T,IC,COL,V,BY,CL,TOTAL,KEY,get D(){return D},set D(x){D=x},S,setS,save,t,esc,nm,other,f,cName,cIntro,counts,sign,cells,
  go,rerender,shell,sess,$,openDetail,closeDetail,renderSheet,summary,work,workN,track,STITCH,pick,nextTodo,foot,copyText,get view(){return view}};
function boot(){loadData();go(D.about?"home":"about")}
if(NX){NX.attach(API,H);Promise.resolve(NX.ready).then(boot)}else boot();
})();
