# Raidak (ريدك) - Project Specification

## 1. Project Overview
Raidak (ريدك) is a premium, intelligent, and localized real estate valuation platform designed exclusively for the Saudi market. Aligning with the aesthetics and digital transformation goals of Saudi Vision 2030, the platform evaluates properties based on core basics, location analytics, investment potential, and sustainability scores. The goal is to provide an elite user experience through flawless UI/UX, localized terminology, and dynamic design.

## 2. Functional Requirements
- **Authentication**: Firebase-based Email/Password authentication. Protected routes must ensure that only authenticated users can access the dashboard and valuation tools.
- **Localization**: 100% Professional Arabic interface. Strict RTL (Right-to-Left) layout across all devices using CSS logical properties.
- **Mock AI Valuation Engine**: Deterministic valuation and scoring mechanism reading from a local static JSON dataset (`src/data/market_data.json`) covering at least 20 major Saudi cities.
- **Responsive Design**: Mobile-first architecture that easily scales to large desktop displays without sacrificing usability or aesthetics.
- **Data Visualization**: Deliver an interactive simulation of heatmaps and comparative property data structured within a high-end Bento-box style layout.

## 3. Detailed Screen Descriptions

### 3.1. Landing Page
- **Hero Section**: High-impact visuals with a clear, engaging value proposition and a premium search/entry bar (Call to Action: "ابدأ التقييم", "تسجيل الدخول").
- **Features Highlight**: Elegant grid showcasing the platform's core capabilities (Smart Valuation, ROI Projections, Sustainability).
- **Aesthetics**: Glassmorphism elements, curated color palettes (Blues and Greens), subtle micro-animations on hover, and a highly polished corporate feel.

### 3.2. Multi-Step Valuation Wizard (Form)
A 4-step progressive disclosure form with robust state management to preserve user progress seamlessly.
1. **الأساسيات (Basics)**: Property type, age, total area (m²), number of rooms/floors.
2. **الموقع (Location)**: Selective dropdowns or an interactive map-picker for City (20+ cities) and District.
3. **الاستثمار (Investment)**: Current rental income, intended holding period, and purpose of purchase.
4. **الاستدامة (Sustainability)**: Checkboxes/switches for green features (e.g., solar panels, smart home technology, insulation, water saving).

### 3.3. Analysis Dashboard (Bento-Grid)
- **Layout**: Modern Bento-grid displaying comprehensive, multifaceted valuation results compactly.
- **Smart Valuation (التقييم الذكي)**: Prominent display of the estimated property value formatted in SAR.
- **ROI Projections (توقعات العائد على الاستثمار)**: Data visualizations (Charts/Graphs) projecting 5-10 year value appreciation and anticipated rental yields.
- **Sustainability Score (مؤشر الاستدامة)**: A visual gauge or metric summarizing the property's eco-friendliness and alignment with green building practices.

### 3.4. Interactive Analytics
- **Heatmaps**: A simulated spatial mapping visual indicating high-value or high-demand zones using smooth gradients and interactive nodes.
- **Property Comparisons**: Side-by-side metric comparisons of the assessed property against the district / city average.

## 4. Data Schema (`src/data/market_data.json`)

The entire application relies on a comprehensive, localized mock database containing the necessary metrics to compute values. 

```json
{
  "cities": [
    {
      "id": "riyadh",
      "name_ar": "الرياض",
      "districts": [
        {
          "id": "al_malqa",
          "name_ar": "الملقا",
          "base_price_sqm": 8500,
          "demand_index": 0.95,
          "roi_annual_percent": 6.5,
          "sustainability_baseline": 70
        }
      ]
    }
  ],
  "property_types": [
    {
      "id": "villa",
      "name_ar": "فيلا",
      "multiplier": 1.2
    },
    {
      "id": "apartment",
      "name_ar": "شقة",
      "multiplier": 0.85
    }
  ],
  "sustainability_features": [
    {
      "id": "solar",
      "name_ar": "طاقة شمسية",
      "score_boost": 15
    }
  ]
}
```
*Note: The final implementation of the JSON must be fully populated with approximately 20 major cities and their core districts to provide a realistic demonstration of the platform's intelligence.*
