/* App logic. Content lives in content.js. */
(function () {
  "use strict";
  var S = window.SITE, P = (window.PROJECTS || []).filter(function (p) { return !p.hidden; });
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" aria-hidden="true"><path d="M12 9v4M12 17h.01"/><circle cx="12" cy="12" r="10"/></svg>'
  };
  var SHELVES = [
    { key: "ux", title: "UX case studies", sub: "Research, flows, prototypes, testing" },
    { key: "brand", title: "Brand & packaging", sub: "Interaction design for physical things" },
    { key: "motion", title: "Motion & social", sub: "The looser, more playful work" }
  ];
  var FILTERS = ["All", "UX/UI", "Research", "Spatial/XR", "Branding & packaging", "Motion & social"];
  var bySlug = {}; P.forEach(function (p) { bySlug[p.slug] = p; });
  var mailto = "mailto:" + S.email + "?subject=" + encodeURIComponent("Hello from your portfolio");

  function yr(p) { return p.year && p.year.indexOf("[") < 0 ? p.year : ""; }
  function cover(p, cls) {
    if (p.cover) return '<img src="' + esc(p.cover) + '" alt="" loading="lazy" decoding="async" style="background:' + esc(p.coverBg || "#ddd") + '">';
    return '<div class="cover-text" style="background:linear-gradient(135deg,' + esc(p.coverBg || p.accent) + ',' + esc(p.accent) + ')">' + esc(p.coverText || p.title) + "</div>";
  }
  function thumbStyle(p) {
    return p.cover ? 'background-image:url(' + esc(p.cover) + ');background-color:' + esc(p.coverBg || "#ddd") : "background:" + esc(p.accent);
  }

  /* ---------- Theme ---------- */
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    $("#theme-icon").innerHTML = t === "dark" ? ICON.sun : ICON.moon;
    $("#theme").setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
    var m = $('meta[name="theme-color"]'); if (m) m.setAttribute("content", t === "dark" ? "#121212" : "#ffffff");
  }
  setTheme(document.documentElement.getAttribute("data-theme") || "light");
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
  $("#hero-stats").innerHTML = "<span><b>" + P.length + "</b> projects</span><span><b>1st place</b> India HCI 2024</span><span><b>MSc</b> at KTH Stockholm</span>";
  ["#hero-contact", "#contact-top", "#f-email"].forEach(function (s) { $(s).href = mailto; });
  $("#hero-linkedin").href = S.links.linkedin; $("#f-linkedin").href = S.links.linkedin; $("#f-behance").href = S.links.behance;
  if (S.links.resume) { ["#resume-top", "#f-resume"].forEach(function (s) { $(s).href = S.links.resume; $(s).hidden = false; }); }

  var ti = 0, ticker = $("#ticker");
  function tick() { ticker.textContent = "Currently: " + S.currently[ti % S.currently.length]; ti++; }
  tick(); if (!reduceMotion) setInterval(tick, 4500);

  /* ---------- Library (sidebar) ---------- */
  $("#lib-count").textContent = P.length;
  $("#lib-list").innerHTML = P.map(function (p) {
    var type = p.shelf === "ux" ? "Case study" : p.shelf === "brand" ? "Brand & packaging" : "Motion & social";
    return '<li><button class="lib-item" type="button" data-open="' + esc(p.slug) + '"><span class="lib-thumb" style="' + thumbStyle(p) + '">' + (p.cover ? "" : esc((p.coverText || p.title).slice(0, 2))) + '</span><span class="lib-meta"><span class="lib-title">' + esc(p.title) + '</span><span class="lib-sub">' + type + (yr(p) ? " · " + esc(yr(p)) : "") + "</span></span></button></li>";
  }).join("");

  /* ---------- Chips ---------- */
  $("#chips").innerHTML = FILTERS.map(function (f, i) { return '<button type="button" class="chip" aria-pressed="' + (i === 0) + '" data-f="' + esc(f) + '">' + esc(f) + "</button>"; }).join("");
  $("#chips").addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    $$(".chip").forEach(function (c) { c.setAttribute("aria-pressed", String(c === b)); });
    var f = b.dataset.f;
    $$(".card").forEach(function (c) { var p = bySlug[c.dataset.open]; c.hidden = f !== "All" && p.tags.indexOf(f) < 0; });
    $$(".shelf-sec").forEach(function (s) { s.hidden = !$$(".card:not([hidden])", s).length; });
    if (f !== "All") document.getElementById("work").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });

  /* ---------- Popular ---------- */
  $("#popular-list").innerHTML = S.recruiterPicks.map(function (s, i) {
    var p = bySlug[s]; if (!p) return "";
    return '<li><button type="button" class="track" data-open="' + esc(p.slug) + '"><span class="num">' + (i + 1) + '</span><span class="thumb" style="' + thumbStyle(p) + '"></span><span><span class="t1">' + esc(p.title) + '</span><br><span class="t2">' + esc(p.cardLine) + "</span></span>" + (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "<span></span>") + "</button></li>";
  }).join("");

  /* ---------- Shelves ---------- */
  $("#shelves").innerHTML = SHELVES.map(function (sh) {
    var items = P.filter(function (p) { return p.shelf === sh.key; });
    if (!items.length) return "";
    return '<section class="block shelf-sec" aria-labelledby="sh-' + sh.key + '"><div class="sec-head"><h2 id="sh-' + sh.key + '">' + esc(sh.title) + "</h2><p>" + esc(sh.sub) + '</p></div><div class="shelf">' + items.map(function (p) {
      return '<button type="button" class="card" data-open="' + esc(p.slug) + '" aria-label="Open ' + esc(p.title) + ' case study"><div class="cover">' + cover(p) + '<span class="play-mini" aria-hidden="true">' + ICON.play + '</span></div><span class="card-title">' + esc(p.title) + '</span><span class="card-sub">' + esc(p.cardLine || p.subtitle) + '</span><span class="card-tags">' + p.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</span></button>";
    }).join("") + "</div></section>";
  }).join("");

  /* ---------- Wrapped ---------- */
  $("#wrapped-grid").innerHTML = S.wrapped.map(function (w) { return '<div class="wcard w-' + esc(w.tone) + '"><div class="n">' + esc(w.n) + '</div><div class="l">' + esc(w.l) + "</div></div>"; }).join("");

  /* ---------- Liked skills ---------- */
  var n = 0, rows = [];
  S.skills.forEach(function (g) { g.items.forEach(function (it) { n++; var name = typeof it === "string" ? it : it.n, d = typeof it === "string" ? "" : it.d; rows.push("<tr><td>" + n + "</td><td>" + esc(name) + '</td><td class="grp">' + esc(g.group) + '</td><td class="dur">' + esc(d) + "</td></tr>"); }); });
  $("#songs").innerHTML = rows.join("");
  $("#liked-count").textContent = "Pearl Dawar · " + n + " skills";

  /* ---------- About ---------- */
  $("#about-text").innerHTML = '<p class="strong">' + esc(S.bio) + "</p><p>" + esc(S.howIWork) + "</p><p>" + esc(S.thread) + "</p>";
  $("#exp").innerHTML = S.experience.map(function (x) { return '<li><span class="r">' + esc(x.role) + '</span><span class="w">' + esc(x.when) + '</span><span class="o">' + esc(x.org) + "</span></li>"; }).join("");

  /* ---------- Lyrics ---------- */
  $("#lyrics").innerHTML = S.philosophy.map(function (l) { return '<p class="lyric">' + esc(l) + "</p>"; }).join("");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var lo = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle("lit", e.isIntersecting); }); }, { rootMargin: "-30% 0px -35% 0px" });
    $$(".lyric").forEach(function (l) { lo.observe(l); });
  } else { $$(".lyric").forEach(function (l) { l.classList.add("lit"); }); }

  /* ---------- Topbar shadow ---------- */
  var topbar = $("#topbar");
  window.addEventListener("scroll", function () { topbar.classList.toggle("scrolled", window.scrollY > 10); }, { passive: true });

  /* ---------- Open handlers ---------- */
  document.addEventListener("click", function (e) {
    var o = e.target.closest("[data-open]");
    if (o) { e.preventDefault(); openCase(o.dataset.open, o); }
  });

  /* ========== Overlays (focus handling) ========== */
  var lastFocus = null;
  function trap(container, e) {
    if (e.key !== "Tab") return;
    var f = $$('a[href],button:not([disabled]),iframe,input,textarea,[tabindex]:not([tabindex="-1"])', container).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function openOverlay(el, from) {
    lastFocus = from || document.activeElement;
    el.classList.add("open"); document.body.style.overflow = "hidden";
  }
  function closeOverlay(el) {
    el.classList.remove("open");
    if (!$(".overlay.open")) document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus({ preventScroll: true }); } catch (e) {} }
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

  /* ========== Case study ========== */
  var csEl = $("#cs"), csOv = $("#cs-overlay"), tocObs = null;
  function field(k, v, cls) { return v ? '<div class="' + (cls || "") + '"><dt>' + k + "</dt><dd>" + v + "</dd></div>" : ""; }
  function phText(s) { return esc(s).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>'); }

  function block(b, p) {
    var h = b.h ? "<h3>" + esc(b.h) + "</h3>" : "";
    switch (b.t) {
      case "text": return h + '<div class="prose b">' + b.body + "</div>";
      case "quote": return '<figure class="quote b"><p>"' + esc(b.text) + '"</p>' + (b.by ? "<cite>" + esc(b.by) + "</cite>" : "") + "</figure>";
      case "stats": return h + '<div class="b"><div class="stats">' + b.items.map(function (s) { return '<div class="stat"><div class="n">' + phText(s.n) + '</div><div class="l">' + phText(s.l) + "</div></div>"; }).join("") + "</div>" + (b.note ? '<p class="stats-note">' + esc(b.note) + "</p>" : "") + "</div>";
      case "cards": return h + '<div class="cards b">' + b.items.map(function (c) { return '<div class="ccard"><h4>' + esc(c.h) + "</h4><p>" + esc(c.b) + "</p></div>"; }).join("") + "</div>";
      case "steps": return h + '<ol class="steps b">' + b.items.map(function (s) { return "<li><h4>" + esc(s.h) + "</h4><p>" + esc(s.b) + "</p></li>"; }).join("") + "</ol>";
      case "images": return h + '<div class="imgs b ' + (b.layout === "grid" ? "grid" : "") + '">' + b.items.map(function (i) { return '<figure><img src="' + esc(i.src) + '" alt="' + esc(i.alt) + '" loading="lazy" decoding="async" data-zoom>' + (i.cap ? "<figcaption>" + esc(i.cap) + "</figcaption>" : "") + "</figure>"; }).join("") + "</div>";
      case "phones": return h + '<div class="phones b">' + b.items.map(function (i) { return '<figure class="phone"><img src="' + esc(i.src) + '" alt="' + esc(i.alt) + '" loading="lazy" decoding="async" data-zoom><figcaption>' + esc(i.cap) + "</figcaption></figure>"; }).join("") + "</div>";
      case "carousel": return h + '<div class="carousel b" data-carousel><div class="phone-frame"><div class="phone-screen" role="region" aria-roledescription="carousel" aria-label="Instagram carousel"><div class="slides">' + b.items.map(function (i, k) { return '<img src="' + esc(i.src) + '" alt="' + esc(i.alt) + '" loading="lazy" aria-label="Slide ' + (k + 1) + " of " + b.items.length + '">'; }).join("") + '</div></div></div><div class="c-ctrl"><button class="icon-btn" type="button" data-dir="-1" aria-label="Previous slide"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 6l-6 6 6 6"/></svg></button><div class="dots">' + b.items.map(function (_, k) { return '<button type="button" aria-label="Go to slide ' + (k + 1) + '" data-to="' + k + '" aria-current="' + (k === 0) + '"></button>'; }).join("") + '</div><button class="icon-btn" type="button" data-dir="1" aria-label="Next slide"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6l6 6-6 6"/></svg></button></div></div>';
      case "video": return h + '<div class="b">' + mediaHTML(b) + (b.summary ? '<p class="media-sum"><b>In short:</b> ' + esc(b.summary) + "</p>" : "") + "</div>";
      case "embed":
        var src = "https://www.figma.com/embed?embed_host=share&url=" + encodeURIComponent(b.url);
        return h + '<div class="b"><div class="figma"><iframe src="' + esc(src) + '" title="' + esc(b.title) + '" loading="lazy" allowfullscreen></iframe></div><a class="open-link" href="' + esc(b.url) + '" target="_blank" rel="noopener">Open ' + esc(b.title) + " in a new tab " + ICON.arrow + "</a></div>";
      case "list": return h + '<ol class="learn b">' + b.items.map(function (i) { return "<li><span>" + esc(i) + "</span></li>"; }).join("") + "</ol>";
      case "threw": return h + '<div class="b"><span class="threw-label">What I threw away</span><div class="threw">' + b.items.map(function (i) { return "<div><h4>" + esc(i.h) + "</h4><p>" + esc(i.b) + "</p></div>"; }).join("") + "</div></div>";
      case "table": return h + '<div class="b" style="overflow-x:auto"><table class="tbl"><thead><tr>' + b.head.map(function (c) { return '<th scope="col">' + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>" + b.rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
      case "note": return '<div class="note b"><h4>' + ICON.trash + esc(b.h) + "</h4>" + b.body + "</div>";
      case "links": return '<div class="links-row b">' + b.items.map(function (l) { return '<a class="pill pill-line" href="' + esc(l.u) + '" target="_blank" rel="noopener">' + esc(l.l) + " " + ICON.arrow + "</a>"; }).join("") + "</div>";
      case "videogrid": return h + '<div class="vgrid b">' + b.items.map(function (v, k) {
        var prev = v.src ? '<video src="' + esc(v.src) + '#t=0.5" muted loop playsinline preload="metadata" aria-hidden="true"></video>' : '<div class="cover-text" style="background:linear-gradient(135deg,#0f766e,#111);font-size:22px">' + esc(v.title) + "</div>";
        return '<button type="button" class="vtile" data-video="' + k + '" aria-label="Play ' + esc(v.title) + '"><span class="vprev">' + prev + '<span class="vplay">' + ICON.play + '</span></span><span class="vm"><span class="vt">' + esc(v.title) + '</span><br><span class="vl">' + esc(v.label) + "</span>" + (v.concept ? '<br><span class="concept">Personal concept, not commissioned</span>' : "") + "</span></button>";
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

  function openCase(slug, from) {
    var p = bySlug[slug]; if (!p) return;
    var ink = p.accent;
    csEl.style.setProperty("--accent", p.accent);
    var t = p.tldr;
    var html = '<div class="cs-bar"><button class="icon-btn" type="button" data-close aria-label="Close case study">' + ICON.close + '</button><span class="ttl">' + esc(p.title) + '</span><a class="pill pill-line" href="' + mailto + '">Contact</a></div>';
    html += '<header class="cs-head" style="background:linear-gradient(180deg,color-mix(in srgb,' + esc(p.accent) + ' 28%,var(--bg)) 0%,var(--bg) 100%)"><div class="cs-cover">' + cover(p) + '</div><div><span class="eyebrow">' + (p.shelf === "ux" ? "Case study" : p.shelf === "brand" ? "Brand & packaging" : "Motion & social") + '</span><h1 id="cs-title">' + esc(p.title) + '</h1><p class="sub">' + esc(p.subtitle) + '</p><div class="cs-meta"><img src="' + esc(S.avatarStill) + '" alt=""><b>' + esc(S.name) + "</b>" + (yr(p) ? "<span>· " + esc(yr(p)) + "</span>" : "") + "<span>· " + p.sections.length + (p.sections.length === 1 ? " section" : " sections") + "</span>" + (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "") + "</div>" + (p.disclaimer ? '<p class="disclaimer">' + esc(p.disclaimer) + "</p>" : "") + "</div></header>";
    if (t) html += '<dl class="tldr" aria-label="Project summary">' + field("Problem", phText(t.problem)) + field("My role", phText(t.role)) + field("Team", phText(t.team)) + field("Timeline", phText(t.timeline)) + field("Tools", phText(t.tools)) + field("Outcome", phText(t.outcome), "outcome") + "</dl>";
    html += '<div class="cs-body"><nav class="toc" aria-label="Sections"><h4>Tracklist</h4><ol>' + p.sections.map(function (s) { return '<li><a href="#s-' + esc(s.id) + '" data-sec="' + esc(s.id) + '">' + esc(s.label) + "</a></li>"; }).join("") + "</ol></nav><div>";
    html += p.sections.map(function (s, i) { return '<section class="cs-sec" id="s-' + esc(s.id) + '"><span class="eyebrow">' + String(i + 1).padStart(2, "0") + " · " + esc(s.label) + "</span><h2>" + esc(s.h) + "</h2>" + s.blocks.map(function (b) { return block(b, p); }).join("") + "</section>"; }).join("");
    var idx = P.indexOf(p), next = P[(idx + 1) % P.length];
    html += '<div class="note" style="--accent:' + esc(next.accent) + '"><span class="eyebrow">Up next</span><h4 style="margin-top:6px;font-size:22px">' + esc(next.title) + '</h4><p style="color:var(--dim)">' + esc(next.cardLine || next.subtitle) + '</p><button type="button" class="pill pill-solid" style="margin-top:14px" data-open="' + esc(next.slug) + '">Play next ' + ICON.play.replace('aria-hidden="true"', 'width="14" height="14" aria-hidden="true"') + "</button></div>";
    html += "</div></div>";
    csEl.innerHTML = html;
    csEl.scrollTop = 0;
    if (!csOv.classList.contains("open")) openOverlay(csOv, from);
    var target = "#/work/" + slug;
    if (location.hash !== target) history.pushState({ cs: slug }, "", target);
    document.title = p.title + " · Pearl Dawar";
    setTimeout(function () { var c = $(".cs-bar .icon-btn", csEl); if (c) c.focus({ preventScroll: true }); }, 50);
    wireCase();
  }
  function closeCase(fromPop) {
    if (!csOv.classList.contains("open")) return;
    closeOverlay(csOv);
    $$("video,iframe", csEl).forEach(function (v) { if (v.pause) v.pause(); });
    csEl.innerHTML = "";
    document.title = "Pearl Dawar · Interaction designer";
    if (!fromPop && location.hash.indexOf("#/work/") === 0) history.pushState({}, "", location.pathname + location.search + "#work");
  }
  window.addEventListener("popstate", function () {
    var m = location.hash.match(/^#\/work\/(.+)$/);
    if (m && bySlug[m[1]]) openCase(m[1]); else closeCase(true);
  });

  function wireCase() {
    // TOC
    $$(".toc a", csEl).forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); var s = $("#s-" + a.dataset.sec, csEl); if (s) s.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); }); });
    if (tocObs) tocObs.disconnect();
    if ("IntersectionObserver" in window) {
      tocObs = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { $$(".toc a", csEl).forEach(function (a) { a.classList.toggle("on", "s-" + a.dataset.sec === e.target.id); }); } }); }, { root: csEl, rootMargin: "-20% 0px -70% 0px" });
      $$(".cs-sec", csEl).forEach(function (s) { tocObs.observe(s); });
    }
    // Embeds (click to load)
    $$("[data-embed]", csEl).forEach(function (m) { $(".poster", m).addEventListener("click", function () { m.innerHTML = '<iframe src="' + embedSrc(m.dataset.embed, m.dataset.id) + '" title="Video" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>'; }); });
    // Carousels
    $$("[data-carousel]", csEl).forEach(function (c) {
      var slides = $(".slides", c), dots = $$(".dots button", c), i = 0, n = dots.length;
      function go(k) { i = (k + n) % n; slides.style.transform = "translateX(" + (-100 * i) + "%)"; dots.forEach(function (d, j) { d.setAttribute("aria-current", String(j === i)); }); }
      c.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; if (b.dataset.dir) go(i + Number(b.dataset.dir)); if (b.dataset.to) go(Number(b.dataset.to)); });
      var x0 = null; slides.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      slides.addEventListener("touchend", function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)); x0 = null; });
    });
    // Video grid previews
    var p = bySlug[(location.hash.match(/^#\/work\/(.+)$/) || [])[1]];
    $$(".vgrid", csEl).forEach(function (g) {
      var vids = $$("video", g);
      if (!reduceMotion && "IntersectionObserver" in window) {
        var vo = new IntersectionObserver(function (es) { es.forEach(function (e) { var v = e.target; if (e.isIntersecting) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause(); }); }, { root: csEl, threshold: .5 });
        vids.forEach(function (v) { vo.observe(v); });
      }
      g.addEventListener("click", function (e) {
        var t = e.target.closest("[data-video]"); if (!t || !p) return;
        var items = []; p.sections.forEach(function (s) { s.blocks.forEach(function (b) { if (b.t === "videogrid") items = b.items; }); });
        var v = items[Number(t.dataset.video)]; if (!v) return;
        openLightbox('<div class="vbox">' + (v.src ? '<video src="' + esc(v.src) + '" controls autoplay playsinline></video>' : '<iframe src="' + embedSrc("vimeo", v.vimeo) + '" title="' + esc(v.title) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>') + '<p style="color:#fff;margin-top:10px;font-weight:600">' + esc(v.title) + "</p></div>", t);
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

  /* ========== Recruiter quick view ========== */
  var rqOv = $("#rq-overlay");
  $("#rq").innerHTML = '<div class="rq-top"><img src="' + esc(S.avatarStill) + '" alt=""><div><h2 id="rq-title">' + esc(S.name) + '</h2><div style="color:var(--dim)">' + esc(S.role) + " · " + esc(S.location) + '</div></div><button class="icon-btn" type="button" data-close aria-label="Close" style="margin-left:auto">' + ICON.close + "</button></div><p>" + esc(S.position) + "</p><p style=\"color:var(--dim)\">" + esc(S.thread) + "</p><h3>Best 3 projects</h3>" +
    S.recruiterPicks.map(function (s) { var p = bySlug[s]; return p ? '<button type="button" class="pick" data-rq-open="' + esc(s) + '"><span class="th" style="' + thumbStyle(p) + '"></span><span><b>' + esc(p.title) + (p.badge ? ' <span class="badge" style="margin-left:6px">' + esc(p.badge) + "</span>" : "") + "</b><span>" + esc(p.tldr ? p.tldr.role : p.cardLine) + "</span></span></button>" : ""; }).join("") +
    '<h3>Experience</h3><ul class="exp">' + S.experience.map(function (x) { return '<li><span class="r">' + esc(x.role) + '</span><span class="w">' + esc(x.when) + '</span><span class="o">' + esc(x.org) + "</span></li>"; }).join("") + "</ul>" +
    '<div class="rq-actions"><a class="pill pill-green" href="' + mailto + '">Email ' + esc(S.email) + "</a>" + (S.links.resume ? '<a class="pill pill-line" href="' + esc(S.links.resume) + '" target="_blank" rel="noopener">Resume</a>' : "") + '<a class="pill pill-line" href="' + esc(S.links.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a></div>';
  $("#rq-open").addEventListener("click", function (e) { this.classList.remove("attention"); openOverlay(rqOv, this); setTimeout(function () { $("#rq .icon-btn").focus(); }, 30); });
  $("#rq").addEventListener("click", function (e) { var b = e.target.closest("[data-rq-open]"); if (b) { rqOv.classList.remove("open"); openCase(b.dataset.rqOpen, $("#rq-open")); } });

  /* ========== Music (Spotify embed) ========== */
  var trackIdx = 0, controller = null, apiState = "idle", wantPlay = false, isPlaying = false;
  function tid(url) { var m = String(url).match(/track[\/:]([A-Za-z0-9]{22})/); return m ? m[1] : null; }
  function showTrack() { var t = S.tracks[trackIdx]; $("#np-title").textContent = t.title; $("#np-artist").textContent = t.artist; $$("#queue-list button").forEach(function (b, i) { b.setAttribute("aria-current", String(i === trackIdx)); }); }
  $("#queue-list").innerHTML = S.tracks.map(function (t, i) { return '<button type="button" data-t="' + i + '"><div class="qt">' + esc(t.title) + '</div><div class="qa">' + esc(t.artist) + "</div></button>"; }).join("");
  showTrack();
  function setPlaying(p) {
    isPlaying = p; $("#hero-eq").classList.toggle("paused", !p);
    $("#hero-play").innerHTML = p ? ICON.pause : ICON.play; $("#hero-play").setAttribute("aria-label", p ? "Pause music" : "Play music");
  }
  function plainEmbed() {
    var id = tid(S.tracks[trackIdx].url);
    $("#spotify-embed").outerHTML = '<iframe id="spotify-embed" src="https://open.spotify.com/embed/track/' + id + '?utm_source=generator" height="80" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify player"></iframe>';
  }
  function loadSpotify() {
    if (apiState !== "idle") return; apiState = "loading";
    window.onSpotifyIframeApiReady = function (API) {
      API.createController($("#spotify-embed"), { uri: "spotify:track:" + tid(S.tracks[trackIdx].url), width: "100%", height: 80 }, function (c) {
        controller = c; apiState = "ready";
        c.addListener("playback_update", function (e) { if (e && e.data) setPlaying(!e.data.isPaused); });
        c.addListener("ready", function () { if (wantPlay) { wantPlay = false; c.play(); } });
      });
    };
    var s = document.createElement("script"); s.src = "https://open.spotify.com/embed/iframe-api/v1"; s.async = true;
    s.onerror = function () { apiState = "failed"; plainEmbed(); };
    document.head.appendChild(s);
    setTimeout(function () { if (apiState === "loading") { apiState = "failed"; plainEmbed(); } }, 9000);
  }
  function playToggle() {
    if (controller) { controller.togglePlay(); return; }
    wantPlay = true; loadSpotify();
  }
  $("#hero-play").addEventListener("click", playToggle);
  function toggleQueue(open) { var q = $("#queue"); var o = open === undefined ? !q.classList.contains("open") : open; q.classList.toggle("open", o); $("#queue-btn").setAttribute("aria-expanded", String(o)); }
  $("#queue-btn").addEventListener("click", function () { toggleQueue(); });
  $("#queue-list").addEventListener("click", function (e) {
    var b = e.target.closest("[data-t]"); if (!b) return;
    trackIdx = Number(b.dataset.t); showTrack(); toggleQueue(false);
    var id = tid(S.tracks[trackIdx].url);
    if (controller) { controller.loadUri("spotify:track:" + id); setTimeout(function () { controller.play(); }, 600); }
    else if (apiState === "failed") { var f = $("#spotify-embed"); if (f) f.src = "https://open.spotify.com/embed/track/" + id; }
    else { wantPlay = true; loadSpotify(); }
  });
  document.addEventListener("click", function (e) { if (!e.target.closest(".player-right")) toggleQueue(false); });
  var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 1500); };

  /* ========== Mixtape ========== */
  var sb = null, MIX = "mixtape";
  function fmtDate(s) { try { return new Date(s).toLocaleDateString("en-GB", { day: "numeric", month: "short" }); } catch (e) { return ""; } }
  function renderMix(list) {
    if (!list.length) { $("#mix-list-wrap").innerHTML = '<div class="mix-empty">No songs yet. Be the first track on the tape.</div>'; return; }
    $("#mix-list-wrap").innerHTML = '<ol class="mix-list">' + list.map(function (r, i) { return '<li><span class="i">' + (i + 1) + '</span><span><span class="s">' + esc(r.song) + '</span><br><span class="a">' + esc(r.artist) + "</span>" + (r.note ? '<div class="nt">"' + esc(r.note) + '"</div>' : "") + '</span><span class="by">' + esc(r.name || "Anonymous") + "<br>" + fmtDate(r.created_at) + "</span></li>"; }).join("") + "</ol>";
  }
  function mixOff() {
    $("#mix-list-wrap").innerHTML = '<div class="mix-empty"><b style="color:var(--text)">The Mixtape opens soon.</b><br>The shared playlist is being wired up. Come back in a bit and add the first song.</div>';
    $$("#mix-form input,#mix-form textarea,#m-submit").forEach(function (x) { x.disabled = true; });
  }
  function initMix() {
    if (!S.supabase.url || !S.supabase.anonKey) return mixOff();
    var s = document.createElement("script"); s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js";
    s.onload = function () {
      try { sb = window.supabase.createClient(S.supabase.url, S.supabase.anonKey); } catch (e) { return mixOff(); }
      loadMix();
    };
    s.onerror = mixOff; document.head.appendChild(s);
  }
  function loadMix() {
    sb.from(MIX).select("song,artist,note,name,created_at").order("created_at", { ascending: false }).limit(60).then(function (r) {
      if (r.error) { $("#mix-list-wrap").innerHTML = '<div class="mix-empty">Couldn\'t load the Mixtape right now. Try again in a minute.</div>'; return; }
      renderMix(r.data || []);
    });
  }
  $("#mix-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var msg = $("#m-msg"); msg.className = "form-msg";
    if (!sb) return;
    if ($("#m-hp").value) return;
    var song = $("#m-song").value.trim(), artist = $("#m-artist").value.trim();
    if (!song || !artist) { msg.className = "form-msg err"; msg.textContent = "Add both a song and an artist."; (song ? $("#m-artist") : $("#m-song")).focus(); return; }
    var log = []; try { log = JSON.parse(store.get("pd-mix") || "[]"); } catch (er) {}
    var now = Date.now(); log = log.filter(function (t) { return now - t < 10 * 60 * 1000; });
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
  initMix();

  /* ========== Splash ========== */
  var sp = $("#splash"), who = null;
  function showSplash() {
    sp.hidden = false; requestAnimationFrame(function () { sp.classList.remove("hide"); });
    document.body.style.overflow = "hidden";
    setTimeout(function () { var b = $("#who button"); if (b) b.focus(); }, 300);
  }
  function hideSplash() {
    sp.classList.add("hide"); document.body.style.overflow = "";
    setTimeout(function () { sp.hidden = true; }, 500);
    store.set("pd-intro", "1");
    idle(loadSpotify);
  }
  function greet() {
    var name = store.get("pd-name"), w = store.get("pd-who");
    var g = name ? "Hi " + name + "! " : "";
    if (w === "recruiter") { $("#rq-open").classList.add("attention"); g += "The quick view up top has everything on one screen."; }
    else if (w === "collaborator") g += "Scroll to the bottom to get in touch.";
    else if (g) g += "Press play and have a look around.";
    if (g) { var el = document.createElement("p"); el.className = "greet"; el.style.margin = "0 0 10px"; el.textContent = g; $("#hero-lead").insertAdjacentElement("beforebegin", el); }
  }
  $("#who").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    $$("#who button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    who = b.dataset.who; $("#splash-go").disabled = false;
  });
  $("#splash-go").addEventListener("click", function () {
    store.set("pd-who", who); var n = $("#visitor-name").value.trim(); if (n) store.set("pd-name", n.slice(0, 30));
    hideSplash(); greet(); $("#hero-play").focus({ preventScroll: true });
  });
  $("#visitor-name").addEventListener("keydown", function (e) { if (e.key === "Enter" && !$("#splash-go").disabled) $("#splash-go").click(); });
  $("#splash-skip").addEventListener("click", function () { hideSplash(); });
  sp.addEventListener("keydown", function (e) { trap(sp, e); if (e.key === "Escape") hideSplash(); });
  $("#replay").addEventListener("click", showSplash);

  /* ========== Start ========== */
  var deep = location.hash.match(/^#\/work\/(.+)$/);
  if (deep && bySlug[deep[1]]) { history.replaceState({}, "", location.pathname + "#work"); openCase(deep[1]); idle(loadSpotify); }
  else if (!store.get("pd-intro")) showSplash();
  else { greet(); idle(loadSpotify); }
})();
