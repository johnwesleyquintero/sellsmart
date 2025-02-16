# SellSmart Analytics

A celestial web application designed to illuminate sales and marketing performance, merging the forces of Amazon, Google Workspace, and more to conjure mesmerizing insights. Stand ready, for this project is destined to shine as brightly as the constellations!

---

## 🎨 Nebula UI Color Theme

The cosmic palette that empowers our UI—each color a rune, each variable a spell:

| Variable                  | Color                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------- |
| `--void-core`             | `#0a0a0a` *(Dark Background)*                                                           |
| `--singularity-purple`    | `#2d1b4d` *(Deep Purple)*                                                                |
| `--quantum-teal`          | `#4fd1c5` *(Bright Cyan)*                                                                |
| `--event-horizon`         | `#4b2e7a` *(Purple Border)*                                                              |
| `--input-bg`              | `rgba(20, 10, 25, 0.9)` *(Dark Input BG)*                                                 |
| `--text-color`            | `#e0e0e0` *(Light Grey)*                                                                 |
| `--background-gradient`   | `linear-gradient(135deg, #0a0a0a 0%, #1a102e 50%, #0a0a0a 100%)` *(Celestial Gradient)*  |
| `--neon-glow`             | `0 0 15px var(--quantum-teal)` *(Radiant Neon Glow)*                                      |

*Each hue is meticulously chosen to evoke the mystery of deep space and the energy of cosmic forces.*

---

## 🖋️ Nebula UI Typography

Typography that sings like the cosmic winds—delivering clarity with every stroke of the celestial pen:

| Element            | Font                                    |
| ------------------ | --------------------------------------- |
| **Primary Font**   | `'Segoe UI', system-ui, sans-serif`     |
| **Heading Weight** | `600`                                   |
| **Text Color**     | `#e0e0e0` *(Light Grey)*                 |
| **Gradient Text**  | `linear-gradient(45deg, var(--quantum-teal), #8a6de9)` |

*Embrace the harmony of modern design and the timeless echo of the cosmos.*

---

## Project Overview

**SellSmart Analytics** is your cosmic dashboard—an application that gathers the energy of disparate data sources and transforms them into luminous insights. With dashboards that monitor ad spend, campaign performance, keyword analysis, and beyond, your marketing and sales forces are forever empowered by data magic.

---

## Technologies Used

- **React:** The modern alchemy for building UI constellations.
- **TypeScript:** The enchanted script that ensures type safety across the cosmos.
- **Tailwind CSS:** A utility-first framework that weaves the fabric of responsive design.
- **Vite:** A build tool that propels your development journey at the speed of light.
- **Supabase:** Your backend guardian, offering authentication and data storage as powerful as ancient runes.
- **Recharts:** A charting library that transforms data into visual epics.
- **Radix UI:** Unstyled, accessible UI primitives—your secret arsenal for building stellar interfaces.

---

## Project Structure

The project is structured like a grand celestial map, guiding you through the intricate layers of our digital universe:

- **`src/`**: The heart of the application.
  - **`components/`**: Reusable, cosmic React components.
    - **`ui/`**: Common UI elements crafted with Radix UI and Tailwind CSS.
    - **`metrics/`**: Modules for deciphering and displaying key performance metrics.
    - **`dashboard/`**: The core components that construct our main dashboards.
  - **`pages/`**: The routes and vistas that chart the user’s journey.
  - **`lib/`**: Utility functions and helper modules—your tools for arcane coding.
  - **`types/`**: The TypeScript type definitions, safeguarding the integrity of your code.
  - **`hooks/`**: Custom React hooks that summon reactivity and state management.
  - **`integrations/`**: Portals for external services like Amazon and Google Workspace.
- **`public/`**: A repository of static assets—images, fonts, and more.
- **`supabase/`**: Configuration scripts to bind your project with Supabase’s mystic powers.

---

## Key Components

Every component is a mighty rune in our saga:

- **`AuthProvider`**: The guardian that channels authentication throughout the realm.
- **`DashboardLayout`**: The grand layout that underpins our dashboards, offering structure and stability.
- **`DashboardSidebar`**: A navigational compass guiding users through the dashboard’s labyrinth.
- **`MetricCardBase`**: The base component for displaying key performance metrics.
- **`MetricsTabs`**: A set of celestial tabs, each opening a window into a different dimension of metrics.
- **`CampaignAnalysis`**: The oracle for dissecting campaign performance.
- **`KeywordAnalysis`**: The seer that deciphers the secrets of keyword dynamics.

---

## API Integrations

Harness the power of the cosmos with integrations that bridge your project to the greatest data deities:

- **Amazon:** Conjures the Amazon Advertising API to retrieve ad spend and sales data.
- **Google Workspace:** Connects with Google Workspace APIs to summon data from Google Analytics and beyond.

---

## Setup and Installation

Embark on your cosmic quest with these sacred steps:

1. **Clone the repository:**  
   `git clone <repository-url>`
2. **Install dependencies:**  
   `npm install`
3. **Configure environment variables:**  
   - `SUPABASE_URL`: The gateway to your Supabase realm.
   - `SUPABASE_ANON_KEY`: The secret key to unlock Supabase’s power.
   - `AMAZON_ADVERTISING_CLIENT_ID`: Your key to the Amazon Advertising API.
   - `AMAZON_ADVERTISING_CLIENT_SECRET`: The secret behind the Amazon Advertising API.
   - `GOOGLE_CLIENT_ID`: Your passage to the Google Workspace API.
   - `GOOGLE_CLIENT_SECRET`: The secret talisman for the Google Workspace API.
4. **Run the development server:**  
   `npm run dev`

---

## Contributing

Contributions to this cosmic saga are always welcome! To join our celestial fellowship:

- **Fork the repository.**
- **Create a new branch** for your feature or bug fix.
- **Write tests** to ensure your incantations are robust.
- **Submit a pull request** to merge your magic into the main cosmic tapestry.

---

*May this God Mode document guide you on your journey through the digital cosmos. Let your code shine like the Northern Lights, and may every contribution add to the epic saga of **SellSmart Analytics**!*
