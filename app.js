/* App logic. Content lives in content.js. */
(function () {
  "use strict";
  var S = window.SITE;
  var ALL = window.PROJECTS || [];
  var P = ALL.filter(function (p) { return !p.hidden; });
  var MIX_ON = window.MIXTAPE_ENABLED === true;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mobileMQ = window.matchMedia ? window.matchMedia("(max-width: 767px)") : { matches: false };
  var smooth = reduceMotion ? "auto" : "smooth";

  /* A value counts as missing if it's empty or still holds bracketed placeholder text. */
  function filled(v) { return v != null && String(v).trim() !== "" && !/\[[^\]]*\]/.test(String(v)); }

  var ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" aria-hidden="true"><path d="M12 8v5M12 16.5h.01"/><circle cx="12" cy="12" r="10"/></svg>'
  };
  var SHELVES = [
    { key: "ux", title: "UX case studies", sub: "Research, flows, prototypes, testing" },
    { key: "brand", title: "Brand & packaging", sub: "Interaction design for physical things" },
    { key: "motion", title: "Motion & social", sub: "The looser, more playful work" }
  ];
  var FILTERS = ["All", "UX/UI", "Research", "Spatial/XR", "Branding & packaging", "Motion & social"];
  var WHO = { recruiter: "Recruiter", designer: "Fellow designer", collaborator: "Collaborator", browsing: "Just browsing" };

  var bySlug = {};
  P.forEach(function (p) { bySlug[p.slug] = p; (p.aliases || []).forEach(function (a) { bySlug[a] = p; }); });
  var mailto = "mailto:" + S.email + "?subject=" + encodeURIComponent("Hello from your portfolio");
  var resume = S.links.resume;

  function yr(p) { return filled(p.year) ? p.year : ""; }
  function shelfName(p) { return p.shelf === "ux" ? "Case study" : p.shelf === "brand" ? "Brand & packaging" : "Motion & social"; }
  function cover(p, alt) {
    if (p.cover) return '<img src="' + esc(p.cover) + '" alt="' + esc(alt || "") + '" loading="lazy" decoding="async" style="background:' + esc(p.coverBg || "#ddd") + '">';
    return '<div class="cover-text" style="background:linear-gradient(135deg,' + esc(p.coverBg || p.accent) + ',' + esc(p.accent) + ')">' + esc(p.coverText || p.title) + "</div>";
  }
  function thumbStyle(p) {
    return p.cover ? "background-image:url(" + esc(p.cover) + ");background-color:" + esc(p.coverBg || "#ddd") : "background:" + esc(p.accent);
  }

  /* ---------- Theme (dark by default) ---------- */
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    $("#theme-icon").innerHTML = t === "dark" ? ICON.sun : ICON.moon;
    $("#theme").setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
    var m = $('meta[name="theme-color"]'); if (m) m.setAttribute("content", t === "dark" ? "#121212" : "#ffffff");
  }
  setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
  $("#theme").addEventListener("click", function () {
    var t = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(t); store.set("pd-theme", t);
  });

  /* ---------- Static bits ---------- */
  $("#hero-avatar").src = S.avatar;
  $("#np-art").src = S.avatarStill;
  $("#hero-role").textContent = S.role + " · " + S.location;
  $("#hero-name").textContent = S.name;
  $("#hero-lead").textContent = S.position;
  $("#hero-avail").textContent = S.availability;
  var ux = P.filter(function (p) { return p.shelf === "ux"; }).length;
  $("#hero-stats").innerHTML = "<span><b>" + P.length + "</b> projects</span><span><b>" + ux + "</b> UX case studies</span><span><b>1st place</b> India HCI 2024</span><span><b>MSc</b> at KTH Stockholm</span>";
  ["#hero-contact", "#contact-top", "#f-email", "#wwm-email"].forEach(function (s) { $(s).href = mailto; });
  $("#wwm-email").textContent = "Email " + S.email;
  ["#hero-linkedin", "#f-linkedin", "#wwm-linkedin"].forEach(function (s) { $(s).href = S.links.linkedin; });
  $("#f-behance").href = S.links.behance;
  ["#resume-top", "#hero-resume", "#f-resume", "#wwm-resume"].forEach(function (s) { var el = $(s); if (resume) el.href = resume; else el.hidden = true; });
  $("#wwm-sub").hidden = true;

  var ti = 0, ticker = $("#ticker");
  function tick() { ticker.textContent = "Currently: " + S.currently[ti % S.currently.length]; ti++; }
  tick(); if (!reduceMotion) setInterval(tick, 4500);

  /* ---------- Library ---------- */
  $("#lib-count").textContent = P.length;
  $("#lib-list").innerHTML = P.map(function (p) {
    return '<li><button class="lib-item" type="button" data-open="' + esc(p.slug) + '"><span class="lib-thumb" style="' + thumbStyle(p) + '" aria-hidden="true"></span><span class="lib-meta"><span class="lib-title">' + esc(p.title) + '</span><span class="lib-sub">' + shelfName(p) + (yr(p) ? " · " + esc(yr(p)) : "") + "</span></span></button></li>";
  }).join("");

  /* ---------- Chips ---------- */
  $("#chips").innerHTML = FILTERS.map(function (f, i) { return '<button type="button" class="chip" aria-pressed="' + (i === 0) + '" data-f="' + esc(f) + '">' + esc(f) + "</button>"; }).join("");
  $("#chips").addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    $$(".chip").forEach(function (c) { c.setAttribute("aria-pressed", String(c === b)); });
    var f = b.dataset.f;
    $$(".card").forEach(function (c) { var p = bySlug[c.dataset.open]; c.hidden = f !== "All" && p.tags.indexOf(f) < 0; });
    $$(".shelf-sec").forEach(function (s) { s.hidden = !$$(".card:not([hidden])", s).length; });
    if (f !== "All") document.getElementById("work").scrollIntoView({ behavior: smooth, block: "start" });
  });

  /* ---------- Start here ---------- */
  $("#popular-list").innerHTML = S.recruiterPicks.map(function (s, i) {
    var p = bySlug[s]; if (!p) return "";
    return '<li><button type="button" class="track" data-open="' + esc(p.slug) + '"><span class="num">' + (i + 1) + '</span><span class="thumb" style="' + thumbStyle(p) + '" aria-hidden="true"></span><span><span class="t1">' + esc(p.title) + '</span><br><span class="t2">' + esc(p.cardLine) + "</span></span>" + (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "<span></span>") + "</button></li>";
  }).join("");

  /* ---------- Shelves ---------- */
  $("#shelves").innerHTML = SHELVES.map(function (sh) {
    var items = P.filter(function (p) { return p.shelf === sh.key; });
    if (!items.length) return "";
    return '<section class="block shelf-sec" aria-labelledby="sh-' + sh.key + '"><div class="sec-head"><h2 id="sh-' + sh.key + '">' + esc(sh.title) + "</h2><p>" + esc(sh.sub) + '</p></div><div class="shelf">' + items.map(function (p) {
      return '<button type="button" class="card" data-open="' + esc(p.slug) + '" aria-label="Open ' + esc(p.title) + '"><div class="cover">' + cover(p, "") + '<span class="play-mini" aria-hidden="true">' + ICON.play + '</span></div><span class="card-title">' + esc(p.title) + '</span><span class="card-sub">' + esc(p.cardLine || p.subtitle) + '</span><span class="card-tags">' + p.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</span></button>";
    }).join("") + "</div></section>";
  }).join("");

  /* ---------- Wrapped ---------- */
  $("#wrapped-grid").innerHTML = S.wrapped.map(function (w) { return '<div class="wcard w-' + esc(w.tone) + '"><div class="n">' + esc(w.n) + '</div><div class="l">' + esc(w.l) + "</div></div>"; }).join("");

  /* ---------- Liked Skills: Methods and Tools ---------- */
  $("#methods").innerHTML = S.methods.map(function (m, i) {
    var u = m.used, p = u && bySlug[u[0]];
    var link = p ? '<a href="#/work/' + esc(p.slug) + '" class="used-link" data-open="' + esc(p.slug) + '" data-sec="' + esc(u[1]) + '">' + esc(u[2] || p.title) + "</a>" : "";
    return "<tr><td>" + (i + 1) + "</td><td>" + esc(m.n) + '</td><td class="used">' + link + "</td></tr>";
  }).join("");
  $("#tools").innerHTML = S.tools.map(function (t, i) { return "<tr><td>" + (i + 1) + "</td><td>" + esc(t.n) + '</td><td class="dur">' + esc(t.d) + "</td></tr>"; }).join("");
  $("#liked-count").textContent = "Pearl Dawar · " + S.methods.length + " methods, " + S.tools.length + " tools";

  /* ---------- About ---------- */
  $("#about-text").innerHTML = '<p class="strong">' + esc(S.bio) + "</p><p>" + esc(S.howIWork) + "</p>";
  $("#exp").innerHTML = S.experience.map(function (x) { return '<li><span class="r">' + esc(x.role) + '</span><span class="w">' + esc(x.when) + '</span><span class="o">' + esc(x.org) + "</span></li>"; }).join("");

  /* ---------- Lyrics ---------- */
  $("#lyrics").innerHTML = S.philosophy.map(function (l) { return '<p class="lyric">' + esc(l) + "</p>"; }).join("");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var lo = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle("lit", e.isIntersecting); }); }, { rootMargin: "-30% 0px -35% 0px" });
    $$(".lyric").forEach(function (l) { lo.observe(l); });
  } else { $$(".lyric").forEach(function (l) { l.classList.add("lit"); }); }

  /* ---------- Work with me ---------- */
  $("#services").innerHTML = (S.services || []).map(function (s) { return '<div class="svc"><h4>' + esc(s.h) + "</h4><ul>" + s.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>"; }).join("");
  var wwm = $("#work-with-me"), wwmHome = wwm.nextElementSibling;

  /* ---------- Topbar shadow ---------- */
  var topbar = $("#topbar");
  window.addEventListener("scroll", function () { topbar.classList.toggle("scrolled", window.scrollY > 10); }, { passive: true });

  /* ---------- Open handlers ---------- */
  document.addEventListener("click", function (e) {
    var o = e.target.closest("[data-open]");
    if (o) { e.preventDefault(); openCase(o.dataset.open, o, o.dataset.sec); }
  });

  /* ========== Overlays ========== */
  var lastFocus = null;
  function trap(container, e) {
    if (e.key !== "Tab") return;
    var f = $$('a[href],button:not([disabled]),iframe,input,textarea,summary,[tabindex]:not([tabindex="-1"])', container).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function openOverlay(el, from) { lastFocus = from || document.activeElement; el.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeOverlay(el) {
    el.classList.remove("open");
    if (!$(".overlay.open")) document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus && document.contains(lastFocus)) { try { lastFocus.focus({ preventScroll: true }); } catch (e) {} }
  }
  $$(".overlay").forEach(function (ov) {
    ov.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) { if (ov.id === "cs-overlay") closeCase(); else closeOverlay(ov); } });
    ov.addEventListener("keydown", function (e) { trap(ov, e); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if ($("#lightbox").classList.contains("open")) return closeLightbox();
    if ($("#queue").classList.contains("open")) return toggleQueue(false);
    if ($("#rq-overlay").classList.contains("open")) return closeOverlay($("#rq-overlay"));
    if ($("#cs-overlay").classList.contains("open")) return closeCase();
  });

  /* ========== Case study rendering ========== */
  var csEl = $("#cs"), csOv = $("#cs-overlay"), tocObs = null, currentCase = null;
  function field(k, v, cls) { return filled(v) ? '<div class="' + (cls || "") + '"><dt>' + k + "</dt><dd>" + esc(v) + "</dd></div>" : ""; }

  /* Stats: percentages from small samples become "X of N"; unverified rows stay hidden. */
  function statsBlock(b, h) {
    if (b.pending) return "";
    var N = b.sample, bad = false;
    var items = b.items.map(function (s) {
      if (s.pct == null) return filled(s.n) && filled(s.l) ? s : null;
      if (!N) { bad = true; return null; }
      if (N < 10) {
        var x = s.pct * N / 100, r = Math.round(x);
        if (Math.abs(x - r) > 0.05) { bad = true; return null; }
        return { n: r + " of " + N, l: s.l };
      }
      return { n: (Math.round(s.pct * 10) / 10) + "%", l: s.l };
    }).filter(Boolean);
    if (bad || !items.length) return "";
    return h + '<div class="b"><div class="stats">' + items.map(function (s) { return '<div class="stat"><div class="n">' + esc(s.n) + '</div><div class="l">' + esc(s.l) + "</div></div>"; }).join("") + "</div>" + (filled(b.note) ? '<p class="stats-note">' + esc(b.note) + "</p>" : "") + "</div>";
  }
  function decisionBlock(b) {
    var o = b.options || [];
    if (!filled(b.h) || !filled(o[0]) || !filled(o[1]) || !filled(b.why)) return "";
    var pk = b.picked === 1 ? 1 : 0;
    return '<div class="b decision"><h3>' + esc(b.h) + '</h3><div class="opts">' + [0, 1].map(function (i) {
      return '<div class="opt' + (i === pk ? " picked" : "") + '"><span class="opt-l">Option ' + (i ? "B" : "A") + (i === pk ? ' <span class="badge">Picked</span>' : "") + "</span><p>" + esc(o[i]) + "</p></div>";
    }).join("") + '</div><p class="why"><b>Why:</b> ' + esc(b.why) + "</p></div>";
  }
  function annotatedBlock(b, h) {
    var pins = (b.pins || []).filter(function (p) { return filled(p.note); });
    if (!pins.length) return "";
    return h + '<figure class="b annot"><div class="annot-img"><img src="' + esc(b.src) + '" alt="' + esc(b.alt) + '" loading="lazy" decoding="async">' + pins.map(function (p, i) {
      return '<button type="button" class="pin" style="left:' + Number(p.x) + "%;top:" + Number(p.y) + '%" data-pin="' + i + '" aria-label="Note ' + (i + 1) + '">' + (i + 1) + "</button>";
    }).join("") + '</div><ol class="annot-notes">' + pins.map(function (p, i) { return '<li data-note="' + i + '">' + esc(p.note) + "</li>"; }).join("") + "</ol></figure>";
  }

  function block(b) {
    var h = filled(b.h) ? "<h3>" + esc(b.h) + "</h3>" : "";
    switch (b.t) {
      case "text": return filled(b.body) ? h + '<div class="prose b">' + b.body + "</div>" : "";
      case "quote": return filled(b.text) ? '<figure class="quote b"><p>"' + esc(b.text) + '"</p>' + (filled(b.by) ? "<cite>" + esc(b.by) + "</cite>" : "") + "</figure>" : "";
      case "stats": return statsBlock(b, h);
      case "decision": return decisionBlock(b);
      case "annotated": return annotatedBlock(b, h);
      case "cards": return h + '<div class="cards b">' + b.items.map(function (c) { return '<div class="ccard"><h4>' + esc(c.h) + "</h4><p>" + esc(c.b) + "</p></div>"; }).join("") + "</div>";
      case "steps": return h + '<ol class="steps b">' + b.items.map(function (s) { return "<li><h4>" + esc(s.h) + "</h4><p>" + esc(s.b) + "</p></li>"; }).join("") + "</ol>";
      case "images": return h + '<div class="imgs b ' + (b.layout === "grid" ? "grid" : "") + '">' + b.items.map(function (i) { return '<figure><img src="' + esc(i.src) + '" alt="' + esc(i.alt) + '" loading="lazy" decoding="async" data-zoom>' + (filled(i.cap) ? "<figcaption>" + esc(i.cap) + "</figcaption>" : "") + "</figure>"; }).join("") + "</div>";
      case "phones": return h + '<div class="phones b">' + b.items.map(function (i) { return '<figure class="phone"><img src="' + esc(i.src) + '" alt="' + esc(i.alt) + '" loading="lazy" decoding="async" data-zoom><figcaption>' + esc(i.cap) + "</figcaption></figure>"; }).join("") + "</div>";
      case "carousel": return h + '<div class="carousel b" data-carousel><div class="phone-frame"><div class="phone-screen" role="region" aria-roledescription="carousel" aria-label="Instagram carousel"><div class="slides">' + b.items.map(function (i) { return '<img src="' + esc(i.src) + '" alt="' + esc(i.alt) + '" loading="lazy">'; }).join("") + '</div></div></div><div class="c-ctrl"><button class="icon-btn" type="button" data-dir="-1" aria-label="Previous slide"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button><div class="dots">' + b.items.map(function (_, k) { return '<button type="button" aria-label="Go to slide ' + (k + 1) + '" data-to="' + k + '" aria-current="' + (k === 0) + '"></button>'; }).join("") + '</div><button class="icon-btn" type="button" data-dir="1" aria-label="Next slide"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button></div></div>';
      case "video": return h + '<div class="b">' + mediaHTML(b) + (filled(b.summary) ? '<p class="media-sum"><b>In short:</b> ' + esc(b.summary) + "</p>" : "") + "</div>";
      case "embed":
        var src = "https://www.figma.com/embed?embed_host=share&url=" + encodeURIComponent(b.url);
        return h + '<div class="b"><div class="figma"><iframe src="' + esc(src) + '" title="' + esc(b.title) + '" loading="lazy" allowfullscreen></iframe></div><a class="open-link" href="' + esc(b.url) + '" target="_blank" rel="noopener">Open ' + esc(b.title) + " in a new tab " + ICON.arrow + "</a></div>";
      case "list": return h + '<ol class="learn b">' + b.items.filter(filled).map(function (i) { return "<li><span>" + esc(i) + "</span></li>"; }).join("") + "</ol>";
      case "threw": return h + '<div class="b"><span class="threw-label">What I threw away</span><div class="threw">' + b.items.map(function (i) { return "<div><h4>" + esc(i.h) + "</h4><p>" + esc(i.b) + "</p></div>"; }).join("") + "</div></div>";
      case "table": return h + '<div class="b" style="overflow-x:auto"><table class="tbl"><thead><tr>' + b.head.map(function (c) { return '<th scope="col">' + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>" + b.rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
      case "note": return '<div class="note b"><h4>' + ICON.alert + esc(b.h) + "</h4>" + b.body + "</div>";
      case "links": return '<div class="links-row b">' + b.items.map(function (l) { return '<a class="pill pill-line" href="' + esc(l.u) + '" target="_blank" rel="noopener">' + esc(l.l) + " " + ICON.arrow + "</a>"; }).join("") + "</div>";
      case "videogrid": return h + '<div class="vgrid b">' + b.items.map(function (v, k) {
        var prev = v.src
          ? '<video src="' + esc(v.src) + "#t=" + (v.t || 1) + '" muted loop playsinline preload="metadata" aria-hidden="true"></video>'
          : '<img class="vthumb" data-vimeo-thumb="' + esc(v.vimeo) + '" alt="" loading="lazy">';
        return '<button type="button" class="vtile" data-video="' + k + '" aria-label="Play ' + esc(v.title) + '"><span class="vprev">' + prev + '<span class="vplay">' + ICON.play + '</span></span><span class="vm"><span class="vt">' + esc(v.title) + '</span><span class="vl">' + esc(v.label) + "</span>" + (v.concept ? '<span class="concept">Personal concept, not commissioned</span>' : "") + "</span></button>";
      }).join("") + "</div>";
    }
    return "";
  }
  function mediaHTML(b) {
    if (b.kind === "mp4") return '<div class="media"><video controls preload="none" playsinline src="' + esc(b.src) + '" title="' + esc(b.title) + '"></video></div>';
    return '<div class="media" data-embed="' + esc(b.kind) + '" data-id="' + esc(b.id) + '"><button type="button" class="poster" aria-label="Play video: ' + esc(b.title) + '"><span class="play-big">' + ICON.play + "</span><span>" + esc(b.title) + "</span></button></div>";
  }
  function embedSrc(kind, id) {
    return kind === "youtube" ? "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0" : "https://player.vimeo.com/video/" + id + "?autoplay=1&dnt=1&title=0&byline=0&portrait=0";
  }

  /* Render sections, dropping any whose blocks are all empty. */
  function renderSections(p) {
    var designer = document.body.classList.contains("mode-designer");
    return p.sections.map(function (s) {
      var inner = s.blocks.map(block).join("");
      if (!inner.replace(/\s/g, "")) return null;
      return { s: s, inner: inner };
    }).filter(Boolean).map(function (x, i, arr) {
      var s = x.s, head = '<span class="eyebrow">' + String(i + 1).padStart(2, "0") + " · " + esc(s.label) + "</span>" + (filled(s.h) ? "<h2>" + esc(s.h) + "</h2>" : "");
      var body = s.process ? '<details class="proc"' + (designer ? " open" : "") + "><summary>Show process details</summary>" + x.inner + "</details>" : x.inner;
      return { id: s.id, label: s.label, html: '<section class="cs-sec" id="s-' + esc(s.id) + '">' + head + body + "</section>" };
    });
  }

  function openCase(slug, from, secId) {
    var p = bySlug[slug]; if (!p) return;
    currentCase = p;
    csEl.style.setProperty("--accent", p.accent);
    var t = p.tldr, secs = renderSections(p);
    var html = '<div class="cs-bar"><button class="icon-btn" type="button" data-close aria-label="Close case study">' + ICON.close + '</button><span class="ttl">' + esc(p.title) + '</span><a class="pill pill-line" href="' + mailto + '">Contact</a></div>';
    var meta = '<img src="' + esc(S.avatarStill) + '" alt=""><b>' + esc(S.name) + "</b>" + (yr(p) ? "<span>· " + esc(yr(p)) + "</span>" : "") + "<span>· " + secs.length + (secs.length === 1 ? " section" : " sections") + "</span>" + (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "");
    html += '<header class="cs-head" style="background:linear-gradient(180deg,color-mix(in srgb,' + esc(p.accent) + ' 28%,var(--bg)) 0%,var(--bg) 100%)"><div class="cs-cover">' + cover(p, p.coverAlt || "Cover image for " + p.title) + '</div><div><span class="eyebrow">' + shelfName(p) + '</span><h1 id="cs-title">' + esc(p.title) + '</h1><p class="sub">' + esc(p.subtitle) + '</p><div class="cs-meta">' + meta + "</div>" + (filled(p.disclaimer) ? '<p class="disclaimer">' + esc(p.disclaimer) + "</p>" : "") + "</div></header>";
    if (t) {
      var f = field("Problem", t.problem) + field("My role", t.role) + field("Team", t.team) + field("Timeline", t.timeline) + field("Tools", t.tools) + field("Outcome", t.outcome, "outcome");
      if (f) html += '<dl class="tldr" aria-label="Project summary">' + f + "</dl>";
    }
    html += '<div class="cs-body"><nav class="toc" aria-label="Sections"><h4>Tracklist</h4><ol>' + secs.map(function (s) { return '<li><a href="#s-' + esc(s.id) + '" data-sec="' + esc(s.id) + '">' + esc(s.label) + "</a></li>"; }).join("") + "</ol></nav><div>";
    html += secs.map(function (s) { return s.html; }).join("");
    var idx = P.indexOf(p), next = P[(idx + 1) % P.length];
    html += '<div class="note upnext" style="--accent:' + esc(next.accent) + '"><span class="eyebrow">Up next</span><h4>' + esc(next.title) + '</h4><p>' + esc(next.cardLine || next.subtitle) + '</p><button type="button" class="pill pill-solid" data-open="' + esc(next.slug) + '">Play next</button></div>';
    html += "</div></div>";
    csEl.innerHTML = html;
    csEl.scrollTop = 0;
    if (!csOv.classList.contains("open")) openOverlay(csOv, from);
    var target = "#/work/" + p.slug;
    if (location.hash !== target) history.pushState({ cs: p.slug }, "", target);
    document.title = p.title + " · Pearl Dawar";
    wireCase();
    if (secId) setTimeout(function () { goSection(secId, false); }, 60);
    else setTimeout(function () { var c = $(".cs-bar .icon-btn", csEl); if (c) c.focus({ preventScroll: true }); }, 50);
  }
  function goSection(id, animate) {
    var s = $("#s-" + id, csEl); if (!s) return;
    var d = $("details.proc", s); if (d) d.open = true;
    s.scrollIntoView({ behavior: animate === false ? "auto" : smooth, block: "start" });
    var h = $("h2", s) || s; h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true });
  }
  function closeCase(fromPop) {
    if (!csOv.classList.contains("open")) return;
    $$("video", csEl).forEach(function (v) { v.pause(); });
    closeOverlay(csOv);
    csEl.innerHTML = ""; currentCase = null;
    document.title = "Pearl Dawar · Interaction designer";
    if (!fromPop && location.hash.indexOf("#/work/") === 0) history.pushState({}, "", location.pathname + location.search + "#work");
  }
  window.addEventListener("popstate", function () {
    var m = location.hash.match(/^#\/work\/(.+)$/);
    if (m && bySlug[m[1]]) openCase(m[1]); else closeCase(true);
  });

  function wireCase() {
    $$(".toc a", csEl).forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); goSection(a.dataset.sec); }); });
    if (tocObs) tocObs.disconnect();
    if ("IntersectionObserver" in window) {
      tocObs = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) $$(".toc a", csEl).forEach(function (a) { a.classList.toggle("on", "s-" + a.dataset.sec === e.target.id); }); }); }, { root: csEl, rootMargin: "-20% 0px -70% 0px" });
      $$(".cs-sec", csEl).forEach(function (s) { tocObs.observe(s); });
    }
    $$("[data-embed]", csEl).forEach(function (m) { $(".poster", m).addEventListener("click", function () { m.innerHTML = '<iframe src="' + embedSrc(m.dataset.embed, m.dataset.id) + '" title="Video" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>'; }); });
    $$("[data-carousel]", csEl).forEach(function (c) {
      var slides = $(".slides", c), dots = $$(".dots button", c), i = 0, n = dots.length;
      function go(k) { i = (k + n) % n; slides.style.transform = "translateX(" + (-100 * i) + "%)"; dots.forEach(function (d, j) { d.setAttribute("aria-current", String(j === i)); }); }
      c.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; if (b.dataset.dir) go(i + Number(b.dataset.dir)); if (b.dataset.to) go(Number(b.dataset.to)); });
      var x0 = null; slides.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      slides.addEventListener("touchend", function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)); x0 = null; });
    });
    $$(".annot", csEl).forEach(function (a) {
      a.addEventListener("mouseover", function (e) { var p = e.target.closest("[data-pin],[data-note]"); hl(a, p ? (p.dataset.pin || p.dataset.note) : null); });
      a.addEventListener("focusin", function (e) { var p = e.target.closest("[data-pin]"); hl(a, p ? p.dataset.pin : null); });
      a.addEventListener("mouseleave", function () { hl(a, null); });
    });
    function hl(a, i) { $$("[data-pin],[data-note]", a).forEach(function (el) { el.classList.toggle("on", i != null && (el.dataset.pin === i || el.dataset.note === i)); }); }
    // Vimeo thumbnails (frame from the video) for tiles without a direct file.
    $$("[data-vimeo-thumb]", csEl).forEach(function (img) {
      var id = img.dataset.vimeoThumb;
      fetch("https://vimeo.com/api/oembed.json?url=" + encodeURIComponent("https://vimeo.com/" + id) + "&width=640")
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) { if (j && j.thumbnail_url) img.src = j.thumbnail_url; else img.remove(); })
        .catch(function () { img.remove(); });
    });
    $$(".vgrid", csEl).forEach(function (g) {
      var vids = $$("video", g);
      if (!reduceMotion && "IntersectionObserver" in window) {
        var vo = new IntersectionObserver(function (es) { es.forEach(function (e) { var v = e.target; if (e.isIntersecting) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause(); }); }, { root: csEl, threshold: .5 });
        vids.forEach(function (v) { vo.observe(v); });
      }
      g.addEventListener("click", function (e) {
        var t = e.target.closest("[data-video]"); if (!t || !currentCase) return;
        var items = []; currentCase.sections.forEach(function (s) { s.blocks.forEach(function (b) { if (b.t === "videogrid") items = b.items; }); });
        var v = items[Number(t.dataset.video)]; if (!v) return;
        openLightbox('<div class="vbox">' + (v.src ? '<video src="' + esc(v.src) + '" controls autoplay playsinline></video>' : '<iframe src="' + embedSrc("vimeo", v.vimeo) + '" title="' + esc(v.title) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>') + '<p class="vbox-t">' + esc(v.title) + "</p></div>", t);
      });
    });
  }

  /* ========== Lightbox ========== */
  var lb = $("#lightbox"), lbFrom = null;
  function openLightbox(html, from) { lbFrom = from || document.activeElement; $("#lb-body").innerHTML = html; lb.classList.add("open"); $("#lb-close").focus(); }
  function closeLightbox() { $$("video", lb).forEach(function (v) { v.pause(); }); $("#lb-body").innerHTML = ""; lb.classList.remove("open"); if (lbFrom) lbFrom.focus({ preventScroll: true }); }
  $("#lb-close").addEventListener("click", closeLightbox);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  lb.addEventListener("keydown", function (e) { trap(lb, e); });
  csEl.addEventListener("click", function (e) { var img = e.target.closest("img[data-zoom]"); if (img) openLightbox('<img src="' + esc(img.getAttribute("src")) + '" alt="' + esc(img.alt) + '">', img); });

  /* ========== Recruiter quick view (CV first) ========== */
  var rqOv = $("#rq-overlay");
  $("#rq").innerHTML = '<div class="rq-top"><img src="' + esc(S.avatarStill) + '" alt=""><div><h2 id="rq-title">' + esc(S.name) + '</h2><div class="rq-sub">' + esc(S.role) + " · " + esc(S.location) + '</div></div><button class="icon-btn" type="button" data-close aria-label="Close" style="margin-left:auto">' + ICON.close + "</button></div>" +
    '<div class="rq-actions">' + (resume ? '<a class="pill pill-green" href="' + esc(resume) + '" target="_blank" rel="noopener">Download CV</a>' : "") + '<a class="pill pill-line" href="' + mailto + '">Email ' + esc(S.email) + '</a><a class="pill pill-line" href="' + esc(S.links.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a></div>' +
    "<p>" + esc(S.position) + '</p><p class="avail" style="margin:0"><span class="avail-dot" aria-hidden="true"></span>' + esc(S.availability) + "</p><h3>Best 3 projects</h3>" +
    S.recruiterPicks.map(function (s) { var p = bySlug[s]; return p ? '<button type="button" class="pick" data-rq-open="' + esc(s) + '"><span class="th" style="' + thumbStyle(p) + '" aria-hidden="true"></span><span><b>' + esc(p.title) + (p.badge ? ' <span class="badge" style="margin-left:6px">' + esc(p.badge) + "</span>" : "") + "</b><span>" + esc(p.tldr ? p.tldr.role : p.cardLine) + "</span></span></button>" : ""; }).join("") +
    '<h3>Experience</h3><ul class="exp">' + S.experience.map(function (x) { return '<li><span class="r">' + esc(x.role) + '</span><span class="w">' + esc(x.when) + '</span><span class="o">' + esc(x.org) + "</span></li>"; }).join("") + "</ul>";
  function openRQ(from) { $("#rq-open").classList.remove("attention"); openOverlay(rqOv, from || $("#rq-open")); setTimeout(function () { var c = $("#rq .pill"); if (c) c.focus(); }, 30); }
  $("#rq-open").addEventListener("click", function () { openRQ(this); });
  $("#rq").addEventListener("click", function (e) { var b = e.target.closest("[data-rq-open]"); if (b) { rqOv.classList.remove("open"); openCase(b.dataset.rqOpen, $("#rq-open")); } });

  /* ========== Music: Spotify embed with a quiet fallback ========== */
  var trackIdx = 0, controller = null, apiState = "idle", wantPlay = false, embedReady = false, failTimer = null;
  var slot = $("#embed-slot"), player = $("#player");
  function tid(url) { var m = String(url).match(/track[\/:]([A-Za-z0-9]{22})/); return m ? m[1] : null; }
  function trackURL() { return S.tracks[trackIdx].url; }
  function showTrack() { var t = S.tracks[trackIdx]; $("#np-title").textContent = t.title; $("#np-artist").textContent = t.artist; $$("#queue-list button").forEach(function (b, i) { b.setAttribute("aria-current", String(i === trackIdx)); }); }
  $("#queue-list").innerHTML = S.tracks.map(function (t, i) { return '<button type="button" data-t="' + i + '"><div class="qt">' + esc(t.title) + '</div><div class="qa">' + esc(t.artist) + "</div></button>"; }).join("");
  showTrack();
  function setPlaying(p) {
    $("#hero-eq").classList.toggle("paused", !p);
    [["#hero-play", true], ["#np-play", false]].forEach(function (x) { var b = $(x[0]); b.innerHTML = p ? ICON.pause : ICON.play; b.setAttribute("aria-label", p ? "Pause music" : "Play music"); });
  }
  setPlaying(false);
  function revealEmbed() {
    embedReady = true; clearTimeout(failTimer);
    player.classList.add("has-embed"); slot.setAttribute("aria-hidden", "false");
  }
  function markFailed() { if (embedReady) return; apiState = apiState === "ready" ? "ready" : "failed"; player.classList.remove("has-embed"); player.classList.add("no-embed"); }
  function loadSpotify() {
    if (apiState !== "idle") return; apiState = "loading";
    failTimer = setTimeout(markFailed, 3000);
    window.onSpotifyIframeApiReady = function (API) {
      API.createController($("#spotify-embed"), { uri: "spotify:track:" + tid(trackURL()), width: "100%", height: 80 }, function (c) {
        controller = c;
        c.addListener("ready", function () { apiState = "ready"; revealEmbed(); if (wantPlay) { wantPlay = false; c.play(); } });
        c.addListener("playback_update", function (e) { if (e && e.data) setPlaying(!e.data.isPaused); });
      });
    };
    var s = document.createElement("script"); s.src = "https://open.spotify.com/embed/iframe-api/v1"; s.async = true;
    s.onerror = function () { clearTimeout(failTimer); markFailed(); };
    document.head.appendChild(s);
  }
  function openOnSpotify() { window.open(trackURL(), "_blank", "noopener"); }
  function setPanel(open) { document.body.classList.toggle("player-open", !!open); $("#np-meta").setAttribute("aria-label", open ? "Hide player" : "Show player"); }
  function playToggle() {
    if (mobileMQ.matches && embedReady) setPanel(true);
    if (controller && embedReady) { controller.togglePlay(); return; }
    if (apiState === "failed") { openOnSpotify(); return; }
    wantPlay = true; loadSpotify();
  }
  $("#hero-play").addEventListener("click", playToggle);
  $("#np-play").addEventListener("click", playToggle);
  $("#np-meta").addEventListener("click", function () { if (embedReady) setPanel(!document.body.classList.contains("player-open")); else playToggle(); });
  function toggleQueue(open) { var q = $("#queue"); var o = open === undefined ? !q.classList.contains("open") : open; q.classList.toggle("open", o); $("#queue-btn").setAttribute("aria-expanded", String(o)); }
  $("#queue-btn").addEventListener("click", function () { toggleQueue(); });
  $("#queue-list").addEventListener("click", function (e) {
    var b = e.target.closest("[data-t]"); if (!b) return;
    trackIdx = Number(b.dataset.t); showTrack(); toggleQueue(false);
    var id = tid(trackURL());
    if (controller && embedReady) { controller.loadUri("spotify:track:" + id); setTimeout(function () { controller.play(); }, 600); }
    else if (apiState === "failed") openOnSpotify();
    else { wantPlay = true; loadSpotify(); }
  });
  document.addEventListener("click", function (e) { if (!e.target.closest(".player-right")) toggleQueue(false); });
  var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 1500); };

  /* ========== Mixtape (behind MIXTAPE_ENABLED) ========== */
  if (MIX_ON) {
    $("#mixtape").hidden = false; $("#nav-mixtape").hidden = false;
    var sb = null, MIX = "mixtape";
    var fmtDate = function (s) { try { return new Date(s).toLocaleDateString("en-GB", { day: "numeric", month: "short" }); } catch (e) { return ""; } };
    var renderMix = function (list) {
      if (!list.length) { $("#mix-list-wrap").innerHTML = '<div class="mix-empty">No songs yet. Be the first track on the tape.</div>'; return; }
      $("#mix-list-wrap").innerHTML = '<ol class="mix-list">' + list.map(function (r, i) { return '<li><span class="i">' + (i + 1) + '</span><span><span class="s">' + esc(r.song) + '</span><br><span class="a">' + esc(r.artist) + "</span>" + (r.note ? '<div class="nt">"' + esc(r.note) + '"</div>' : "") + '</span><span class="by">' + esc(r.name || "Anonymous") + "<br>" + fmtDate(r.created_at) + "</span></li>"; }).join("") + "</ol>";
    };
    var mixOff = function () { $("#mixtape").hidden = true; $("#nav-mixtape").hidden = true; };
    var loadMix = function () {
      sb.from(MIX).select("song,artist,note,name,created_at").order("created_at", { ascending: false }).limit(60).then(function (r) { if (r.error) return mixOff(); renderMix(r.data || []); });
    };
    if (!S.supabase.url || !S.supabase.anonKey) mixOff();
    else {
      var sc = document.createElement("script"); sc.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js";
      sc.onload = function () { try { sb = window.supabase.createClient(S.supabase.url, S.supabase.anonKey); loadMix(); } catch (e) { mixOff(); } };
      sc.onerror = mixOff; document.head.appendChild(sc);
    }
    $("#mix-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = $("#m-msg"); msg.className = "form-msg";
      if (!sb || $("#m-hp").value) return;
      var song = $("#m-song").value.trim(), artist = $("#m-artist").value.trim();
      if (!song || !artist) { msg.className = "form-msg err"; msg.textContent = "Add both a song and an artist."; (song ? $("#m-artist") : $("#m-song")).focus(); return; }
      var log = []; try { log = JSON.parse(store.get("pd-mix") || "[]"); } catch (er) {}
      var now = Date.now(); log = log.filter(function (t) { return now - t < 600000; });
      if (log.length >= 3) { msg.className = "form-msg err"; msg.textContent = "That's three songs in ten minutes. Give it a little while."; return; }
      var row = { song: song.slice(0, 80), artist: artist.slice(0, 60), note: $("#m-note").value.trim().slice(0, 140) || null, name: $("#m-name").value.trim().slice(0, 30) || null };
      $("#m-submit").disabled = true; msg.textContent = "Adding…";
      sb.from(MIX).insert(row).then(function (r) {
        $("#m-submit").disabled = false;
        if (r.error) { msg.className = "form-msg err"; msg.textContent = "Couldn't add that one. Try again in a moment."; return; }
        log.push(now); store.set("pd-mix", JSON.stringify(log));
        msg.className = "form-msg ok"; msg.textContent = "Added. You're on the tape.";
        $("#mix-form").reset(); loadMix();
      });
    });
  }

  /* ========== Intro and visitor modes ========== */
  var sp = $("#splash"), who = null;
  function applyMode(w, fresh) {
    document.body.classList.remove("mode-recruiter", "mode-designer", "mode-collaborator", "mode-browsing");
    if (w) document.body.classList.add("mode-" + w);
    var chip = $("#playing-for");
    chip.innerHTML = 'Playing for: <b>' + esc(WHO[w] || "Everyone") + '</b> <span class="chg">· change</span>';
    chip.setAttribute("aria-label", "Playing for " + (WHO[w] || "everyone") + ". Change");
    chip.hidden = false;
    // Collaborators see contact and services first.
    if (w === "collaborator") $("#top-slot").appendChild(wwm);
    else if (wwm.parentNode.id === "top-slot") wwmHome.parentNode.insertBefore(wwm, wwmHome);
    if (!fresh) return;
    if (w === "recruiter") setTimeout(function () { openRQ(); }, reduceMotion ? 0 : 120);
    else if (w === "designer") setTimeout(function () { $("#popular").scrollIntoView({ behavior: smooth, block: "start" }); }, reduceMotion ? 0 : 120);
    else if (w === "collaborator") setTimeout(function () { wwm.scrollIntoView({ behavior: smooth, block: "start" }); }, reduceMotion ? 0 : 120);
  }
  function showSplash() {
    $$("#who button").forEach(function (x) { var on = x.dataset.who === store.get("pd-who"); x.setAttribute("aria-checked", String(on)); $(".ck", x).innerHTML = on ? ICON.check : ""; });
    who = store.get("pd-who"); $("#splash-go").disabled = !who;
    sp.hidden = false; sp.style.display = "";
    requestAnimationFrame(function () { sp.classList.add("show"); });
    document.body.style.overflow = "hidden";
    setTimeout(function () { var b = $('#who [aria-checked="true"]') || $("#who button"); if (b) b.focus(); }, reduceMotion ? 0 : 200);
  }
  function hideSplash(after) {
    store.set("pd-intro", "1");
    sp.classList.remove("show");
    var done = function () {
      sp.hidden = true; sp.style.display = "none"; document.body.style.overflow = "";
      var hero = $("#hero");
      if (!reduceMotion) { hero.classList.remove("enter"); void hero.offsetWidth; hero.classList.add("enter"); }
      if (after) after();
      idle(loadSpotify);
    };
    if (reduceMotion) done(); else setTimeout(done, 260);
  }
  $("#who").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    $$("#who button").forEach(function (x) { var on = x === b; x.setAttribute("aria-checked", String(on)); $(".ck", x).innerHTML = on ? ICON.check : ""; });
    who = b.dataset.who; $("#splash-go").disabled = false;
  });
  $("#who").addEventListener("keydown", function (e) {
    if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].indexOf(e.key) < 0) return;
    e.preventDefault(); var bs = $$("#who button"), i = bs.indexOf(document.activeElement);
    var n = bs[(i + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1) + bs.length) % bs.length]; n.focus(); n.click();
  });
  $("#splash-go").addEventListener("click", function () {
    if (!who) return;
    store.set("pd-who", who); var n = $("#visitor-name").value.trim(); if (n) store.set("pd-name", n.slice(0, 30));
    var w = who; hideSplash(function () { applyMode(w, true); if (w !== "recruiter") $("#hero-play").focus({ preventScroll: true }); });
  });
  $("#visitor-name").addEventListener("keydown", function (e) { if (e.key === "Enter" && !$("#splash-go").disabled) $("#splash-go").click(); });
  $("#splash-skip").addEventListener("click", function () { hideSplash(function () { applyMode(store.get("pd-who"), false); }); });
  sp.addEventListener("keydown", function (e) { trap(sp, e); if (e.key === "Escape") $("#splash-skip").click(); });
  $("#replay").addEventListener("click", showSplash);
  $("#playing-for").addEventListener("click", showSplash);

  /* ========== Start ========== */
  var deep = location.hash.match(/^#\/work\/(.+)$/);
  if (deep && bySlug[deep[1]]) { applyMode(store.get("pd-who"), false); history.replaceState({}, "", location.pathname + "#work"); openCase(deep[1]); idle(loadSpotify); }
  else if (!store.get("pd-intro")) showSplash();
  else { applyMode(store.get("pd-who"), false); idle(loadSpotify); }
})();
