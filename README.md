# Personal Portfolio

A modern, single-page personal portfolio built with React, TypeScript, Vite, and TailwindCSS 4.

## Tech Stack

| Category   | Technology                       |
| ---------- | -------------------------------- |
| Framework  | React 19 + TypeScript            |
| Build Tool | Vite                             |
| Styling    | TailwindCSS 4 (CSS-first config) |
| Animations | Framer Motion                    |
| Icons      | Lucide React                     |

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Customizing Content

### Name & tagline
- **`src/sections/Intro.tsx`** — edit the `<span className="hero-name">` and tagline `<p>`.
- **`src/components/Navbar.tsx`** — edit the `SP` initials and `· Shirish Parasa` brand text.
- **`index.html`** — update `<title>` and all `og:` / `twitter:` meta tags.

### About / bio & social links
- **`src/sections/About.tsx`** — edit the two JSX paragraphs inside the `.map()` call (~line 92).
- Social buttons (GitHub / LinkedIn / Resume): update the `href` values in the array near the bottom of `About.tsx`.
- Resume link: update `href: '/resume.pdf'` and replace `public/resume.pdf` with your file.

### Experience cards
- **`src/sections/Experience.tsx`** — edit the `WORK_ENTRIES` array at the top.
  Fields: `id`, `company`, `title`, `period`, `location`, `description`, `logo?`
- **To add a company logo:** drop a PNG/SVG into `public/assets/` and set `logo: '/assets/company-logo.png'`. If omitted, the first letter of `company` is used.

### Education cards
- **`src/sections/Education.tsx`** — edit the `EDU_ENTRIES` array at the top.
  Fields: `id`, `institution`, `degree`, `period`, `location`, `gpa?`, `coursework?`, `logo?`
- **Coursework** is shown as wrapped chips — add as many as you like.
- **To add a school logo:** drop a PNG/SVG into `public/assets/` and set `logo: '/assets/school-logo.png'`.

### Skills / Tech Stack
- **`src/data/techStack.ts`** — edit the `techStack` array.

### Projects
- **`src/data/projects.ts`** — edit the `projects` array.

  | Field | Required | Notes |
  |-------|----------|-------|
  | `id` | yes | Unique key string |
  | `title` | yes | Project name |
  | `description` | yes | 2–4 sentences |
  | `image` | yes | Path relative to `/public`, e.g. `'/projects/myapp.png'` |
  | `imageAlt` | yes | Screen-reader alt text |
  | `tech` | yes | Badge labels array |
  | `category` | yes | `'web'` \| `'ml'` \| `'tools'` |
  | `githubUrl` | no | Repo link — shows GitHub button |
  | `demoVideoUrl` | no | YouTube / Loom URL — shows Demo button |
  | `liveUrl` | no | Deployed site — shows Live button |
  | `featured` | no | `true` to highlight the card |

### Contact info & social links
- **`src/sections/Contact.tsx`** — update the `CONTACT_INFO` array and the `mailto:` URL inside `handleSubmit`.
- **`src/sections/Intro.tsx`** — update the `SOCIALS` array (hero social icons).

---

## Adding Images & Files

### Profile photo
1. Replace **`public/assets/profile.jpg`** with your own photo
2. Recommended: square crop, ≥ 640 × 640 px
3. A gradient fallback shows automatically if the file is missing

### Company / school logos (Experience & Education)
1. Drop a PNG or SVG into **`public/assets/`** (e.g. `vertiv-logo.png`)
2. In `Experience.tsx` or `Education.tsx`, set `logo: '/assets/vertiv-logo.png'` on the entry
3. If `logo` is omitted the first letter of the name is shown instead

### Project screenshots
1. Place screenshots in **`public/projects/`**
2. Filename must match the `image` field in `src/data/projects.ts`
   e.g. `image: '/projects/myapp.png'` → `public/projects/myapp.png`
3. Recommended size: 1200 × 630 px

### Resume
- Replace **`public/resume.pdf`** with your file — the resume button in About links here.

---

## Theming

All design tokens live in `src/index.css` inside the `@theme {}` block. The `[data-theme="light"]` block immediately below overrides those tokens for light mode. Dark / light preference is persisted to `localStorage`.

Change the accent color once to repaint the entire site:

```css
@theme {
  --color-accent-primary:   #6366f1;  /* ← your brand color */
  --color-accent-secondary: #818cf8;  /* ← hover / gradient variant */
}
```

---

## Project Structure

```
src/
  components/
    Navbar.tsx          # Fixed nav · scrollspy highlighting · theme toggle · hamburger
    StarField.tsx       # Reusable animated star background (seed prop for unique patterns)
  sections/
    Intro.tsx           # Hero · gradient name · CTA buttons · social icons
    About.tsx           # Two-column · photo · bio · social buttons     ← edit bio here
    Experience.tsx      # Work experience cards (WORK_ENTRIES array)   ← edit jobs here
    Education.tsx       # Education cards (EDU_ENTRIES array)          ← edit school here
    TechStack.tsx       # Categorized skill pill grid
    Projects.tsx        # Filterable project cards (web / ml / tools)
    Contact.tsx         # Contact info · mailto form · footer
  data/
    projects.ts         # ← Edit projects here
    techStack.ts        # ← Edit skills here
  App.tsx               # Root: IntersectionObserver scrollspy + theme state + layout
  main.tsx              # React DOM entry
  index.css             # TailwindCSS 4 @theme tokens · light mode overrides · animations
public/
  assets/               # profile.jpg · company/school logos
  projects/             # project screenshots (1200×630 recommended)
  resume.pdf            # downloadable resume
index.html              # HTML shell + SEO meta tags
vite.config.ts          # Vite + TailwindCSS vite plugin
```

---

## Deployment

### Vercel (recommended)
1. Push this repo to GitHub
2. Import into [vercel.com](https://vercel.com)
3. Build command: `npm run build` · Output dir: `dist`
4. Click Deploy

### Netlify
Same — build command `npm run build`, publish directory `dist`.

---

## Accessibility

- Semantic HTML5 landmarks (`nav`, `main`, `section`, `footer`)
- "Skip to content" link (visible on keyboard Tab)
- `aria-label`, `aria-current`, `aria-expanded` on all interactive elements
- `prefers-reduced-motion` respected via CSS media query
- Keyboard-navigable with visible focus rings throughout
