# AGENTS.md

## Project Context
- Personal academic/professional portfolio for **Fatih Arda Zengin** (graduate researcher — battery Remaining Useful Life prediction & explainable AI, Sabancı University). Built from the `academic-portfolio-astro` template, now de-templated: `src/content/` holds real content, not demo data. If you see "Claude Shannon" anywhere, it's leftover template placeholder content that hasn't been migrated yet — flag it, don't assume it's intentional.
- **Deployment:** Cloudflare Workers, static assets only (`wrangler.jsonc`, `assets.directory: ./dist`) — no Cloudflare/SSR adapter needed or wanted, this is a plain `output: "static"` Astro build. Custom domain `fatihardazengin.com` is set as `site` in `astro.config.mjs` (no `base` path — deploys at domain root). The GitHub Pages Actions workflow was deliberately removed; do not re-add `.github/workflows/*pages*` — it conflicts with the Cloudflare deploy and with GitHub's own automatic Pages build check.
- **`blog` and `talks` sections are intentionally disabled** (`PAGES.blog.isActive = false`, `PAGES.talks.isActive = false` in `src/config/pages.ts`). Their content (`src/content/posts/*`, `src/content/talks/*`) is still unmigrated template demo content — don't re-enable until it's replaced with real posts/talks; ask the user first if a task seems to require it.
- `src/content/teaching/*` now holds real content (IE 303 - Decision Economics TA-ship at Sabancı University, Spring 2024–present).

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview build

## Requirements
- Node.js >= 22.12.0

## Architecture
- **Barrel files:** `src/config/index.ts`, `src/types/index.ts`
- **Content:** `src/content/` - Add `.md` files to subdirectories (posts/, publications/, projects/, talks/, teaching/)
- **Config:** `src/config/` - site.ts (SITE, THEME_CONFIG, SETTINGS, ANALYTICS), pages.ts (PAGES), navigation.ts (NAV_LINKS), social.ts (SOCIALS), themes.ts
- **Types:** `src/types/` - content.ts (Bio, CVItem, etc.), display.ts (ListingItem, DetailItem), config.ts, themes.ts
- **Styles:** `src/styles/global.css` - Theme colors, base styles
- **Assets:** `src/assets/icons.ts` - Icon definitions

## Key Constraints
- **No `<style>` in `.astro` files** - Use global.css and Tailwind classes in components
- **Two-column layout:** Left sidebar (sticky profile), Right main (scrollable content)
- **Markdown-driven:** All content in `.md` files with YAML frontmatter
- **Theme config:** Use `THEME_CONFIG` for theme settings (lightAndDark, themeLight, themeDark)

## Notes
- Tailwind CSS v4 uses `@tailwindcss/vite` plugin (no tailwind.config.js)
- LaTeX math rendering via remark-math/rehype-katex
- Analytics supported via GA4 (`ga4Id`) and Umami (`umami.websiteId`) — configure in `src/config/site.ts`
- No lint/typecheck scripts configured

## Known Fixes Applied (keep in sync when touching related code)
- `Navbar.astro` used to check `pageConfig?.active` (typo) instead of `.isActive`, so the navbar never actually respected `PAGES.<section>.isActive`. Fixed — `PAGES` now controls both route availability and nav visibility together. Any new nav-gated section should rely on this, not a separate flag.
- `src/utils/tags.ts` used to pull tags/content from every collection regardless of `PAGES.<section>.isActive`, producing dead links on `/tags` for disabled sections (e.g. `talks`, `blog`). Fixed via the local `getActiveCollection()` helper — wire any new collection through it the same way.
- `SETTINGS.addDevToolsInProduction` is `false` — `/dev-tools/*` pages already had a build-time `Astro.redirect("/404")` guard keyed off this flag; it's now actually off, so those routes aren't generated in production builds.
- Removed the template's `jobTitle: "Professor"` from the JSON-LD in `BaseLayout.astro` (inaccurate leftover) and the "Built with Academic Portfolio Astro" footer credit link.
- Added `public/_headers` with baseline security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) — Cloudflare picks this up automatically for the static deploy. No CSP yet (the theme-toggle script and `define:vars` styles are inline; a CSP needs nonces/hashes to not break them).

## Sandbox Limitations
This repo has been driven from a Claude Code CLI sandbox with **no Node/npm, no `gh` CLI, and no git push credentials** for `origin` (HTTPS remote, "could not read Username for 'https://github.com'"). Practical implications for a future agent session here:
- `git commit` works; `git push` does not — tell the user to push manually (VS Code Source Control or their own terminal) rather than assuming a push succeeded.
- Can't run `npm install`/`npm run build`/`npm audit` locally to verify changes — read code carefully instead of trusting a local build, and ask the user to run/paste build output (e.g. from the Cloudflare Workers Builds log) when verification matters.
- The last observed Cloudflare build log reported `npm audit`: 12 vulnerabilities (1 low, 2 moderate, 9 high) — unreviewed as of this writing. Worth running `npm audit` / `npm audit fix` on a machine with Node when picking this up.

## Suggested Next Steps (discussed, not yet done)
- Downloadable CV PDF linked from `/cv` (user has a `resume.pdf` to source from).
- Dedicated 1200×630 social-preview (OG) image — `SITE.ogImage` currently points at the small profile photo (`public/avatar.jpg`).
- Custom favicon (currently the template's generic default).
- Kaggle social link — no Kaggle SVG exists yet in `src/assets/icons/`; needs a new icon asset plus a `SOCIALS`/`SOCIAL_ICONS` entry in `src/config/social.ts`.
- Google Scholar / ORCID links once those profiles exist.
- Confirm the `fatihardazengin.com` custom domain is fully attached under the Cloudflare Worker's **Domains** tab.