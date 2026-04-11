# Raidak (ريدك) - Project Specification

## 1. Project Overview
**Raidak (ريدك)** is a premium, intelligent, and localized real estate platform designed exclusively for the Saudi market. It combines an AI-driven valuation engine with a discovery ecosystem that aligns with **Saudi Vision 2030**. The platform focuses on property transparency, sustainability scores, and future urban development, providing an elite experience through a Bento-box UI, localized terminology, and interactive spatial data.

---

## 2. Functional Requirements

### 🔐 Authentication
*   **Provider**: Firebase-based Email/Password authentication.
*   **Security**: Protected routes for the dashboard and valuation tools.

### 🌍 Localization & RTL
*   **Interface**: 100% Professional Arabic interface.
*   **Layout**: Strict RTL (Right-to-Left) layout using CSS logical properties (`start`, `end`, `ms`, `pe`).

### 🤖 Valuation Engine (Mock AI)
*   **Mechanism**: Deterministic valuation and scoring mechanism.
*   **Data Source**: Reads from a local static JSON dataset (`src/data/market_data.json`).
*   **Coverage**: 20+ major Saudi cities.

### 🗺️ Interactive Mapping
*   **Provider**: Integration with Google Maps API.
*   **Features**: Visualize properties, sustainability zones, and future developmental projects.

### 📱 Responsive Design
*   **Philosophy**: Mobile-first architecture scaling to desktop.
*   **Aesthetic**: Polished, minimalist corporate aesthetic.

---

## 3. Screen Specifications

### 3.1 Explore Page (Home)
*   **Hero Search**: A prominent search bar at the top with the placeholder: `"ابحث عن عقارك..."`.
*   **Quick Categories**: Icons for rapid filtering: (Residential 🏠, Commercial 🏢, Land 🗺️).
*   **Sustainability Badges**: Featured property cards displaying a green "tag" or "badge" for:
    *   **Green Property** / عقار أخضر
    *   **Energy Efficient** / موفر للطاقة
*   **Floating Navigation**: A floating "Map" button at the bottom for instant transition to the interactive map view.

### 3.2 Interactive Map (The "Brain" Interface)
*   **Geospatial View**: Real-world mapping integration (specifically targeting cities like Qunfudhah).
*   **Smart Filters**:
    *   **Sustainability Filter**: When active, only green property icons are displayed.
    *   **Future Filter**: Displays light blue shaded polygons representing zones near upcoming developmental projects or the new Qunfudhah Waterfront.
*   **Quick-View Card**: Tapping a map pin opens a card showing:
    *   Property price.
    *   Estimated percentage of electricity bill savings.

### 3.3 Multi-Step Valuation Wizard
A 4-step progressive disclosure form with state management:
1.  **Basics (الأساسيات)**: Property type, age, total area (m²), number of rooms/floors.
2.  **Location (الموقع)**: Dropdowns or map-picker for City (20+ cities) and District.
3.  **Investment (الاستثمار)**: Current rental income, intended holding period, and purpose of purchase.
4.  **Sustainability (الاستدامة)**: Selection of green features (e.g., solar panels, thermal insulation, water recycling).

### 3.4 Property Details & Analysis (Bento-Grid)
*   **Visuals**: High-end image gallery of the interior and exterior.
*   **AI Price Gauge**: A color-coded visual scale indicating:
    *   `Fair Price` ✅
    *   `Below Market`
    *   `Above Market`
*   **Raidak Green Report**:
    *   **Insulation**: "Thermal insulation efficiency: 90%".
    *   **Water**: "Supports greywater recycling (Garden Irrigation)".
    *   **Savings**: "Estimated 35% reduction in electricity bills".
*   **ROI Projections**: 5-10 year appreciation charts and anticipated rental yields.

### 3.5 Add Property (Seller Dashboard)
*   **Standard Listing**: Fields for basic property data.
*   **Sustainability Audit**: Optional fields for green features (e.g., Is there insulation? Double-glazed windows?).
*   **Incentivization**: Displaying a prompt: *"Completing these details grants your property the Sustainability Badge and boosts its search ranking."*

---

## 4. Data Schema (`src/data/market_data.json`)
The platform utilizes a comprehensive mock database for its intelligence:

```json
{
  "cities": [
    {
      "id": "qunfudhah",
      "name_ar": "القنفذة",
      "districts": [
        {
          "id": "al_shati",
          "name_ar": "الشاطئ",
          "base_price_sqm": 4500,
          "demand_index": 0.95,
          "roi_annual_percent": 6.5,
          "sustainability_baseline": 70
        }
      ]
    }
  ],
  "property_types": [
    { "id": "villa", "name_ar": "فيلا", "multiplier": 1.2 },
    { "id": "apartment", "name_ar": "شقة", "multiplier": 0.85 }
  ],
  "sustainability_features": [
    { "id": "solar", "name_ar": "طاقة شمسية", "score_boost": 15 },
    { "id": "insulation", "name_ar": "عزل حراري", "score_boost": 20 }
  ]
}
```

