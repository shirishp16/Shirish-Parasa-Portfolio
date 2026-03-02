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

All placeholder text is marked with `// TODO:` comments. Quick map:

### Name & tagline
- **`src/sections/Intro.tsx`** — change `"YOUR NAME"` and the tagline `<p>`.
- **`src/components/Navbar.tsx`** — change the `"YN"` initials and `"YOUR NAME"` brand text.
- **`index.html`** — update `<title>` and all `og:` / `twitter:` meta tags.

### About / bio
- **`src/sections/About.tsx`** — replace the two `<p>` paragraphs and the `HIGHLIGHTS` array.

### Education & Experience
- **`src/sections/Timeline.tsx`** — edit the `ENTRIES` array.
  Each entry has: `institution`, `role`, `period`, `location`, `description[]`, `coursework?`

### Skills / Tech Stack
- **`src/data/techStack.ts`** — edit the `techStack` array.
  `icon` values are [Iconify](https://icon-sets.iconify.design/) IDs (e.g. `logos:react`).

### Projects
- **`src/data/projects.ts`** — edit the `projects` array.
  Each project has: `title`, `description`, `image`, `tech[]`, `githubUrl?`, `demoVideoUrl?`, `liveUrl?`, `category`

### Contact info & social links
- **`src/sections/Contact.tsx`** — update the `CONTACT_INFO` array and the `mailto:` URL inside `handleSubmit`.
- **`src/sections/Intro.tsx`** — update the `SOCIALS` array (hero social icons).

---

## Adding Images

### Profile photo
1. Place your photo at **`public/assets/profile.jpg`**
2. Recommended: square crop, ≥ 400 × 400 px
3. A gradient fallback shows automatically if the file is missing

### Project screenshots
1. Place screenshots in **`public/projects/`**
2. Filename must match the `image` field in `src/data/projects.ts`
   e.g. `image: '/projects/ecommerce.png'` → `public/projects/ecommerce.png`
3. Recommended size: 1200 × 630 px

### Resume
- Place your PDF at **`public/resume.pdf`** — the "Download Resume" button links here.

---

## Theming

All design tokens are in `src/index.css` inside the `@theme {}` block.
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
    Navbar.tsx          # Fixed nav · scrollspy highlighting · hamburger menu
  sections/
    Intro.tsx           # Hero · gradient name · CTA buttons · social icons
    About.tsx           # Two-column · photo · bio · highlights · resume link
    Timeline.tsx        # Vertical timeline · education + experience cards
    TechStack.tsx       # Categorized skill pill grid
    Projects.tsx        # Filterable project cards (web / ml / tools)
    Contact.tsx         # Contact info · mailto form · footer
  data/
    projects.ts         # ← Edit projects here
    techStack.ts        # ← Edit skills here
  App.tsx               # Root: IntersectionObserver scrollspy + layout
  main.tsx              # React DOM entry
  index.css             # TailwindCSS 4 @theme tokens + base styles
public/
  assets/               # profile.jpg
  projects/             # project screenshots
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
