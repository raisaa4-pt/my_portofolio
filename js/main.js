document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  initNavbar();
  initScrollReveal();
  initSkillBars();
  initTypewriter();
  initContactForm();
  initBackTop();
  initSmoothScroll();
});


function renderAll() {
  const d = data;


  document.title = `${d.name} — Portfolio`;


  document.querySelectorAll("[data-initials]").forEach(el => el.textContent = d.initials);

  
  document.getElementById("hero-name").textContent     = d.name;
  document.getElementById("hero-role").textContent     = d.role;
  document.getElementById("hero-tagline").textContent  = d.tagline;


  document.getElementById("hc-uni").innerHTML   = `<span>President University</span> · Informatics`;
  document.getElementById("hc-gpa").innerHTML   = `GPA <span>${d.stats[0].num}</span>`;
  document.getElementById("hc-proj").innerHTML  = `<span>${d.stats[1].num}</span> Projects`;
  document.getElementById("hc-avail").innerHTML = `<span>Open to Work</span>`;

  document.getElementById("about-text").textContent = d.about;
  const boxes = document.querySelectorAll(".stat-box");
  d.stats.forEach((s, i) => {
    if (boxes[i]) {
      boxes[i].querySelector(".stat-n").textContent = s.num;
      boxes[i].querySelector(".stat-l").textContent = s.label;
    }
  });


  const barsEl = document.getElementById("skills-bars");
  barsEl.innerHTML = d.skills.map((s, i) => `
    <div class="skill-row reveal" style="transition-delay:${i * 0.06}s">
      <div class="skill-top">
        <span class="skill-name">${s.icon} ${s.name}</span>
        <span class="skill-pct">${s.level}%</span>
      </div>
      <div class="skill-track">
        <div class="bar-fill" style="width:${s.level}%"></div>
      </div>
    </div>`).join("");

 
  document.getElementById("soft-chips").innerHTML =
    d.softSkills.map(s => `<span class="chip">${s}</span>`).join("");

 
  document.getElementById("tool-chips").innerHTML =
    d.tools.map(t => `<span class="chip chip-navy">${t}</span>`).join("");

 
  document.getElementById("lang-list").innerHTML =
    d.languages.map(l => `
      <div class="lang-item reveal">
        <div class="lang-top">
          <span class="lang-name">${l.lang}</span>
          <span class="lang-level">${l.level}</span>
        </div>
        <div class="lang-track">
          <div class="lang-fill bar-fill" style="width:${l.pct}%"></div>
        </div>
      </div>`).join("");


  document.getElementById("proj-grid").innerHTML =
    d.projects.map((p, i) => `
      <div class="proj-card lift reveal ${p.featured ? "feat" : ""}" style="transition-delay:${i * 0.08}s">
        <div class="proj-top">
          <div class="proj-emoji">${p.emoji}</div>
          <div class="proj-meta">
            ${p.featured ? '<span class="proj-feat-badge">Featured</span>' : ""}
            <div class="proj-links">
              ${p.github !== "#" ? `
                <a href="${p.github}" target="_blank" class="proj-link" title="GitHub">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </a>` : ""}
              ${p.live !== "#" ? `
                <a href="${p.live}" target="_blank" class="proj-link" title="Live Demo">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>` : ""}
            </div>
          </div>
        </div>
        <div class="proj-type">${p.type}</div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="proj-tech">
          ${p.tech.map(t => `<span class="tech-chip">${t}</span>`).join("")}
        </div>
      </div>`).join("");


  document.getElementById("edu-tl").innerHTML =
    d.education.map(e => `
      <div class="tl-item reveal">
        <div class="tl-dot"></div>
        <div class="tl-year">${e.year}</div>
        <div class="tl-degree">${e.degree}</div>
        <div class="tl-school">${e.school}</div>
        <div class="tl-detail">${e.detail}</div>
      </div>`).join("");


  document.getElementById("courses-list").innerHTML =
    d.courses.map(c => `
      <div class="course-card reveal">
        <div class="course-icon">🎖️</div>
        <div class="course-body">
          <div class="course-name">${c.name}</div>
          <div class="course-meta">${c.issuer} · ${c.date}</div>
          <div class="course-desc">${c.desc}</div>
        </div>
      </div>`).join("");


  const org = d.organization;
  document.getElementById("org-period").textContent  = org.period;
  document.getElementById("org-role").textContent    = org.role;
  document.getElementById("org-name").textContent    = org.org;
  document.getElementById("org-desc").textContent    = org.desc;

  const ce = document.getElementById("c-email");
  const cg = document.getElementById("c-github");
  const cl = document.getElementById("c-linkedin");
  const ci = document.getElementById("c-instagram");
  const cp = document.getElementById("c-phone");

  ce.textContent  = d.email;
  ce.href         = `mailto:${d.email}`;
  cg.textContent  = d.github.replace("https://", "");
  cg.href         = d.github;
  cl.textContent  = d.linkedin.replace("https://", "");
  cl.href         = d.linkedin;
  ci.textContent  = d.instagram.replace("https://", "");
  ci.href         = d.instagram;
  cp.textContent  = d.phone;
  cp.href         = `tel:${d.phone}`;

  document.querySelectorAll("[data-github]").forEach(el   => el.href = d.github);
  document.querySelectorAll("[data-linkedin]").forEach(el => el.href = d.linkedin);
  document.querySelectorAll("[data-instagram]").forEach(el => el.href = d.instagram);
}


function initNavbar() {
  const nav  = document.querySelector(".navbar");
  const secs = document.querySelectorAll("section[id]");
  const lnks = document.querySelectorAll(".nav-link[href^='#']");
  const burg = document.querySelector(".burger");
  const mob  = document.querySelector(".mob-menu");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
    let cur = "";
    secs.forEach(s => { if (window.scrollY >= s.offsetTop - 90) cur = s.id; });
    lnks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${cur}`));
  });

  burg?.addEventListener("click", () => {
    burg.classList.toggle("open");
    mob.classList.toggle("open");
  });
  mob?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    burg.classList.remove("open");
    mob.classList.remove("open");
  }));
}


function initScrollReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("on");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -28px 0px" });

  document.querySelectorAll(".reveal, .reveal-l, .reveal-r, .reveal-scale")
    .forEach(el => io.observe(el));
}


function initSkillBars() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".bar-fill").forEach((b, i) =>
          setTimeout(() => b.classList.add("go"), i * 80));
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  ["skills", "contact"].forEach(id => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });


  const langSec = document.getElementById("skills");
  if (langSec) {
    const io2 = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll(".lang-fill").forEach((b, i) =>
            setTimeout(() => b.classList.add("go"), i * 120));
          io2.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    io2.observe(langSec);
  }
}


function initTypewriter() {
  const el = document.getElementById("tw");
  if (!el) return;
  const words = data.typewriterWords;
  let wi = 0, ci = 0, del = false, paused = false;

  function tick() {
    if (paused) return;
    const w = words[wi];
    if (!del) {
      el.textContent = w.slice(0, ++ci);
      if (ci === w.length) {
        paused = true;
        setTimeout(() => { paused = false; del = true; tick(); }, 1900);
        return;
      }
      setTimeout(tick, 90);
    } else {
      el.textContent = w.slice(0, --ci);
      if (ci === 0) {
        del = false;
        wi = (wi + 1) % words.length;
        setTimeout(tick, 380);
        return;
      }
      setTimeout(tick, 46);
    }
  }
  tick();
}


function initContactForm() {
  const form = document.getElementById("c-form");
  const succ = document.getElementById("f-success");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const btn = form.querySelector(".f-submit");
    btn.textContent = "Mengirim...";
    btn.disabled = true;
    setTimeout(() => {
      form.style.display = "none";
      succ.style.display = "block";
    }, 1100);
  });
}


function initBackTop() {
  const btn = document.getElementById("back-top");
  if (!btn) return;
  window.addEventListener("scroll", () =>
    btn.classList.toggle("show", window.scrollY > 480));
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const t = document.querySelector(a.getAttribute("href"));
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.offsetTop - 64, behavior: "smooth" });
    });
  });
}