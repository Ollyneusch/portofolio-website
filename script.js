const CONFIG = {
  name: "Evelyna Apta Kristiadi",
  lead: "An aspiring tech enthusiast passionate about learning, creating, and solving problems through technology.",
    bio: "I am an Information Systems undergraduate at UNESA with student ID 26051214021. I am interested in data analysis, software development, and graphic design. I enjoy exploring new technologies, participating in various projects and activities, and developing my technical and analytical skills. I am committed to continuous learning and creating practical digital solutions through technology.",
    info: [
    ["Location", "Surabaya, East Java, Indonesia"],
    ["Education", "Bachelor's Degree in Information Systems"],
    ["Status", "Undergraduate"],
    ["Languages", "Indonesia, English"]
  ],
  cvFile: "User/CV.pdf",                     
  links: {
    email: "kristiadievelyna@gmail.com",
    instagram: "ollyn_hf",          
    github: "ollyneusch",         
    linkedin: "evelyna-apta-kristiadi-4b4192441"  
  },
  mailSubject: "Hi, I want to discuss a project with you",
  mailBody: "Hello [Name],\n\nI saw your portfolio and would like to discuss a project with you.\n\nThank you."
};

const PROJECTS = [
  { title: "SmartRoof System", cat: "IoT", colors: ["#2563eb", "#38bdf8"],
    long: "An Arduino-based system that uses water and light sensors for monitoring and controlling roof conditions.",
    tags: ["Arduino", "C/C++", "Embedded Systems"]},
  { title: "Portofolio Website", cat: "Web", colors: ["#0ea5e9", "#1d4ed8"],
    long: "Website portofolio untuk menampilkan proyek dan pengalaman kerja.",
    tags: ["HTML", "CSS", "JavaScript"]},
  { title: "AgroNusa Ecosystem App", cat: "Business Innovation", colors: ["#2563eb", "#38bdf8"],
    long: "A web application that provides real-time weather information using a public API.",
    tags: ["UI/UX Design", "IoT", "Business Innovation"]},
];

const SKILLS = [
  ["HTML & JavaScript", "Frontend", "Building structured web pages with interactive features."],
  ["Python", "Backend", "Writing scripts, processing data, and solving problems through code."],
  ["Arduino", "IoT", "Developing microcontroller-based projects using sensors and electronic components."],
  ["UI/UX Design", "Design", "Designing intuitive user interfaces and user experiences."],
  ["Design Graphics", "Design", "Creating visual content for digital content and communication."],
  ["Canva", "Tools", "Designing presentations, social media content, and other digital content."],
  ["Visual Studio Code", "Tools", "Writing code in an integrated development environment."],
  ["Git & GitHub", "Tools", "Team collaboration through branching and pull requests."]
];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
const typing = () => /INPUT|TEXTAREA/.test(document.activeElement.tagName);

const L = CONFIG.links;
document.title = "Portofolio - " + CONFIG.name;
$("#brand").textContent = CONFIG.name;        
$("#hName").textContent = CONFIG.name;         
$("#hLead").textContent = CONFIG.lead;         
$("#aName").textContent = CONFIG.name;          
$("#aBio").textContent = CONFIG.bio;           
$("#aInfo").innerHTML = CONFIG.info.map(([k, v]) => `<div><small>${k}</small><span>${v}</span></div>`).join("");

const ICONS = {
  Gmail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/>',
  Instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
  GitHub: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  LinkedIn: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>'
};
const SOCIAL = [
  ["Gmail", "mailto:" + L.email],
  ["Instagram", "https://instagram.com/" + L.instagram],
  ["GitHub", "https://github.com/" + L.github],
  ["LinkedIn", "https://linkedin.com/in/" + L.linkedin]
];
$("#social").innerHTML = SOCIAL.map(([n, href]) =>
  `<a href="${href}" ${n === "Gmail" ? "" : 'target="_blank" rel="noopener"'} aria-label="${n}">
     <svg class="ic" viewBox="0 0 24 24">${ICONS[n]}</svg>${n}</a>`).join("");

$("#cvView").href = CONFIG.cvFile;
$("#cvDl").href = CONFIG.cvFile;

const mailto = `mailto:${L.email}?subject=${encodeURIComponent(CONFIG.mailSubject)}&body=${encodeURIComponent(CONFIG.mailBody)}`;
$$(".js-mail").forEach(a => a.href = mailto);

const VIEWS = ["beranda", "proyek", "keahlian", "tentang"];
let current = "beranda";

function show(name) {
  if (!VIEWS.includes(name)) name = "beranda";
  current = name;
  VIEWS.forEach(v => $("#view-" + v).classList.toggle("active", v === name));
  $$("#menu button").forEach(b => b.classList.toggle("active", b.dataset.view === name));
  if (name === "keahlian") renderSkills();
}
function go(name) { if (location.hash.slice(1) === name) show(name); else location.hash = name; }

addEventListener("hashchange", () => show(location.hash.slice(1)));
$$("#menu button").forEach(b => b.addEventListener("click", () => go(b.dataset.view)));
document.addEventListener("click", e => { const g = e.target.closest("[data-go]"); if (g) go(g.dataset.go); });
document.addEventListener("keydown", e => {
  if (typing() || e.ctrlKey || e.metaKey || e.altKey) return;
  const i = parseInt(e.key, 10);
  if (i >= 1 && i <= 4) go(VIEWS[i - 1]);            
  if (current === "proyek") {                            
    if (e.key === "ArrowDown" || e.key === "ArrowRight") pick(pIdx + 1);
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") pick(pIdx - 1);
  }
});

let pIdx = 0;
$("#pList").innerHTML = PROJECTS.map((p, i) => `
  <button class="prow" data-i="${i}">
    <small>${String(i + 1).padStart(2, "0")}</small>
    <div><b>${p.title}</b><span>${p.cat}</span></div>
  </button>`).join("");
$("#pList").addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) pick(+b.dataset.i); });

function pick(i) {
  pIdx = (i + PROJECTS.length) % PROJECTS.length;
  const p = PROJECTS[pIdx], d = $("#pDetail");
  $$(".prow").forEach((r, n) => r.classList.toggle("active", n === pIdx));
  d.innerHTML = `
    <div class="banner" style="background:linear-gradient(135deg,${p.colors[0]},${p.colors[1]})">${String(pIdx + 1).padStart(2, "0")}</div>
    <div class="dbody">
      <div class="cat">${p.cat}</div>
      <h3>${p.title}</h3>
      <p>${p.long}</p>
      <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
    </div>`;
  d.classList.remove("swap"); void d.offsetWidth; d.classList.add("swap");   // animasi ganti proyek
  const a = $(".prow.active"); if (a) a.scrollIntoView({ block: "nearest", inline: "center" });
}
pick(0);

function renderSkills() {
  $("#skillGrid").innerHTML = SKILLS.map(([n, c, d], i) => `
    <article class="skill" style="animation-delay:${i * 50}ms">
      <small>${c}</small>
      <h3>${n}</h3>
      <p>${d}</p>
    </article>`).join("");
}

function setTheme(dark) {
  document.body.classList.toggle("dark", dark);         
  $("#theme").textContent = dark ? "☀" : "☾";
  store.set("theme", dark ? "dark" : "light");
}
$("#theme").addEventListener("click", () => setTheme(!document.body.classList.contains("dark")));
setTheme(store.get("theme") === "dark");

show(location.hash.slice(1) || "beranda");
