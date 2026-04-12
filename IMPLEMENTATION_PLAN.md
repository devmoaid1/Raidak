# Raidak (ريدك) - Implementation Plan (Revised)

This is a phased, step-by-step roadmap for building the Raidak platform. This guide focuses strictly on theming, correcting the Firebase linkage to your active account, building authentication paths, and executing the core features.

---

## Phase 1: Environment Audit & Project Theming

### 1.1 Project Theming (Strict Light Theme & Custom Palette)
- **Primary Action**: **Completely remove** any Dark Theme variants (e.g., standard `.dark` block) from `app/globals.css`. Do not configure any Dark Theme toggle. The application must render exclusively in Light Mode to preserve brand consistency.
- **Theme Variables**: Update `app/globals.css` with the custom **Raidak Color Palette** derived from the provided UI image. Define specific HSL variables ensuring the overarching generic Zinc palette is overridden where appropriate:
  - `primary`: Deep Marine Blue (e.g., `#032c3f` / HSL `200 80% 15%`)
  - `secondary`: Vibrant Turquoise/Aqua (e.g., `#13C5CA` / HSL `182 83% 43%`)
  - `accent`: Light Seafoam/Mint (e.g., `#e0f4f0` / HSL `168 53% 92%`)
- **Tailwind Config**: Edit `tailwind.config.ts` (if applicable, otherwise directly in CSS v4 variables) to extend the custom color palette, incorporate professional Arabic fonts (e.g., `Cairo`, `Inter`, `Tajawal`), and **disable** `darkMode`.
- **RTL & Logical Properties Control**: Ensure `app/layout.tsx` enforces `dir="rtl"` within the `<html>` tag.

### 1.2 `shadcn/ui` RTL Audit
- **RTL Overhaul**: Review all `shadcn/ui` components located in `components/ui/`.
- **Action**: Replace all physical directional utility classes (e.g., `pl-4`, `mr-2`, `border-l-2`) with **Tailwind Logical Properties** (e.g., `ps-4`, `me-2`, `border-s-2`).

### 1.3 Firebase Integration & Account Binding
- **Project Binding**: Execute a hard link to your actual Firebase account. Run `firebase login` and `firebase use` to bind the local directory explicitly to the pre-existing "Raidak" project.
- **Configuration Scaffolding**: Recreate `src/lib/firebase/config.ts` and embed the real, live SDK config keys assigned to your active `Raidak` web app.
- **Auth Provider Setup**: Create `src/providers/AuthProvider.tsx` using React Context for Email/Password logic, wrapping the core layout.
- **Firebase Hosting setup**: Initialize or adjust Firebase Hosting configurations ensuring Next.js static or Web Frameworks outputs deploy accurately.

### 1.4 JSON Data Integration (Mock AI)
- **File Validation**: Ensure `src/data/market_data.json` is correctly populated with ~20 cities and key districts.

---

## Phase 2: Core Layout & Authentication Pages

### 2.1 Base Layout Construction
- **Color-Aware Navbar**: Create `components/layout/Navbar.tsx`. Implement a responsive header incorporating glassmorphism (`backdrop-blur`). Remove any pre-existing Dark Mode toggles. Ensure the logo (`start`) and Auth triggers (`end`) are elegantly styled in the new Marine/Turquoise palette.
- **Footer**: Create `components/layout/Footer.tsx` housing localized corporate links.

### 2.2 Authentication UI Construction
- **Login Page (`app/login/page.tsx`)**: Build a beautiful, minimal Login screen using the Marine Blue primary colors. Provide Email and Password fields, and a "تسجيل الدخول" button. Include a link to the sign-up page.
- **Sign-Up Page (`app/signup/page.tsx`)**: Build the Registration screen ("إنشاء حساب") demanding Email and Password, consistently styled alongside login parameters. Map both to Firebase Auth capabilities.

---

## Phase 3: Landing Page & Multi-Step Valuation Form

### 3.1 Landing Page Implementation (`app/page.tsx`)
- **Hero Section**: Build an expansive hero component utilizing dynamic Marine Blue / Turquoise gradients ensuring no stark blacks/whites overshadow the aesthetic. Incorporate bold Arabic typography and a prominent "ابدأ التقييم" primary Call-to-Action.
- **Features Showcase**: Highlight the strategic advantages within a polished Bento-style or 3-column layout leveraging the softer Seafoam/Mint accents.

### 3.2 Form State Management & UI (`app/valuation/page.tsx`)
- **Store Setup**: Define a React Context or `zustand` store (`src/store/valuationStore.ts`).
- **Steps Implementation**:
  - **Step 1 (الأساسيات - Basics)**: Text/Numeric fields handling Property Type, Age, Area.
  - **Step 2 (الموقع - Location)**: Chained dropdowns mapping City to District natively reading from `market_data.json`.
  - **Step 3 (الاستثمار - Investment)**: Fields evaluating Rental Income and expected holding periods.
  - **Step 4 (الاستدامة - Sustainability)**: Interactive `shadcn` Switch components distinctly tinted with the `secondary` (Turquoise) palette.

---

## Phase 4: Valuation Engine & Analysis Dashboard

### 4.1 Mock AI Logic & Loading UX
- **Logic Matrix**: Compute estimated pricing, ROI projections, and Sustainability scores based on inputs.
- **Visual Theatrics**: Display a professional, non-blocking loading overlay spinning with Marine Blue/Turquoise cues simulating valuation intelligence.

### 4.2 Dashboard Security & UI (`app/dashboard/page.tsx`)
- **Route Guarding**: Attach Server/Client protections to seamlessly redirect unauthorized visitors resolving to `/login`.
- **Bento-Grid Architecture**: Apply CSS Grid variables designing engaging "Bento boxes". Highlight final SAR valuations leveraging the `primary` (Marine Blue) motifs. Render an ROI chart, and display an eco-score ring.

---

## Phase 5: Final Polish & Firebase Deployment

### 5.1 Quality Assurance
- **RTL & Palette Audit**: Verify layout mirroring is faultless and that the strictly Light Theme turquoise/marine aesthetic is preserved universally.
- **System Integrity**: Run `tsc --noEmit` and `npm run build`.

### 5.2 Firebase Hosting Execution
- Command a standard Firebase Web Hosting deployment syncing all compiled properties. Validate configuration mappings bridge successfully to the active Firebase domain.
