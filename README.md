# Pearl Dawar, portfolio

A static site themed like a music streaming app ("On Repeat"). No build step.

## Files
- `content.js`: all text, projects, links, image paths, videos and Spotify tracks. Edit this for content changes.
- `index.html`: page structure.
- `styles.css`: design tokens (light and dark themes) and layout.
- `app.js`: rendering, case study overlay, Spotify player, recruiter view, Mixtape.
- `images/<project>/`: compressed WebP images, one folder per project.
- `supabase.sql`: table and security rules for the Mixtape.

## Common edits
- Text or projects: edit `content.js`. Each project has `sections`, each section has `blocks` (text, quote, stats, cards, steps, images, phones, carousel, video, videogrid, embed, list, threw, table, note, links).
- Hide a project: set `hidden: true`.
- Music: paste Spotify track links into `SITE.tracks`. The first one is the default.
- Resume button: set `SITE.links.resume`.
- Placeholders show up highlighted in yellow on the site: anything in `[square brackets]`.

## Hosting
GitHub repository `pearldes03-bit/portfolio`, deployed on Vercel. Every push to `main` redeploys.

## Mixtape
Set `SITE.supabase.url` and `SITE.supabase.anonKey` (public anon key only, never a service key). Run `supabase.sql` once in the Supabase SQL editor.
