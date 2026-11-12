# Kahani London: cinematic website prototype

A scroll-driven redesign of [kahanilondon.com](https://www.kahanilondon.com/), built as one continuous film in nine chapters, plus ten supporting pages.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to /out, deployable to any CDN
```

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3.15 (ScrollTrigger, SplitText) · Lenis · Lucide. One typeface: Google Sans Flex (variable weight, width and optical size).

## The homepage, chapter by chapter

| # | Chapter | Desktop motion | Mobile |
|---|---|---|---|
| 01 | The opening | Photo surfaces from black, KAHANI rises through a letter mask; on scroll the frame pushes in, letters drift apart and wipe away, the definition of the word appears | Gentle scrubbed zoom, no pin |
| 02 | The meaning | Pinned. Headline written by the scroll while a spice image widens from 35% to 70% under the type | Line reveals, image reveal |
| 03 | The origin | Pinned master timeline: four chapters (Chennai, his mother's kitchen, the markets, London) crossfade with counter, progress and background tone | Stacked chapters |
| 04 | The craft | Pinned. Fire strip rises and opens to full frame; FIRE, FLAVOUR, FINESSE arrive with their images; image slides left, philosophy enters | Stacked images with different mask directions |
| 05 | The menu | Pinned horizontal film of four dishes from the current menu, ending on an interactive index of every menu | Native swipe rail |
| 06 | The experience | Dining room opens from an inset mask; restaurant, bar and occasion each get their own composition | Same compositions, stacked |
| 07 | The chef | Pinned. Portrait enters through a diagonal mask, name moves independently, biography in short lines | Portrait, name, bio |
| 08 | Private dining | Pinned. Peacock Room opens from a narrow slit like curtains; facts, spends and enquiry follow | Full-bleed room |
| 09 | The invitation | Room darkens, headline rises, brass rule draws, reservation appears; footer rises after | Same, scrubbed |

All animations respect `prefers-reduced-motion` (no pins, no parallax, simple fades). Smooth scrolling (Lenis) is used on desktop pointers only; touch devices keep native scrolling.

## Content and assets

- **Every photograph is official Kahani photography** from the existing site, listed with subject, source page and placement in `src/data/assets.ts`.
- **No official video exists** on the current site, so the hero uses photography with cinematic motion. Add a client clip to `heroVideo` in `assets.ts` to switch it on.
- Copy marked VERIFIED in `src/data/content.ts` is reproduced from the live site. Menu dishes in `src/data/menus.ts` are transcribed from the October 2026 PDF menus.
- Seasonal menus (Christmas, New Year's Eve, festive, Diwali) are date-gated and disappear automatically when they expire.
- Restaurant details (address, hours, phone, email, booking URL, minimum spends) live once in `src/data/site.ts`.

### Self-hosting images (recommended before launch)

Images currently load from the official `wp-content/uploads` directory. To serve them from this site instead:

```bash
npm run mirror-assets
NEXT_PUBLIC_ASSET_MODE=local npm run build
```

## Booking and forms

- "Reserve" opens a panel that links to the official OpenTable booking page (`/reservation/` on the current site), plus call and email. No booking API is invented.
- The private dining enquiry form validates in the browser and opens a pre-filled email to reservations. Connect it to the restaurant's CRM or OpenTable private dining form for production.

## To confirm with the client before launch

1. Opening times, minimum spends and menu PDFs (the current site has some inconsistencies).
2. Whether higher-resolution originals and any video footage are available.
3. Pixel sizes of images marked `verify` in the manifest.
4. The production enquiry endpoint and analytics.
