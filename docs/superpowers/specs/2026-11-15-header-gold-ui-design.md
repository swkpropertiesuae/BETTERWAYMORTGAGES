# Short Design: Midnight Navy Header & Sovereign Gold UI Palette (`swk.property`)

## Intent & Why
Align **Betterway Mortgages** (`https://github.com/swkpropertiesuae/swk.property`) with its **Sovereign Gold (`#D7B04E`) & Midnight Banking Navy (`#021125`)** Master Brand Kit logo—making the header fit the horizontal white-and-gold lockup prominently like the reference screenshot, and retiring leftover emerald-teal (`#08816C`) in favor of a refined Midnight Navy, White/Alabaster, and measured Sovereign Gold UI palette.

## Goals, Non-Goals & Anti-Goals
- **Goals:**
  1. **Header fit & styling:** Sticky `#021125` Midnight Banking Navy bar (`84–88px` desktop height) displaying `/brand/logo-white.svg` generously (`44–48px` tall, `~260–280px` wide) without cramping; tracked uppercase `HOME` + mega-menu triggers (`MORTGAGES`, `RATES`, `CALCULATORS`, `OFF-PLAN`, `AREAS`, `RESOURCES`) in crisp off-white with `#D7B04E` Sovereign Gold active/open states; matching `#021125` mega-menu dropdown and mobile drawer; dark-styled alert bell + `العربية` toggle; and a solid `#D7B04E` gold `CONTACT US` pill button with bold `#021125` text. Mirror the dark/gold header on `/ar`.
  2. **UI color balance ("a bit of gold"):** Pair crisp White and Institutional Alabaster (`#F8F9FA`) page surfaces with Midnight Banking Navy (`#021125`) headings/buttons and restrained gold accents—using `#D7B04E` on dark grounds, button discs, active chips, and chart highlights, and deeper `#A67C21` / `#8A6518` (with warm ivory `#FAF3E0` tint) for eyebrows, inline rate callouts, tags, and icons on light backgrounds.
- **Non-goals:** Changing any of the 360+ URLs, CBUAE mortgage formulas, page copy, photography, or mega-menu link structure.
- **Anti-goals:** Large gaudy gold backgrounds on light sections, low-contrast white text on gold buttons, header wrapping at mid-desktop widths, or leftover emerald-green glows/strokes in charts and dialogs.

## Constraints
- Clone `https://github.com/swkpropertiesuae/swk.property` into `C:/Users/shamh/.gemini/antigravity/scratch/swk.property` (and copy this spec into `docs/superpowers/specs/`).
- Production Next.js static export, TypeScript check, existing 12 unit/route tests, and internal link scan must all pass.
- Accessible contrast: solid `#D7B04E` gold pills always use `#021125` dark navy text; gold text/links on white or `#F8F9FA` use `#A67C21` / `#8A6518`.

## Approaches
- **Approach 1 — Global `@theme` token remap + dark Midnight Navy header (Selected):** Remap the shared `@theme` variables (`navy`, `obsidian`, `brass`/`gold`, `teal` → `#A67C21`, `teal-700` → `#8A6518`, `teal-50` → `#FAF3E0`, `mint` → `#D7B04E`) in `src/app/globals.css`, sweep hardcoded emerald hexes in `brand.css`, `globals.css`, `startup.css`, and `StartupExperience.tsx`, and restyle the English and Arabic headers. Updates all 360+ routes cohesively in one pass.
- **Approach 2 — Neutralize global tokens & hand-place gold on homepage only (Rejected):** Leaves inner calculators, bank rate tables, and Arabic pages monochrome or requires dozens of per-route edits.

## Decisions & Builder Defaults
- **Confirmed by you:** Keep the 6-category mega-menu dropdowns alongside `HOME`, `العربية`, and a gold `CONTACT US` pill in the new dark/gold header style; use Approach 1 for the global palette.
- **Builder calls:**
  - Desktop nav switches from mobile drawer at `1200px` (`min-[1200px]`) so the larger logo + `HOME` + 6 uppercase items + bell + `العربية` + `CONTACT US` pill never wrap or collide.
  - Top announcement bar (`UtilityBar`) uses deeper `#010915` obsidian with a subtle `1px` bottom hairline so the `#021125` header frame reads cleanly beneath it.
  - Standard `.btn-primary` on light cards/forms uses Midnight Navy (`#021125`) with subtle gold hover/focus accents, while `.btn-gold` (header `CONTACT US` pill and dark-surface CTAs) uses solid `#D7B04E` with `#021125` text—keeping gold refined rather than overpowering.
