# Purchase Tracker

A Next.js application to track your purchases and monitor how long you've owned them.

## Features

- **Add Purchase**: Create new purchase records with item name, amount, and date of purchase
- **View Purchase**: Click on any purchase row to see detailed information
- **Edit Purchase**: Update existing purchase details
- **Delete Purchase**: Remove purchases from your list
- **Duration Tracking**: Automatically calculates and displays the age of each item in years, months, and days format

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- JSON file storage

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Adding a Purchase

1. Click the "Add Purchase" button
2. Fill in the form:
   - **Item Name**: Name of the purchased item
   - **Amount**: Purchase price
   - **Date of Purchase**: When you bought the item
3. Click "Create"

### Viewing a Purchase

- Click on any row in the table to view detailed information about that purchase

### Editing a Purchase

1. Click the "Edit" button on the purchase row
2. Modify the details in the form
3. Click "Update"

### Deleting a Purchase

1. Click the "Delete" button on the purchase row
2. Confirm the deletion

## Data Storage

All purchase data is stored in `data/purchases.json`. The file is automatically created and updated through the application.

## Project Structure

```
age-of-materials/
├── app/
│   ├── api/
│   │   └── purchases/          # API routes for CRUD operations
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main page with purchase list
│   └── globals.css             # Global styles
├── components/
│   ├── PurchaseForm.tsx        # Form for add/edit
│   └── PurchaseModal.tsx       # Modal for viewing details
├── lib/
│   └── duration.ts             # Duration calculation utilities
├── types/
│   └── purchase.ts             # TypeScript interfaces
└── data/
    └── purchases.json          # JSON data storage
```

## Duration Calculation

The duration (age of item) is calculated as the difference between the current date and the purchase date, displayed in:
- Years
- Months
- Days

Example: "2 years, 3 months, 15 days"

## License

MIT
