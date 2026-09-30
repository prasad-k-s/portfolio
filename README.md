# Prasad Sankar – Portfolio

Personal portfolio built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4** and **Framer Motion**.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Updating content (no code changes needed)

All text lives in `src/data/`:

| File | What it controls |
| --- | --- |
| `profile.json` | Name, role/title, SEO title & description, resume link, social links |
| `navigation.json` | Navbar links (label + section id) |
| `hero.json` | Greeting, typewriter skills & speed, tagline, photo, buttons, particle settings |
| `about.json` | Intro paragraphs, "currently" lines, stat cards, "What I do" cards, hobbies |
| `skills.json` | Skill categories and each skill (name, logo key, brand color, or a custom image) |
| `experience.json` | Jobs: company, role, period, bullet points, tech used |
| `projects.json` | Projects: name, description, image, GitHub link, live URL, tech used |
| `contact.json` | Contact heading, message, button label, footer text |

Examples:

- **Add a skill to the typewriter:** add a string to `hero.json → typewriter.skills`.
- **Show your photo:** put the image in `public/images/` (e.g. `public/images/prasad.jpg`) and set `hero.json → photo.src` to `"/images/prasad.jpg"`. Leave it `""` to hide the photo (the hero then centers itself).
- **Resume:** put your PDF at `public/resume.pdf`.
- **Social icons:** supported `icon` values are `github`, `linkedin`, `email`, `x`, `website` (add more in `src/components/ui/icons.tsx`).
- **Colors:** change the CSS variables at the top of `src/app/globals.css`.

If you add a new field to a JSON file, add it to the matching type in `src/types/content.ts`.

## Project structure

```
src/
  app/            layout, page, global styles
  components/     Navbar, ThemeToggle, hero/ (Hero, Typewriter, ParticlesBackground), ui/
  data/           JSON content files  ← edit these
  lib/content.ts  loads + types the JSON
  types/          TypeScript types for the content
public/           images, resume.pdf
```

## Deploy

Push to GitHub and import the repo on https://vercel.com (free). Every push redeploys automatically.
