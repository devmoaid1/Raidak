# Raidak (ريدك) - Follow-Up Execution Plan

This document contains the strict, isolated tasks required to correct the current codebase execution based on the Architect's review. You must execute these exact steps flawlessly. Do not modify other functional logic unless instructed.

## Phase 1: Total Light-Theme Enforcement & Palette Injection

### Task 1.1: Obliterate Dark Mode
- **Action**: Open `raidak/app/globals.css`.
- **Execution**: Completely delete the `.dark { ... }` block. Ensure there are no CSS rules pertaining to dark mode (e.g., removing any `@media (prefers-color-scheme: dark)` or `@variant dark`).
- **Layout Scrub**: If a Theme Provider or a Dark/Light toggle exists in `raidak/components/layout/Navbar.tsx` or `raidak/app/layout.tsx`, delete it. The app must force Light Mode universally.

### Task 1.2: Inject Raidak Marine/Turquoise Palette
- **Action**: Modify the `:root` variables in `raidak/app/globals.css`.
- **Execution**: Replace the black/white/zinc default variables with the following specific HSL values extracted from the design:
  - `--primary`: `200 80% 15%` (Deep Marine Blue)
  - `--secondary`: `182 83% 43%` (Vibrant Turquoise/Cyan)
  - `--accent`: `168 53% 92%` (Light Seafoam/Mint)
  - `--background`: `0 0% 100%` (Pure White)
  - `--primary-foreground`: `0 0% 100%`
  - `--secondary-foreground`: `0 0% 100%`
  - Ensure `--card` remains white, and map `--ring` to `--primary`.

## Phase 2: Live Firebase Binding

### Task 2.1: Authenticate Environment
- **Action**: You must discard the mock CLI setup.
- **Execution**: Instruct the host/user to run `firebase login` if not authenticated. Once verified, run `firebase use Raidak` (or the exact hosted Project ID) targeting their real account.

### Task 2.2: Hardcode Live Config
- **Action**: Configure `raidak/src/lib/firebase/config.ts`.
- **Execution**: Extract the exact SDK configuration keys from the Firebase console of the active project and implant them into the `initializeApp` configuration block. Do not use generic string placeholders.

## Phase 3: Missing Auth Interfaces & Route Integrity

### Task 3.1: Build Login & Sign-Up Screens
- **Action**: Create `raidak/app/(auth)/login/page.tsx` and `raidak/app/(auth)/signup/page.tsx` utilizing Next.js route groups.
- **Execution**: Build visually stunning, minimalist interfaces using `--primary` for buttons. Implement Firebase Email/Password Auth logic.

### Task 3.2: Fix 404 "تحليل السوق" & Navigation Integrity
- **Action**: Audit `components/layout/Navbar.tsx` and application routing.
- **Execution**: 
  - The link for "تحليل السوق" (Market Analysis) is currently returning a 404. Identify the target route and build the requisite `app/market-analysis/page.tsx` placeholder or fix the `href` if the page exists elsewhere (e.g., dashboard).
  - Verify **every single link** and `href` across the entire application (navbar, footer, hero buttons). Ensure zero dead links remain. Ensure state logic functions perfectly across multiple pages.

## Phase 4: Validation & Quality Control (MANDATORY)

### Task 4.1: Linting & E2E Testing
- **Execution**: After completing Phases 1-3, you must run `npm run lint`.
- **Requirement**: Resolve every single linter error and TypeScript strictness warning. You are not allowed to deploy code with warnings.
- **Functional Testing**: Spin up the local environment (`npm run dev`) and manually test all screens, buttons, and API logic to ensure functionality. 

## Phase 5: Build & Final Deployment

### Task 5.1: Production Build
- **Execution**: Run `npm run build`. Ensure a flawless build with zero hydration mismatches or compilation errors.

### Task 5.2: Firebase Deploy
- **Execution**: Run `firebase deploy --only hosting` to push the verified, localized application live to the attached Raidak project.

---
*Senior Architect Note*: Execute these steps sequentially. You must prove functional testing and clean linting at Step 4 before advancing to Step 5.
