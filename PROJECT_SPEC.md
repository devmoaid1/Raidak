# Raidak (رائدك) - Saudi Aqar AI Project Specification

## 1. Project Overview
**Raidak (رائدك) للتنمية العقارية المستدامة** is a sophisticated web platform designed to empower users in the Saudi Arabian real estate market. The platform allows users to evaluate properties and analyze investments using specific geographic and environmental data, providing "intelligent" recommendations to increase property value through sustainability standards and market trends (aligned with Saudi Vision 2030).

## 2. Functional Requirements
- **Authentication**: Secure user entry and route protection system powered strictly by Firebase Auth (Email/Google).
- **Data-Driven Logic**: An analysis engine entirely powered by a static `market_data.json` file containing metrics for key Saudi districts (e.g., Riyadh, Jeddah). Metrics include average price per $m^2$, growth rates, and Vision 2030 future projects impact.
- **Dynamic Valuation**: Real-time calculation of "Fair Market Price" based on (Area * District Rate), adjusted for property age and specific features.
- **Sustainability Engine**: A scoring system evaluating the property's environmental impact, providing cost-saving recommendations and value increments.
- **Comparison Logic**: Functionality to compare current input data against static benchmark records stored within the system.

## 3. Core Features
- **Smart Valuation**: Displays the estimated fair price and provides a visual comparison against the local district average.
- **Investment Index**: Projects a 5-year ROI (Return on Investment) percentage and assigns a Risk Level (Low, Medium, High).
- **Sustainability Index**: Evaluates eco-efficiency and offers "Smart Tips" (e.g., "Installing solar panels may increase property value by 5-8%").
- **Location Analysis**: A simulated heatmap/map interface visualizing growth zones and risk areas based on proximity to major infrastructure projects.

## 4. Screens & UI Architecture
### A. Landing Page
- Prominent search bar for "District Name" or "Deed Number."
- Quick-action cards for primary services (Valuation, Investment, Sustainability).
- Interactive map placeholder and a "How it Works" section.

### B. Authentication Screens
- Clean, localized Login and Sign-up pages with user roles (Investor, Developer, Buyer).

### C. Multi-Step Valuation Form (Input)
- **Step 1 (Basics)**: City, District, Property Type, Area, Age, and Room Count.
- **Step 2 (Location)**: Proximity to schools, public services, and main transport arteries.
- **Step 3 (Investment)**: Expected purchase price and primary goal (Residency, Investment, or Rental).
- **Step 4 (Environment)**: Toggles for thermal insulation, solar panels, water-saving systems, and estimated electricity usage.

### D. Analysis Dashboard (Output)
- **Price Card**: Current valuation with a comparative bar chart.
- **Investment Card**: ROI projections and risk badges.
- **Sustainability Card**: Ecological score and dynamic improvement tips.
- **Comparison Section**: An interactive table comparing the user's property against 2-3 market benchmarks.

## 5. Technical Constraints
- **Stack**: Next.js (App Router), Tailwind CSS, Lucide-React (iconography).
- **Language & Layout**: Primary UI strictly in Arabic with full RTL (Right-to-Left) support grid/layout patterns.
- **Database Simulation**: All real estate metrics, market data, and AI responses must be mocked and reside exclusively in `src/data/market_data.json`. No external DB (except Firebase Auth) or real AI endpoints are permitted.
- **State Management**: React Hooks/Context for managing the multi-step form data flow across components.
- **Design Language**: Modern, minimalist, and professional (Vision 2030 aesthetic), premium glassmorphism/cards concepts where applicable.
