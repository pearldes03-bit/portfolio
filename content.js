/* =====================================================================
   CONTENT FILE
   Everything you can see on the site lives here: text, projects,
   images, videos, links and music. The design and code live in
   index.html, styles.css and app.js.

   Images live in the images/ folder, one folder per project.
   A project with  hidden: true  stays in this file but is not shown.
   ===================================================================== */

window.SITE = {
  name: "Pearl Dawar",
  role: "Interaction designer",
  location: "Stockholm",
  email: "pearldes03@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/pearl-dawar-190a60215/",
    behance: "https://www.behance.net/pearldawar19",
    resume: "" // Paste a link to your CV (Google Drive, Dropbox, or a PDF in this repo). Empty = button hidden.
  },
  avatar: "images/avatar.webp",
  avatarStill: "images/avatar-still.webp",

  position: "Research-driven interaction design focused on cognition, systems, and decision-making in real-world contexts.",
  currently: [
    "MSc Interactive Media Technology at KTH Stockholm",
    "Redesigning the AR placement step in Vastu Lens",
    "Looking for a product design internship"
  ],
  bio: "I work across interaction design, brand, UX research and XR, exploring the many forms design can live in. At the core of everything I do is a genuine curiosity about people and how they experience the world around them. I ask a lot of questions before I make anything, because good design starts with truly knowing the people it's built for.",
  howIWork: "My work focuses on interaction systems and cognitive support through spatial and experiential approaches, sometimes extending beyond screen-based interfaces.",
  thread: "Across these projects, I kept working on problems involving uncertainty, cognitive effort and real-world constraints. I learned that good interaction design is less about adding features and more about structuring information, reducing mental load and supporting decisions.",

  experience: [
    { role: "MSc Interactive Media Technology", org: "KTH Royal Institute of Technology, Stockholm", when: "2026 to 2028" },
    { role: "AI creative design intern", org: "Talk n Target, Gurgaon", when: "Apr to May 2026" },
    { role: "UI/UX design intern", org: "Gastos, Delhi. Worked directly with the CEO", when: "Apr to Sep 2025" },
    { role: "Graphic designer", org: "Drink-Cart, Delhi", when: "Oct to Nov 2024" },
    { role: "B.Des Interaction Design", org: "Guru Gobind Singh Indraprastha University, New Delhi", when: "2022 to 2026" }
  ],

  // "Pearl Wrapped": only real numbers.
  wrapped: [
    { n: "1st", l: "place at India HCI 2024, IIT Bombay", tone: "green" },
    { n: "57", l: "travellers surveyed for TWU", tone: "blue" },
    { n: "41", l: "people surveyed for my AR thesis", tone: "orange" },
    { n: "6", l: "taco boxes folded by hand before SABO worked", tone: "yellow" },
    { n: "12", l: "chocolate miniatures in one Caven gift box", tone: "brown" },
    { n: "5", l: "logo directions I threw away for Caven", tone: "pink" }
  ],

  // "Liked Songs": skills. The time column is how long I've used a tool.
  skills: [
    { group: "Research", items: ["User interviews", "Surveys", "Personas and empathy maps", "Affinity mapping", "Journey mapping", "Competitive analysis", "Usability testing"] },
    { group: "Interaction", items: ["Information architecture", "User flows", "Wireframing", "Prototyping", "AR and spatial interaction", "Service design"] },
    { group: "Visual", items: ["UI design", "Design systems", "Brand identity", "Packaging and dielines", "Typography", "Motion graphics"] },
    { group: "Tools", items: [
      { n: "Figma", d: "4 yrs" }, { n: "Adobe Illustrator", d: "4 yrs" }, { n: "After Effects", d: "3 yrs" },
      { n: "Procreate", d: "3 yrs" }, { n: "Framer", d: "2 yrs" }, { n: "Lens Studio", d: "1 yr" },
      { n: "Veo 3, Sora, Higgsfield, Gemini", d: "2026" }
    ] }
  ],

  // Philosophy lines that light up as you scroll.
  philosophy: [
    "Good interaction design is less about adding features.",
    "It's about structuring information,",
    "reducing mental load,",
    "and supporting the decisions people actually have to make.",
    "I ask a lot of questions before I make anything.",
    "I want people to move through uncertainty with confidence, not overwhelm."
  ],

  // MUSIC. Paste normal Spotify share links. The first one plays by default.
  tracks: [
    { title: "Marea (We've Lost Dancing)", artist: "Fred again.., The Blessed Madonna", url: "https://open.spotify.com/track/4yaVMoi2layCduIHBvubJD" },
    { title: "Kyle (i found you)", artist: "Fred again..", url: "https://open.spotify.com/track/6Ao5d7TMQ92h87jQqSHGyw" },
    { title: "Delilah (pull me out of this)", artist: "Fred again..", url: "https://open.spotify.com/track/5kiQ3vZChD7BFZS7MEiqPy" },
    { title: "Danielle (smile on my face)", artist: "Fred again..", url: "https://open.spotify.com/track/4LF5YqhCUA0mqNNaq0t7Af" },
    { title: "Kerala", artist: "Bonobo", url: "https://open.spotify.com/track/01xgHunMSfbTJvQW2mHj99" },
    { title: "Awake", artist: "Tycho", url: "https://open.spotify.com/track/2qC1sUo8xxRRqYsaYEdDuZ" }
  ],

  // MIXTAPE database (Supabase). Leave empty and the mixtape shows "opening soon".
  supabase: {
    url: "",
    anonKey: ""
  },

  recruiterPicks: ["food-setu", "vastu-lens", "mindora"]
};

/* =====================================================================
   PROJECTS
   shelf: "ux" (UX case studies), "brand" (Brand and packaging), "motion"
   Each project has sections. Each section has blocks:
     text, quote, stats, cards, steps, images, phones, carousel, video,
     videogrid, embed, list, threw (ideas I threw away), table, note, links
   ===================================================================== */

window.PROJECTS = [

/* ---------------------------------------------------------------- */
{
  slug: "food-setu",
  title: "Food Setu",
  subtitle: "Building connections for a sustainable food system",
  cardLine: "Surplus mess food to NGOs, with trust built in",
  shelf: "ux",
  accent: "#ea580c",
  cover: "images/foodsetu/cover.webp",
  coverBg: "#fde3d3",
  tags: ["UX/UI", "Research"],
  year: "2024",
  badge: "1st place, India HCI 2024",
  tldr: {
    problem: "University messes throw away safe food every day while nearby NGOs can't reliably feed the people who depend on them.",
    role: "System flow design, UI design, prototyping and research synthesis",
    team: "3 designers: Pearl Dawar, Sahil Sinha, Vasu Pratap Singh",
    timeline: "Nov 2024. India HCI 2024, IDC IIT Bombay",
    tools: "Figma",
    outcome: "1st place at the India HCI Student Design Consortium, IIT Bombay"
  },
  sections: [
    { id: "context", label: "Context", h: "Setu means bridge", blocks: [
      { t: "text", body: `<p>Every day, university messes cook more than they serve. The leftover food is safe and edible, but there's no structured way to get it to the people who need it, so it gets thrown away.</p><p>A few kilometres away, NGOs rely on expensive, unpredictable sources to feed the same people every day. Both sides want the same thing. What's missing is the bridge between them.</p>` },
      { t: "cards", items: [
        { h: "Goal 1", b: "A reliable, low-cost food source for NGOs, built from university surplus." },
        { h: "Goal 2", b: "Real-time scheduling and strict safety steps, so every handover is traceable and on time." },
        { h: "Goal 3", b: "Clear impact numbers for every partner, tied to Zero Hunger (SDG 2) and sustainable growth (SDG 8)." }
      ] }
    ] },
    { id: "research", label: "Research", h: "What the people doing this told us", blocks: [
      { t: "text", body: `<p>We interviewed three people who sit at different points of the chain: hostel mess staff, an NGO coordinator and a logistics partner. We asked about how donations happen today, food safety worries, and where coordination breaks.</p>` },
      { t: "stats", items: [
        { n: "85%", l: "of NGOs said they face food scarcity" },
        { n: "75%", l: "of donors said food spoiled because of poor coordination" },
        { n: "90%", l: "wanted real-time tracking and confirmation" },
        { n: "11 to 20 kg", l: "average daily surplus per university mess" }
      ] },
      { t: "quote", text: "We need steady food sources to stay consistent.", by: "Seva Group Foundation, our NGO persona, built from the coordinator interview" },
      { t: "text", body: `<p>The pattern underneath every answer: <strong>nobody trusted the handoff.</strong> Not the timing, not the quality, not whether the other side would actually show up.</p>` }
    ] },
    { id: "constraints", label: "Constraints", h: "Four pressures that shaped every screen", blocks: [
      { t: "cards", items: [
        { h: "Time", b: "Food expires fast. Listing and matching had to fit inside narrow pickup windows after mess hours." },
        { h: "Safety", b: "Quality has to be checkable before pickup, so listings needed clear descriptions and quantity limits." },
        { h: "Scale", b: "Many messes and NGOs run at once, so coordination had to be central, not one phone call at a time." },
        { h: "Trust", b: "NGOs needed a source they could plan around. Live status, not a promise." }
      ] }
    ] },
    { id: "process", label: "Process", h: "Double Diamond, from interviews to a pilot", blocks: [
      { t: "steps", items: [
        { h: "Empathise", b: "Interviews, empathy map, pain points, personas, journey map" },
        { h: "Define", b: "Problem statement, goals, competitive analysis, revenue model" },
        { h: "Ideate", b: "Brainstorming, rapid sketching, information architecture, user flow" },
        { h: "Prototype", b: "Lo-fi wireframes, design system, hi-fi interactive prototype" },
        { h: "Test", b: "UX research study, heuristic analysis, pilot feedback" }
      ] },
      { t: "images", layout: "wide", items: [ { src: "images/foodsetu/process.webp", alt: "Food Setu design process diagram across Empathise, Define, Ideate, Prototype and Testing" } ] },
      { t: "text", h: "Eight features, each traced to a constraint", body: `<p>Smart surplus logging, instant NGO notifications, auto-match and scheduling, an eco-safe packaging workflow, live pickup and delivery tracking, an impact dashboard, feedback and quality checks, and real-time availability.</p>` }
    ] },
    { id: "screens", label: "Key screens", h: "Only what you need to decide with confidence", blocks: [
      { t: "text", body: `<p>Sign-up includes NGO verification and clear terms on who is responsible for food quality. The home screen lists nearby messes with today's menu. Checkout splits into self-pickup and delivery (within 4 km, Rs. 10 per kg), and tracking shows where the food is at every step.</p>` },
      { t: "images", layout: "grid", items: [
        { src: "images/foodsetu/screens-1.webp", alt: "Food Setu onboarding, sign-up, verification, mess listing and menu screens", cap: "Onboarding, verification and the nearby mess listing" },
        { src: "images/foodsetu/screens-2.webp", alt: "Food Setu delivery and self-pickup checkout and live tracking screens", cap: "Checkout and live tracking" }
      ] },
      { t: "text", h: "The packaging mattered too", body: `<p>To stop food spoiling in transit, we specified eco-friendly bagasse containers with stacking grooves inside durable polyester outer cases, for bulk donations from 5 kg.</p>` },
      { t: "images", layout: "wide", items: [ { src: "images/foodsetu/packaging.webp", alt: "Sketches of the bagasse container with stacking groove and the polyester outer case" } ] }
    ] },
    { id: "outcome", label: "Outcome", h: "1st place at IIT Bombay", blocks: [
      { t: "text", body: `<p>Food Setu won 1st place at the India HCI Student Design Consortium, held at IDC IIT Bombay.</p>` },
      { t: "images", layout: "wide", items: [ { src: "images/foodsetu/award.webp", alt: "The Food Setu team receiving the award and presenting at India HCI 2024" } ] },
      { t: "video", kind: "youtube", id: "jtC6yMoohdo", title: "Food Setu project video", summary: "A walkthrough of the Food Setu system: how a mess lists surplus, how an NGO finds and confirms it, and how pickup or delivery is tracked." }
    ] },
    { id: "learned", label: "What I learned", h: "Design the system before the screen", blocks: [
      { t: "list", items: [
        "System-level interaction design is less about new interfaces and more about aligning time, trust and responsibility between people who have never met.",
        "Under real constraints, clarity and coordination mattered more than feature richness.",
        "Trust isn't one screen's job. It's built across verification, listing and confirmation together.",
        "Next time I'd design harder for the moment a pickup falls through, because that's where trust actually breaks."
      ] },
      { t: "links", items: [ { l: "Watch the project video", u: "https://youtu.be/jtC6yMoohdo" }, { l: "View on Behance", u: "https://www.behance.net/pearldawar19" } ] }
    ] }
  ]
},

/* ---------------------------------------------------------------- */
{
  slug: "vastu-lens",
  title: "Vastu Lens",
  subtitle: "Augmented reality as cultural spatial intelligence",
  cardLine: "AR that shows Vastu zones inside real rooms",
  shelf: "ux",
  accent: "#FF4900",
  cover: "images/vastu/cover.webp",
  coverBg: "#fbd9cc",
  tags: ["UX/UI", "Research", "Spatial/XR"],
  year: "2026",
  badge: "B.Des thesis",
  tldr: {
    problem: "People who follow Vastu Shastra live in already-built homes, but Vastu guidance assumes open land and leaves them guessing where directions even are.",
    role: "Solo: research, UX and UI design, AR interaction (B.Des thesis)",
    team: "Individual. Guided by Mr. Yogesh Kumar Bhanu and Ms. Deekshali Anand",
    timeline: "8 weeks of design, shown at Design Flux 1.0, GGSIPU degree show 2026",
    tools: "Figma, AR prototyping, SLAM and IMU research",
    outcome: "A working AR scan and conflict logic, with the placement step now being redesigned after testing"
  },
  sections: [
    { id: "context", label: "Context", h: "Old spatial rules, homes that were never built to follow them", blocks: [
      { t: "text", body: `<p>Vastu Shastra is a traditional Indian system for deciding how rooms, objects and activities should be oriented in a home. It still shapes housing decisions, renovations and emotional comfort in a lot of Indian households.</p><p>But the guidance is abstract and assumes ideal layouts on open land. Real homes are already built. People don't know where to measure direction from once they're inside, and rigid "good or bad" readings create fear and dependence on consultants.</p><p><strong>VastuLens</strong> is a mobile AR app for urban Indian homeowners. It projects directional Vastu zones onto real rooms through the phone camera, detects conflicts, and suggests remedies that don't need a wall to move.</p>` },
      { t: "images", layout: "wide", items: [ { src: "images/vastu/cover.webp", alt: "VastuLens app screens on three phones" } ] }
    ] },
    { id: "research", label: "Research", h: "41 people, three pain points", blocks: [
      { t: "stats", items: [
        { n: "41", l: "survey participants: homeowners, students and design professionals" },
        { n: "3", l: "core pain points: direction confusion, structural constraints, a trust gap" },
        { n: "2", l: "personas: Neha Sharma (homeowner) and Utkarsh (designer)" }
      ] },
      { t: "text", body: `<p>Alongside the survey I read into cognitive load theory, SLAM technology and Vastu literature, and mapped what I found with affinity, empathy and journey maps.</p>` },
      { t: "cards", h: "The research gaps", items: [
        { h: "Contextual gap", b: "Existing Vastu studies focus on ideal layouts, not interpretation inside already-built homes." },
        { h: "Cognitive gap", b: "Research assumes people can mentally translate direction rules indoors, without checking how that actually happens." },
        { h: "Technology gap", b: "Vastu and AR are rarely studied together to support real-time spatial understanding." }
      ] }
    ] },
    { id: "framework", label: "Framework", h: "From cultural rules to something you can see", blocks: [
      { t: "table", head: ["Cultural rule", "Spatial attribute", "In AR"], rows: [
        ["Direction", "Orientation", "Compass and zone overlays"],
        ["Activity zoning", "Functional areas", "Room-specific cues"],
        ["Degrees", "Precision alignment", "Degree bands"],
        ["Remedies", "Constraint handling", "Alternative placements"]
      ] },
      { t: "steps", items: [
        { h: "Cultural rules", b: "Direction-based principles with meaning but no direct spatial action" },
        { h: "Spatial attributes", b: "Rules translated into orientation, position and angle" },
        { h: "AR mediation", b: "AR as an interpretive layer inside the lived space" },
        { h: "Confidence", b: "Situated guidance that supports clearer, calmer decisions" }
      ] },
      { t: "images", layout: "wide", items: [ { src: "images/vastu/layers.webp", alt: "Three layers of the project: cultural spatial logic, spatial interpretation through AR, situated user understanding" } ] },
      { t: "text", h: "Experience principles", body: `<p>Six principles guided every screen, including <strong>Accuracy</strong>, <strong>Confidence</strong>, <strong>Transparency</strong> and <strong>Remedies-first</strong>. <span class="ph">[Placeholder: the other two principles]</span></p>` }
    ] },
    { id: "design", label: "Key screens", h: "Point, see, fix", blocks: [
      { t: "text", body: `<p>I built the information architecture across 5 tabs and 13 screens, lo-fi wireframes for the 9 core flow screens, then a high-fidelity prototype with an AR zone overlay system.</p>` },
      { t: "phones", items: [
        { src: "images/vastu/ar-scanner.webp", alt: "AR scanner screen mapping a room", cap: "AR scanner: point your phone at a room and see zones on the floor and walls" },
        { src: "images/vastu/remedy-card.webp", alt: "Remedy card suggesting a plant in the north-east", cap: "Remedy cards: specific non-structural fixes like plants, copper strips and colour accents" },
        { src: "images/vastu/file-upload.webp", alt: "Mode of measurement screen with AR scan, 3D upload and 2D floor plan options", cap: "Scan live, upload a 2D floor plan, or drop in a 3D model" },
        { src: "images/vastu/pdf-report.webp", alt: "Audited PDF report with conflict table", cap: "An audited PDF report. Remedies are left out on purpose so people come back to the app" }
      ] },
      { t: "embed", kind: "figma", url: "https://www.figma.com/proto/ioF0X9kMLuSuRqM34wglHY/vastu-ar?node-id=0-1&t=iLITe0a2avCF9Ny3-1", title: "VastuLens clickable prototype" },
      { t: "video", kind: "youtube", id: "QPubs7y_QFs", title: "VastuLens prototype video", summary: "A walkthrough of the VastuLens prototype: scanning a room, seeing Vastu zones overlaid in AR, opening a remedy card and generating the report." }
    ] },
    { id: "testing", label: "Testing", h: "Every tester got stuck on the same step", blocks: [
      { t: "note", h: "What I'm fixing next", body: `<p>The "Show Me How" step, where you physically point your phone at a spot to place a remedy, confused every usability tester. Nobody understood what the app wanted them to do first. The scan and the conflict logic work. The placement step is going back to the drawing board, and I'd rather show that than pretend it's finished.</p>` }
    ] },
    { id: "learned", label: "Contributions", h: "What this adds beyond the app", blocks: [
      { t: "list", items: [
        "It reframes Vastu Shastra as a structured spatial decision-making system, which makes it legible as a design problem.",
        "It positions AR as a mediating layer between a cultural rule set and a real home, not a visual trick.",
        "It identifies spatial interpretation, not rule correctness, as the real design challenge in culturally specific tools."
      ] },
      { t: "links", items: [ { l: "Open the prototype", u: "https://www.figma.com/proto/ioF0X9kMLuSuRqM34wglHY/vastu-ar?node-id=0-1&t=iLITe0a2avCF9Ny3-1" }, { l: "Read the research paper", u: "https://drive.google.com/file/d/1SVZNLRfImrrwHm9fYpbdRkr1-zaB03_p/view" }, { l: "Watch the video", u: "https://youtu.be/QPubs7y_QFs" } ] }
    ] }
  ]
},

/* ---------------------------------------------------------------- */
{
  slug: "mindora",
  title: "Mindora",
  subtitle: "A cognitive enhancement platform",
  cardLine: "Brain training that adapts to the person, not the other way round",
  shelf: "ux",
  accent: "#6056FF",
  cover: "images/mindora/cover.webp",
  coverBg: "#15131f",
  tags: ["UX/UI", "Research"],
  year: "2025",
  tldr: {
    problem: "Cognitive training apps assume steady focus and tech confidence, which shuts out older adults, people with learning disabilities and people recovering from brain injuries.",
    role: "Solo: user research, interaction design, UI design, testing",
    team: "Individual academic project, Semester 5",
    timeline: "March 2025",
    tools: "Figma",
    outcome: "Both test participants rated cognitive support 5 out of 5. Navigation was the weak spot."
  },
  sections: [
    { id: "context", label: "Context", h: "Designing for minds that work differently", blocks: [
      { t: "text", body: `<p>Older adults, people with learning disabilities and people recovering from brain injuries often have reduced cognitive abilities, which affects their independence and daily life. Most training apps assume consistent capacity and technical familiarity, and quietly exclude the people who need them most.</p>` },
      { t: "quote", text: "The platform needs to be highly customisable for diverse cognitive needs, accessible across tech skill levels, and mindful enough to keep people engaged.", by: "My refined problem statement, after the first round of feedback" }
    ] },
    { id: "research", label: "Research", h: "Five participants, three very different groups", blocks: [
      { t: "stats", items: [
        { n: "66.67%", l: "preferred memory games over other activities" },
        { n: "60%", l: "said they face cognitive challenges" },
        { n: "46.67%", l: "were only somewhat comfortable with technology" }
      ], note: "Most participants did cognitive activities weekly, not daily, which pointed to short sessions that fit into a day." },
      { t: "images", layout: "wide", items: [ { src: "images/mindora/research.webp", alt: "User research synthesis: goals, frustrations, behaviour patterns, accessibility needs and motivation triggers" } ] },
      { t: "text", body: `<p>I compared Lumosity, BrainHQ and Funsat, and mapped needs across the three groups. Short, goal-oriented tasks kept people engaged, long ones caused fatigue, and clear progress tracking built confidence.</p>` }
    ] },
    { id: "constraints", label: "Constraints", h: "Four constraints, one adaptive system", blocks: [
      { t: "cards", items: [
        { h: "Cognitive load", b: "Dense screens and too many choices raise mental effort and fatigue." },
        { h: "Attention span", b: "Long or complex tasks lose focus, so sessions had to be short and rewarding." },
        { h: "Sensory sensitivity", b: "Visual clutter can cause discomfort or anxiety." },
        { h: "Recovery variability", b: "Age, learning ability and recovery stage all need different pacing." }
      ] },
      { t: "quote", text: "Why would adults play a game to improve their memory? Wouldn't they think it's for kids?", by: "The question I had to answer. I framed activities as challenges, not games, kept the interface mature and clean, focused on real-life benefits, and used familiar formats like memory cards." }
    ] },
    { id: "design", label: "Key screens", h: "Two versions for two very different people", blocks: [
      { t: "text", h: "For people with learning disabilities", body: `<p>A bento-grid dashboard so attention goes to one block at a time, flashcards for focused learning, and a profile that shows progress through badges instead of scores.</p>` },
      { t: "images", layout: "grid", items: [
        { src: "images/mindora/login.webp", alt: "Mindora login where people choose their area of interest", cap: "Sign-up asks which domain fits you" },
        { src: "images/mindora/dashboard-ld.webp", alt: "Bento grid dashboard", cap: "Bento dashboard for selective attention" },
        { src: "images/mindora/flashcards.webp", alt: "Flashcard learning screen", cap: "Flashcards for focused learning" },
        { src: "images/mindora/profile-ld.webp", alt: "Profile with badges, goals and mood check-in", cap: "Progress as badges and a mood check-in" }
      ] },
      { t: "text", h: "For older adults", body: `<p>The same structure, with a Smart Remote challenge that simulates real tasks, like switching a TV to Netflix, for people who haven't grown up with this technology.</p>` },
      { t: "images", layout: "grid", items: [
        { src: "images/mindora/dashboard-older.webp", alt: "Older adults dashboard with real-life tasks", cap: "Dashboard with real-life tasks" },
        { src: "images/mindora/smart-remote.webp", alt: "Smart remote task to navigate to Netflix", cap: "Smart Remote: navigate to Netflix" },
        { src: "images/mindora/profile-older.webp", alt: "Older adult profile with growth charts", cap: "Profile with growth charts" }
      ] },
      { t: "embed", kind: "figma", url: "https://www.figma.com/design/DzGq7Ysza9V4QqZeGAW0WM/UX-Case-Study-MINDORA?node-id=271-845&t=o2EzbIvWBORhdMtw-1", title: "Mindora prototype" }
    ] },
    { id: "testing", label: "Testing", h: "Strong support, shaky navigation", blocks: [
      { t: "stats", h: "Participant A, learning disability", items: [ { n: "5/5", l: "cognitive support" }, { n: "3.7/5", l: "intuitive" }, { n: "4/5", l: "ease of use" } ] },
      { t: "stats", h: "Participant B, older adult, 63", items: [ { n: "5/5", l: "cognitive support" }, { n: "4/5", l: "intuitive" }, { n: "3.5/5", l: "ease of use" } ] },
      { t: "text", body: `<p>Both reported strong cognitive support and visual clarity. Both had trouble with navigation, especially the first time through.</p>` }
    ] },
    { id: "learned", label: "What I learned", h: "Less on screen, more confidence", blocks: [
      { t: "list", items: [
        "Clear feedback and progress indicators reduced uncertainty more than any visual decision.",
        "Limiting choices and task length managed cognitive load better than any single pattern.",
        "Visual cues helped recognition over recall.",
        "Clean, low-stimulation visuals increased comfort and trust.",
        "Next iteration: onboarding that teaches navigation, since that's where both testers struggled."
      ] }
    ] }
  ]
},

/* ---------------------------------------------------------------- */
{
  slug: "twu",
  title: "TWU",
  subtitle: "Travel With Us, a personalised travel app",
  cardLine: "Fewer decisions between wanting a trip and taking it",
  shelf: "ux",
  accent: "#38B6C8",
  cover: "images/twu/cover.webp",
  coverBg: "#e8f7fa",
  tags: ["UX/UI", "Research", "Branding & packaging"],
  year: "2024",
  tldr: {
    problem: "Planning a trip means juggling five apps for inspiration, booking, navigation, budget and local tips. The problem isn't too few options, it's too many decisions.",
    role: "Solo: user research, wireframing, prototyping, UI design and logo",
    team: "Individual project",
    timeline: "1 April to 1 June 2024",
    tools: "Figma, Google Forms",
    outcome: "An end-to-end prototype from onboarding to a personalised itinerary, plus the TWU identity"
  },
  sections: [
    { id: "context", label: "Context", h: "Too many decisions, spread across too many tools", blocks: [
      { t: "text", body: `<p>People plan trips by switching between apps for inspiration, booking, navigation, budgeting and finding local places. That leads to decision fatigue, generic recommendations and stress. TWU brings it into one place and narrows choices down to what fits you.</p>` },
      { t: "images", layout: "wide", items: [ { src: "images/twu/logo.webp", alt: "TWU logo", cap: "The TWU logo, an arrow built into the T" } ] }
    ] },
    { id: "research", label: "Research", h: "57 travellers, aged 18 to 34", blocks: [
      { t: "stats", items: [
        { n: "57", l: "people surveyed, mostly frequent travellers and families" },
        { n: "68.4%", l: "open to group chats for planning trips together" },
        { n: "[%]", l: "wanted a personalised travel magazine with real-time navigation. [Placeholder: confirm 83% or 93%]" }
      ] },
      { t: "text", body: `<p>Most people used MakeMyTrip, then Airbnb, Goibibo and Trivago. The pain points went beyond booking: inaccurate accommodation, language barriers, loneliness for solo travellers, finding local places, navigation and money.</p><p>I built three personas from this: Rishab (25, software developer, spontaneous), Karan (28, analyst, escapes to the hills), and Ishita (22, MBA student, avoids crowds and hunts for local food).</p>` },
      { t: "cards", h: "Where existing tools fall short", items: [
        { h: "MakeMyTrip", b: "Comprehensive, but so many options it causes decision overload." },
        { h: "Trivago", b: "Hotels only. No itinerary, no local discovery." },
        { h: "Airbnb", b: "Stays only. Everything else is up to you." },
        { h: "Goibibo", b: "Built around discounts, with little after booking." }
      ] }
    ] },
    { id: "design", label: "Key screens", h: "Every screen removes a decision", blocks: [
      { t: "steps", items: [
        { h: "Personalisation", b: "Turn preferences into ready itineraries" },
        { h: "Navigation and context", b: "Support decisions before, during and after the trip" },
        { h: "Community", b: "Plan together without leaving the app" }
      ] },
      { t: "phones", items: [
        { src: "images/twu/onboarding-1.webp", alt: "Onboarding: plan your trip", cap: "Onboarding sets expectations in three steps" },
        { src: "images/twu/interests.webp", alt: "Select up to five interests", cap: "Pick up to 5 interests, so everything after is pre-filtered" },
        { src: "images/twu/explore.webp", alt: "Explore screen with popular searches", cap: "Explore shows a shortlist, never the full catalogue" },
        { src: "images/twu/search.webp", alt: "Trip package search with recent searches", cap: "Search with average spend up front" }
      ] },
      { t: "text", h: "Two features I'm proud of", body: `<p><strong>A day-wise itinerary magazine</strong> arrives right after booking, based on how long you're staying, your interests and where you are, so you never hit a blank "what now?" moment.</p><p><strong>AR view of stays</strong> lets you look around a hotel's surroundings before you book.</p>` },
      { t: "images", layout: "wide", items: [ { src: "images/twu/cover.webp", alt: "TWU interests, destination detail and hotel listing screens" } ] }
    ] },
    { id: "learned", label: "What I learned", h: "Ambition versus what actually ships", blocks: [
      { t: "list", items: [
        "Structuring decisions matters more than adding features.",
        "The moment right after payment is when people feel most lost, and most need guidance.",
        "I tried to build a full 3D VR preview and ended up with a faux VR version because of tech limits. Lesson: balance ambitious features with realistic, usable interfaces."
      ] }
    ] }
  ]
},

/* ---------------------------------------------------------------- */
{
  slug: "sabo",
  title: "SABO",
  subtitle: "A spill-free, modular taco packaging system",
  cardLine: "Packaging that turns into the plate",
  shelf: "brand",
  accent: "#3F5791",
  cover: "images/sabo/cover.webp",
  coverBg: "#f3c934",
  tags: ["Branding & packaging", "Research"],
  year: "2025",
  tldr: {
    problem: "Tacos are open-ended, so paper wraps collapse, leak and go soggy, especially when people eat standing up or on the move.",
    role: "Solo: research, structural design, prototyping, branding",
    team: "Individual academic project. Guide: Dr. Nanki Nath",
    timeline: "Semester 7, November 2025",
    tools: "Illustrator, paper prototyping",
    outcome: "Three packaging forms that tested with little to no spillage"
  },
  sections: [
    { id: "context", label: "Context", h: "When packaging fails the food", blocks: [
      { t: "text", body: `<p>I watched people struggle to eat tacos neatly while standing or commuting. Vendors told me wraps are cheap but slow at volume. Taco Bell uses basic wraps, taco trucks use open trays, and nothing worked across both.</p><p>The insight: <strong>people value cleanliness and convenience more than traditional wrapping.</strong> The problem is structural, not visual.</p>` },
      { t: "cards", items: [
        { h: "Prevent spills", b: "No collapse, no leaks, tacos stay upright." },
        { h: "Easy for vendors", b: "Quick to assemble and store flat." },
        { h: "Modular", b: "Scales from one taco to a pack of eight." },
        { h: "One form", b: "Lid, base and tray in one intuitive piece." }
      ] }
    ] },
    { id: "threw", label: "Iterations", h: "Six prototypes, folded by hand", blocks: [
      { t: "threw", items: [
        { h: "Taco drawer", b: "Impractical and annoying to open. It added cognitive load to eating a taco." },
        { h: "Taco box", b: "The filling spilled when you picked it up, because the taco lay flat." },
        { h: "Takeaway bag", b: "The taco simply didn't fit." }
      ] },
      { t: "text", body: `<p>Three made it: a <strong>pack of 3</strong> with tacos standing upright, a <strong>single cover that opens into a tray</strong>, and a <strong>mega pack of 8</strong> for bulk orders.</p>` },
      { t: "images", layout: "grid", items: [
        { src: "images/sabo/cover-with-tray.webp", alt: "SABO single taco cover next to its unfolded tray", cap: "The single cover opens into a tray" },
        { src: "images/sabo/tray-open.webp", alt: "SABO cover and tray from another angle", cap: "Symmetrical, so tacos stand upright" },
        { src: "images/sabo/pack-of-8.webp", alt: "SABO octagonal mega pack of 8", cap: "Mega pack of 8 for bulk orders" },
        { src: "images/sabo/in-hand.webp", alt: "SABO pack of 3 carried by its handle", cap: "Pack of 3 with a carry handle" }
      ] }
    ] },
    { id: "testing", label: "Testing", h: "Three people, real tacos", blocks: [
      { t: "text", body: `<p>I tested the final prototypes with three people. There was little to no spillage, the packs were easy to open and reclose, and they held up for delivery. People said the tray made eating easier and liked the modular pack for sharing. One suggestion I'd add next: an insert for sauce sachets.</p>` }
    ] },
    { id: "brand", label: "Branding", h: "A name built to travel further than tacos", blocks: [
      { t: "text", body: `<p>SABO comes from "sabor", flavour. It's short, global and works beyond tacos. The logo is a hand-drawn graffiti script: bold strokes for visibility, playful drips for sauce and heat. Navy #3F5791, yellow #F3C934, ivory #FFFCF5.</p>` },
      { t: "images", layout: "wide", items: [ { src: "images/sabo/cover.webp", alt: "The full SABO packaging family on yellow" } ] }
    ] }
  ]
},

/* ---------------------------------------------------------------- */
{
  slug: "caven",
  title: "Caven",
  subtitle: "A dark chocolate brand designed to be gifted",
  cardLine: "Quiet luxury, slow unboxing",
  shelf: "brand",
  accent: "#4a3f3c",
  cover: "images/caven/cover.webp",
  coverBg: "#e06b2c",
  tags: ["Branding & packaging"],
  year: "[Year]",
  tldr: {
    problem: "Most chocolate packaging shouts. Caven treats dark chocolate as a craft, so the brand had to feel restrained and still work on a 2 cm wrapper.",
    role: "Solo: brand strategy, naming, logo, packaging and gift box",
    team: "Individual academic project. Guide: Dr. Nanki Nath",
    timeline: "[Placeholder: date]",
    tools: "Illustrator, Louis George Cafe",
    outcome: "A full identity, a five-flavour system and a 12-piece gift box"
  },
  sections: [
    { id: "context", label: "Brand essence", h: "Depth and restraint", blocks: [
      { t: "text", body: `<p>Caven treats dark chocolate as a craft, not candy: a conversation between bitterness, texture and warmth. The brand expresses quiet luxury through minimal visuals and deliberate naming, and it's designed to be gifted, with a box that invites slow unboxing.</p>` }
    ] },
    { id: "threw", label: "Logo directions", h: "Five wordmarks, four thrown away", blocks: [
      { t: "threw", items: [
        { h: "Direction 1", b: "Rich and editorial, but too loud. It read as perfume or couture, not chocolate." },
        { h: "Direction 2", b: "Elegant, but razor-thin lines disappear at miniature size." },
        { h: "Direction 3", b: "Legible, but too nostalgic. It made the brand look like an old chocolatier." },
        { h: "Direction 4", b: "Sleek, but cold and clinical, and it lost contrast on dark packaging." }
      ] },
      { t: "text", body: `<p>The winner: a confident uppercase sans with wide spacing and no ornament. It doesn't compete with the flavour colours, and it still reads on a 2 to 3 cm wrapper.</p>` }
    ] },
    { id: "system", label: "Flavour system", h: "Every flavour gets a shape and a word", blocks: [
      { t: "table", head: ["Flavour", "Mark", "Meaning"], rows: [
        ["Core", "Circle", "Purity, origin, centre"],
        ["Ember", "Triangle", "Heat, zest, spark (orange)"],
        ["Roast", "Square", "Ground, depth, toasting (almond)"],
        ["Kernel", "Arc", "Creaminess, softness (cashew)"],
        ["Trail", "Sparkle", "Blend, movement, harmony (fruit and nut)"]
      ] },
      { t: "images", layout: "grid", items: [
        { src: "images/caven/core.webp", alt: "Caven Core, sweet bitter", cap: "Core" },
        { src: "images/caven/roast.webp", alt: "Caven Roast, roasted almond", cap: "Roast" },
        { src: "images/caven/kernel.webp", alt: "Caven Kernel, cashew", cap: "Kernel" },
        { src: "images/caven/cover.webp", alt: "Caven Ember, darkness of orange", cap: "Ember" }
      ] }
    ] },
    { id: "gift", label: "Gift box", h: "Twelve miniatures and a ribbon", blocks: [
      { t: "text", body: `<p>The gift box holds 12 miniatures: 4 Core as the foundation, then 2 each of Ember, Roast, Kernel and Trail to explore. The box unfolds around the chocolates, so opening it feels like a small ritual.</p>` },
      { t: "images", layout: "grid", items: [
        { src: "images/caven/gift-box.webp", alt: "Caven gift box with ribbon and a Core miniature", cap: "The finished box" },
        { src: "images/caven/gift-box-top.webp", alt: "Caven gift box from above with ribbon and Ember miniature", cap: "Tied with a ribbon" },
        { src: "images/caven/box.webp", alt: "Caven box folded closed", cap: "Folded closed" }
      ] }
    ] }
  ]
},

/* ---------------------------------------------------------------- */
{
  slug: "pantone-condiments",
  title: "Pantone Condiments",
  subtitle: "A systematic re-branding experiment",
  cardLine: "What if you picked sauce the way you pick a colour?",
  shelf: "brand",
  accent: "#E07A50",
  cover: "images/pantone/cover.webp",
  coverBg: "#f6dfcf",
  tags: ["Branding & packaging"],
  year: "[Year]",
  disclaimer: "Conceptual student project. Not affiliated with or endorsed by Pantone.",
  tldr: {
    problem: "The sauce aisle is chaos: tomato photos, flames, rustic fonts, loud gradients. People recognise brands, not flavours.",
    role: "Solo: concept, identity system and packaging",
    team: "Individual academic project. Guide: Dr. Nanki Nath",
    timeline: "[Placeholder: date]",
    tools: "Illustrator, Helvetica Neue",
    outcome: "An 8-sauce system where flavour reads as colour first, text second"
  },
  sections: [
    { id: "context", label: "The question", h: "Flavour = colour", blocks: [
      { t: "quote", text: "How can a visual identity built on clarity and standardisation reorganise sauces so people choose visually, instinctively and confidently?", by: "The question behind the project" },
      { t: "text", body: `<p>Each sauce becomes a swatch in physical form: a solid colour body, a white label as a specification field, and a strict hierarchy of code, flavour, intensity and volume. No food photos, no illustrations, no decoration.</p>` }
    ] },
    { id: "system", label: "The system", h: "Eight sauces, one gradient", blocks: [
      { t: "table", head: ["Code", "Flavour", "Variant"], rows: [
        ["186", "Tomato Ketchup", "Classic"], ["1655", "Chili Hot", "Extra spicy"], ["485", "Chili Mild", "Balanced heat"], ["4695", "BBQ", "Smoky and rich"],
        ["121", "Mustard", "Smoky and sweet"], ["347", "Mint Herb", "American style"], ["7500", "Garlic Mayo", "Creamy and rich"], ["Black 7", "Soy", "Savoury and deep"]
      ] },
      { t: "text", body: `<p>On the shelf, the bottles behave like a controlled gradient. You find your sauce by colour first, then confirm it with text.</p>` }
    ] },
    { id: "packaging", label: "Packaging", h: "A 60 ml carton, unfolded", blocks: [
      { t: "text", body: `<p>The carton carries a "Level: Medium" heat badge, the bottle on the front, ingredients and nutrition on the side, and a barcode. Here it is flat and folded.</p>` },
      { t: "images", layout: "grid", items: [
        { src: "images/pantone/dieline.webp", alt: "The Pantone Condiments carton laid flat as a dieline", cap: "The dieline" },
        { src: "images/pantone/cover.webp", alt: "Three folded Pantone Condiments cartons", cap: "Folded cartons" }
      ] }
    ] }
  ]
},

/* ---------------------------------------------------------------- */
{
  slug: "social-talk-n-target",
  title: "Ad in 3",
  subtitle: "Social content, made during my internship at Talk n Target",
  cardLine: "An Instagram carousel about the ads coming to your feed",
  shelf: "motion",
  accent: "#0f766e",
  cover: "images/social/post-1.webp",
  coverBg: "#1d5fa8",
  tags: ["Motion & social"],
  year: "2026",
  tldr: {
    problem: "Explain Instagram's structured ad breaks and a possible paid ad-free tier in three swipes.",
    role: "[Placeholder: my exact role]",
    team: "AI creative design internship, Talk n Target, Gurgaon",
    timeline: "Apr to May 2026",
    tools: "[Placeholder: tools used]",
    outcome: "[Placeholder: reach, saves or shares]"
  },
  sections: [
    { id: "carousel", label: "The carousel", h: "The \"Ad in 3\" countdown as the hook", blocks: [
      { t: "text", body: `<p>A three-slide carousel: the countdown you'll start seeing before ads, the fact that Meta already sells ad-free Instagram in the EU and UK, and what that hints at for everyone else. <span class="ph">[Placeholder: who it was made for]</span></p>` },
      { t: "carousel", items: [
        { src: "images/social/post-1.webp", alt: "Slide 1: Seeing that little Ad in 3 countdown. Instagram is warning you about structured ad breaks and a paid ad-free tier later." },
        { src: "images/social/post-2.webp", alt: "Slide 2: This isn't new. In the EU and UK, users can already pay monthly to use Instagram and Facebook with no ads." },
        { src: "images/social/post-3.webp", alt: "Slide 3: Hints of a future-paid ad-free tier, with the countdown signalling when an ad will appear." }
      ] }
    ] }
  ]
},

/* ---------------------------------------------------------------- */
{
  slug: "motion",
  title: "Motion & Video",
  subtitle: "My motion graphics and video editing experiments",
  cardLine: "Titles, ads, sound and a 3D website",
  shelf: "motion",
  accent: "#0f766e",
  cover: "",
  coverBg: "#0f766e",
  coverText: "Motion",
  tags: ["Motion & social"],
  year: "2024 to 2026",
  tldr: null,
  sections: [
    { id: "reel", label: "Videos", h: "Click a tile to watch with sound", blocks: [
      { t: "videogrid", items: [
        { title: "Ansh | Advertisement", label: "Video editing", src: "https://framerusercontent.com/assets/AHndaOUv8hL1t7AFWz0cgDK7M.mp4" },
        { title: "Dune movie title", label: "Motion graphics", concept: true, src: "https://framerusercontent.com/assets/Ufu5kANsfrS5YRZuoDIVMNEdKQ.mp4" },
        { title: "Apple intelligence", label: "Motion graphics", concept: true, src: "https://framerusercontent.com/assets/kyJa3XJCoow3NKH8Xdd9w1nurw.mp4" },
        { title: "Sound design", label: "Made from spontaneous audio snippets", src: "https://framerusercontent.com/assets/5ImMw7qZuDKFooaVEuaAsd5fHOs.mp4" },
        { title: "3D motion website", label: "Made in Figma", src: "https://framerusercontent.com/assets/PbBkyR2SINxjEkRi3YOFcko3mI.mp4" },
        { title: "Morph", label: "Motion graphics", vimeo: "1161182743" }
      ] }
    ] }
  ]
},

/* ---------------------------------------------------------------- */
{
  slug: "ansh",
  title: "Ansh",
  subtitle: "Luxury fashion apparel branding",
  cardLine: "Identity and a launch film for a fashion label",
  shelf: "brand",
  accent: "#7e22ce",
  cover: "",
  coverBg: "#2e1065",
  coverText: "Ansh",
  tags: ["Branding & packaging", "Motion & social"],
  year: "[Year]",
  tldr: {
    problem: "[Placeholder: the brief]",
    role: "[Placeholder: my role]",
    team: "[Placeholder]",
    timeline: "[Placeholder]",
    tools: "[Placeholder]",
    outcome: "[Placeholder]"
  },
  sections: [
    { id: "film", label: "The ad", h: "Ansh advertisement", blocks: [
      { t: "video", kind: "mp4", src: "https://framerusercontent.com/assets/AHndaOUv8hL1t7AFWz0cgDK7M.mp4", title: "Ansh advertisement", summary: "A short advertisement film for Ansh, a luxury fashion apparel brand." },
      { t: "links", items: [ { l: "View the full project on Behance", u: "https://www.behance.net/gallery/199109473/ANSH-LUXURY-FASHION-APPAREL-BRANDING" } ] }
    ] }
  ]
},

/* ---------------------------------------------------------------- */
{
  slug: "productive-procrastination",
  title: "Productive Procrastination",
  subtitle: "Side projects made when I should have been doing something else",
  shelf: "motion",
  accent: "#be185d",
  cover: "",
  coverBg: "#be185d",
  tags: ["Motion & social"],
  hidden: true,
  sections: []
}

];
