# Vaasa Lunch

A web application that aggregates lunch menus from various restaurants in Vaasa.

## Features

- View lunch menus from multiple restaurants in one place
- Daily menu updates
- Multi-language support (Finnish, Swedish, English)
- Copy lunch menus to clipboard
- Dark/light theme toggle
- PWA support for mobile

## Backend API

The application now includes a custom backend API to reliably fetch menu data from restaurant websites, solving the issue with rate-limited proxies.

### API Endpoints

- `/api/alexander` - Get Alexander restaurant menu
- `/api/cotton` - Get Cotton Club menu
- `/api/mathilda` - Get Mathilda & Café Oskar menu
- `/api/august` - Get August restaurant menu
- `/api/health` - Health check endpoint

## Installation & Running Locally

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Run the development server
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 in your browser

## Deployment to Vercel

This application is optimized for deployment on Vercel.

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

## Architecture

- Frontend: Plain HTML, CSS, and JavaScript
- Backend: Node.js with Express
- Deployment: Vercel Serverless Functions
- Caching: In-memory caching to reduce load on target websites
