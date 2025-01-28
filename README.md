* * * * *

AdVantage Platform 🎯
=====================

*Amazon Ads Management Suite with Spotify Design Sensibilities*

![Platform Overview](https://via.placeholder.com/1920x800.png?text=AdVantage+Platform+Preview)

* * * * *

🌐 Application Structure
------------------------

### 1\. **Landing Page** (Public)

**Spotify-inspired Features:**

-   Dark theme with gradient overlays

-   Animated "Now Playing" style metrics ticker

-   Interactive demo panel with hover-activated previews

**Core Functionality:**

-   Value proposition for Amazon sellers

-   Integration status with Amazon Advertising API

-   Real-time platform metrics (campaigns managed, ROAS avg)

-   Social proof section with API badges

* * * * *

### 2\. **Authentication Flow** (Login/Register)

**Spotify-style Elements:**

-   Dark modal overlays with subtle gradients

-   Animated form transitions

-   Password strength meter with musical visual feedback

**Key Features:**

-   Amazon Seller Central OAuth integration

-   2FA with "Verified" badge animation

-   Progressive profiling for new users

-   Security audit log preview

* * * * *

### 3\. **User Dashboard** (Seller Perspective)

**Amazon Ads Functionality:**

markdown

Copy

- **Campaign Management**
  - Real-time SP/SD/SB campaign performance
  - Automated rule suggestions (Spotify-style "Daily Mix" recommendations)
  - Bid adjustment calculator with historical data

- **Creative Studio**
  - Ad preview generator with Amazon template validation
  - AI-powered headline variations (Lyrics-style display)
  - Image optimization scoring

- **Analytics Hub**
  - Customizable widgets (ACOS, TACoS, ROAS)
  - Historical performance timelines
  - Competitor benchmark comparisons

**UI Enhancements:**

-   Spotify Wrapped-style annual reports

-   Drag-and-drop dashboard customization

-   "Now Playing" style active campaign card

-   Collaborative playlist-inspired team features

* * * * *

### 4\. **Admin Dashboard** (Enhanced)

**Advanced Amazon Ads Management:**

markdown

Copy

- **Multi-Client Monitoring**
  - Aggregate performance across all managed accounts
  - Alert system for account health metrics
  - Bulk action capabilities

- **API Management**
  - Amazon Advertising API usage analytics
  - Rate limit monitoring
  - Webhook configuration

- **Financial Reporting**
  - Client billing integration
  - Advertising spend reconciliation
  - Profitability calculators

**Spotify Admin Features:**

-   "Artist Analytics" style client performance views

-   Team member permissions (Collaborator/Admin roles)

-   Audit log with change tracking

* * * * *

🛠 Core Technical Requirements
------------------------------

### Amazon Ads API Integration

typescript

Copy

// Sample Amazon Ads API Service
class AmazonAdsService {
  async getCampaignPerformance(campaignId: string): Promise<CampaignMetrics> {
    return await amazonAdvertisingClient.getCampaigns({
      campaignId,
      metrics: ['impressions', 'clicks', 'spend', 'sales']
    });
  }

  async generateRecommendations(): Promise<OptimizationTip[]> {
    return await amazonML.generateBidSuggestions();
  }
}

### Key Features Matrix

| Module | Must-Have Features | Spotify UI Elements |
| --- | --- | --- |
| Campaign Mgmt | Real-time bid adjustments, Automated rules | Wrapped-style annual reports |
| Creative Studio | Ad validation, AI suggestions | Lyrics-style text animation |
| Analytics | Custom widgets, Export capabilities | Artist analytics-inspired visuals |
| Admin | Multi-account control, API monitoring | Album grid-style client overview |

* * * * *

🚀 Suggested Tech Stack
-----------------------

**Frontend:**

-   React 18 + TypeScript

-   Spotify UI Kit (Custom)

-   Recharts/Visx for data visualization

-   Amazon Ads UI Components

**Backend:**

-   Node.js + TypeScript

-   Amazon Advertising API SDK

-   Redis for rate limiting

-   PostgreSQL for campaign data

**DevOps:**

-   AWS ECS Fargate

-   Amazon API Gateway

-   CloudWatch for API monitoring

-   CI/CD with CodePipeline

* * * * *

🔐 Security Requirements
------------------------

1.  **Amazon API Security:**

    -   Token rotation implementation

    -   AWS Secrets Manager integration

    -   Scoped API permissions

2.  **Data Protection:**

    -   Campaign data encryption at rest

    -   PCI-DSS compliance for payment processing

    -   SOC 2 audit trail

* * * * *

📈 Key Performance Indicators
-----------------------------

1.  **Ad Platform Metrics:**

    -   API Response Time < 800ms

    -   Real-time Data Refresh < 15s

    -   Bulk Action Processing < 30s/100 campaigns

2.  **UI Performance:**

    -   LCP < 1.2s

    -   INP < 200ms

    -   Dashboard Load Time < 2.5s

* * * * *

🧪 Testing Strategy
-------------------

1.  **Amazon API Simulation:**

    -   Mock Server for Advertising API

    -   Rate Limit Testing Suite

    -   SP/SD/SB Campaign Scenario Tests

2.  **UI Testing:**

    -   Campaign Management Workflow Tests

    -   Dark Theme Contrast Checks

    -   Cross-account Permission Validation
