# Pearl Dawar, portfolio

A static site themed like a music streaming app ("On Repeat"). Plain HTML, CSS and JS.

## Files
- `content.js`: all text, projects, links, image paths, videos and Spotify tracks. Edit this for content changes.
- `index.html`: page structure.
- `styles.css`: design tokens (dark by default, light as a toggle) and layout.
- `app.js`: rendering, case study overlay, Spotify player, recruiter view, visitor modes, Mixtape.
- `images/<project>/`: compressed WebP images, one folder per project.
- `scripts/build.js`: Vercel build step. Fails if placeholder text or missing alt text is found, then copies the site to `dist/`.
- `MISSING-INFO.md`: everything still hidden until it's filled in.
- `supabase.sql`: table and security rules for the Mixtape.

## Content rules (enforced by the site)
- Empty fields are hidden. Never put placeholder text in `content.js`; the build fails on it.
- Stats blocks with a `sample` under 10 show percentages as "X of N". If a percentage doesn't divide into whole people, the row is hidden. `pending: true` keeps a stats block hidden.
- Sections whose blocks are all empty (for example an unfilled `decision`) are hidden, including from the tracklist.
- `process: true` folds a section behind "Show process details". It opens by default for visitors who pick "Fellow designer".

## Visitor modes (from the intro)
- Recruiter: recruiter quick view opens, CV first.
- Fellow designer: scrolls to Start here, process details open.
- Collaborator: Work with me (contact and services) moves to the top.
- A "Playing for" chip under the nav shows the choice and reopens the intro.

## Hosting
GitHub repository `pearldes03-bit/portfolio`, deployed on Vercel (`vercel.json` runs the build). Every push to `main` redeploys.

## Mixtape
Hidden behind `window.MIXTAPE_ENABLED` in `content.js`. See MISSING-INFO.md to turn it on.
