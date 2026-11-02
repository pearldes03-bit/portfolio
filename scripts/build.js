/* Vercel build step: checks content, then copies the static site into dist/. */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "dist");
const CONTENT_FILES = ["content.js", "index.html", "app.js"];
const BANNED = [/\[Placeholder/i, /\[%\]/, /\bTODO\b/];
const errors = [];

// 1. No placeholder text in content files.
for (const f of CONTENT_FILES) {
  const lines = fs.readFileSync(path.join(ROOT, f), "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const re of BANNED) if (re.test(line)) errors.push(`${f}:${i + 1} contains "${line.match(re)[0]}"`);
  });
}

// 2. Every content image has alt text, and every referenced image exists.
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "content.js"), "utf8"), sandbox);
const projects = sandbox.window.PROJECTS || [];
for (const p of projects) {
  if (p.hidden) continue;
  if (p.cover && !fs.existsSync(path.join(ROOT, p.cover))) errors.push(`${p.slug}: cover missing (${p.cover})`);
  for (const s of p.sections || []) for (const b of s.blocks || []) {
    const imgs = ["images", "phones", "carousel"].includes(b.t) ? b.items : b.t === "annotated" ? [b] : [];
    for (const im of imgs) {
      if (!im.alt || !String(im.alt).trim()) errors.push(`${p.slug} / ${s.id}: image without alt text (${im.src})`);
      if (im.src && !fs.existsSync(path.join(ROOT, im.src))) errors.push(`${p.slug} / ${s.id}: image file missing (${im.src})`);
    }
  }
}

if (errors.length) {
  console.error("Build failed:\n  " + errors.join("\n  "));
  process.exit(1);
}

// 3. Copy the site.
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT);
const copy = (rel) => {
  const src = path.join(ROOT, rel);
  if (!fs.existsSync(src)) return false;
  fs.cpSync(src, path.join(OUT, rel), { recursive: true });
  return true;
};
["index.html", "styles.css", "app.js", "content.js", "images"].forEach(copy);
if (!copy("resume.pdf")) console.warn("Note: resume.pdf not found. The Resume links will 404 until it's uploaded.");
console.log("Build OK: site copied to dist/");
