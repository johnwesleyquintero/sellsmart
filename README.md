
# ASYND: Amazon Advertising Analytics Dashboard

A streamlined dashboard for Amazon Sellers to analyze their advertising data using CSV files or Google Sheets as data sources.

## Core Features

### Data Import
- CSV file upload support
- Google Sheets integration
- Bulk file processing from Amazon Advertising

### Analytics Dashboard
- Key performance metrics (ACOS, ROAS, CTR)
- Campaign performance analysis
- Search term optimization
- Historical data tracking

### Data Processing
- Data cleaning and aggregation
- Metric calculations
- Automated consolidation
- Custom date range analysis

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`

## Data Import Methods

### Google Sheets
1. Export your Amazon Advertising data to Google Sheets
2. Make the sheet publicly accessible (view only)
3. Copy the Google Sheet URL
4. Paste URL in the dashboard import section

### CSV Upload
1. Download your advertising reports from Amazon
2. Clean the CSV file if needed
3. Upload directly through the dashboard
4. Data will be processed automatically

## Metrics Calculated

- ACOS (Advertising Cost of Sale)
- ROAS (Return on Ad Spend)
- CTR (Click-Through Rate)
- Conversion Rate
- Total Sales & Orders
- Ad Spend & Impressions

## Technology Stack

- React + TypeScript
- Tailwind CSS
- Supabase (Database)
- Vercel (Hosting)

## Acknowledgements

This project is made possible thanks to these amazing platforms:

- [Vercel](https://vercel.com/) - Hosting and Deployment
- [Lovable.dev](https://lovable.dev/) - Development Platform
- [GitHub](https://github.com/) - Version Control
- [Supabase](https://supabase.com/) - Backend Infrastructure

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.
