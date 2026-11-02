# Missing info

Everything below is hidden on the live site until you fill it in. Nothing here was invented. Edit `content.js` (or send the details to Claude) and the site shows each item automatically once it's complete.

## Files to upload
- [ ] **Resume PDF.** Upload `resume.pdf` to the root of the repository. The Resume links in the header, hero, footer, Work with me and the recruiter quick view all point to `/resume.pdf` and will 404 until it exists.

## Research numbers to confirm
- [ ] **Mindora sample size.** The case says five participants, but the survey stats are 66.67%, 60% and 46.67%. Out of 5 people those aren't whole numbers. They do match 15 respondents (10, 9 and 7 of 15). What was the real sample size for the survey, and what were the counts? The stat row is hidden until then. Fill in `sample` and the counts in the Mindora research stats block.
- [ ] **Food Setu percentages (85%, 75%, 90%).** The case says 3 interviews. Where do these percentages come from, and how many people answered? Fill in `source` and `sample` in the Food Setu research stats block and set `pending: false`. Hidden until then. (If the sample is under 10, they'll show as "X of N".)
- [ ] **TWU magazine stat.** Your documents say 93% in one place and 83% in another for interest in a personalised travel magazine. Which is right? The stat was removed until confirmed.

## Case study details
- [ ] **Vastu Lens: the other two experience principles.** The poster lists six; four are named (Accuracy, Confidence, Transparency, Remedies-first).
- [ ] **Caven: date** (year and timeline).
- [ ] **Pantone Condiments: date** (year and timeline).
- [ ] **Ad in 3 (in Motion & social):** who it was made for or the audience, your exact role, tools used, and results (reach, saves, shares).
- [ ] **Ansh (in Motion & social):** brief, your role, team, timeline, tools and outcome. For now it shows the ad film and a Behance link.
- [ ] **Productive Procrastination:** hidden until you send material.

## Decision blocks (one per UX case study)
Each needs: a heading, two options you considered, which one you picked, and why.
- [ ] Food Setu (appears after Process)
- [ ] Vastu Lens (appears after Framework)
- [ ] Mindora (appears after Constraints)
- [ ] TWU (appears after Research)

Format in `content.js`:
`{ t: "decision", h: "...", options: ["...", "..."], picked: 0, why: "..." }`

## Annotated key screens (optional)
The component is built: numbered pins over a screenshot with notes beside it. Send notes for any screen you want annotated. Format:
`{ t: "annotated", src: "images/...", alt: "...", pins: [ { x: 30, y: 42, note: "..." } ] }` (x and y are percentages across and down the image.)

## Copy to rewrite
To avoid repeating "less about adding features" and other duplicate lines, I removed sentences instead of writing new ones. These sections may now feel thin:
- [ ] **About the artist:** now shows your bio and "how I work" only. The "what ties my work together" paragraph was removed because it repeated the Lyrics.
- [ ] **Recruiter quick view summary:** lost the same paragraph. It now shows your positioning line and availability.
- [ ] **Lyrics:** "I ask a lot of questions before I make anything" was removed because it repeats your bio. Five lines remain.

## Turning the Mixtape back on
- [ ] Create a free Supabase project, run `supabase.sql` in its SQL editor, paste the project URL and anon key into `SITE.supabase` in `content.js`, then set `window.MIXTAPE_ENABLED = true`.

## Worth knowing
- The motion videos are hosted on your Framer site (framerusercontent.com). If that site goes down, those tiles stop playing. Moving them to Vimeo would fix that.
