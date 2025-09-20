# Thrive

A modern meal planning application that uses AI to create personalized meal plans based on your preferences and dietary needs.

<div align="center">
  <img src="/public/logo.png" alt="Thrive Logo" width="120" />
</div>

## Overview

Thrive simplifies meal planning with an intuitive interface that helps you discover recipes, create meal plans, and track your progress. Whether you're looking to eat healthier, save time, or just try new recipes, Thrive makes the process seamless.

## Features

### 🍽️ Meal Plan Generator
Create custom meal plans or let our AI generate one for you, complete with shopping lists and nutritional information.

### 📚 Recipe Discovery
Browse a vast library of recipes, filter by dietary needs, and save your favorites for later.

### 📊 Progress Tracking
Monitor your meal adherence and track progress with insights and simple charts.

## Screenshots

### Home Page
![Home Page](screenshots/home.png)

### Recipe Explorer
![Recipe Explorer](screenshots/recipe-explorer.png)

### Meal Planning
![Meal Planning](screenshots/meal-planning.png)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/thrive.git
cd thrive
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.local.example .env.local
```
Edit `.env.local` with your database and API credentials.

4. Set up the database
```bash
npx prisma db push
```

5. Start the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS with shadcn/ui components

---

Built with ❤️ for better meal planning
