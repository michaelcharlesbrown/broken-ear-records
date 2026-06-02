# Broken Ear Records — Claude Code Project Brief

Next.js App Router · Tailwind 4 · No database, no auth, no e-commerce

---

## Workflow

- Work directly on `main`. Do not use git worktrees — the dev server watches
  the project root only.
- Dev server: always port 3001. Claude is responsible for starting it at the
  top of each session. Kill any existing process on 3001 first (`lsof -ti :3001 | xargs kill -9`), then start via `npm run dev` in the background.
- Browser verification: always use Claude in Chrome. Never use the Claude
  Preview tools (preview_screenshot, preview_snapshot, etc.) — they cause
  severe lag in the desktop app and make the chat unusable.
- Do not add dependencies without asking.
- Do not rename, move, or delete files without explicit instruction.

---

## Do Not Touch

These are protected. Do not modify without explicit instruction:

- Meta Pixel / fbq code (layout.tsx + lib/analytics.ts + api/meta/event)
- Google Analytics / gtag (layout.tsx + @next/third-parties)
- Newsletter API route (api/newsletter/subscribe)
- Script tags in layout or head
- Link pages (/artists/[slug]/links) — do not change URL slugs or structure

If a task requires touching any of the above, stop and ask first.

---

## Typography

Single source of truth: `:root` custom properties in globals.css.

| Token              | Use                        |
|--------------------|----------------------------|
| `--text-hero`      | h1                         |
| `--text-heading`   | h2                         |
| `--text-subheading`| h3                         |
| `--text-nav`       | nav links, labels, CTAs    |
| `--text-body`      | body text (0.75rem / 12px) |
| `--text-small`     | small text (same for now)  |

Rules:
- All heading styles live in `@layer base` using these tokens.
- Do not use Tailwind text-size classes (`text-sm`, `text-base`, etc.) for
  font sizing — they are not overridden and will produce wrong results.
- Any new font-size must reference a `--text-*` token.
- Two fonts: IBM Plex Mono (body), Bebas Neue (headings/nav). No others.
- The site is light/paper-only. No dark mode.

---

## Heading Hierarchy

- One H1 per page. Listing pages use sr-only H1s; detail pages use visible H1s.
- Levels never skip (H1 → H2 → H3).
- Footer newsletter H2 appears on every page via layout — do not duplicate.
- MediaCard renders H2 for item titles on listing grids — intentional.
- Do not change sr-only H1s to visible without explicit instruction.

---

## Visual System

- Paper blocks: `data-paper-block` / `data-paper-nav` with `data-cut` variants.
- Scissor-cut edges: `cutVariant()` generates deterministic clip-path (1–8).
- Hover: paper blocks invert (light→dark) on hover via CSS `:has()`.
- Site shell: `data-site-shell` caps content at 1200px.
- Container component defaults to 1800px max-width but the shell is the
  actual constraint — keep them aligned or use Container's `maxWidth` prop.

---

## Project Structure

```
app/
  layout.tsx          — root layout, fonts, analytics, footer
  page.tsx            — home (latest release hero)
  about/page.tsx      — full-bleed dark about page
  artists/page.tsx    — artist grid (MediaCard)
  artists/[slug]/     — artist detail + /links subpage
  releases/page.tsx   — release grid (MediaCard)
  releases/[slug]/    — release detail
  api/meta/event/     — Meta CAPI proxy (protected)
  api/newsletter/     — MailerLite proxy (protected)
components/
  Header.tsx          — logo + nav
  NewsletterSignup.tsx— footer email form
  MediaCard.tsx       — artist/release grid cards
  ArtistLinksHub.tsx  — link-in-bio page
  LinkButton.tsx      — external link with analytics
  artists/            — ArtistBio, ArtistPageShell, ArtistSocialLinks
  releases/           — ReleaseLinks
  ui/                 — Container, Typography (class constants)
data/
  artists.ts          — artist content + socials
  releases.ts         — release content + buy/stream links
lib/
  analytics.ts        — outbound click tracking (GA4 + fbq + CAPI)
  cutVariant.ts       — deterministic clip-path seed
```
