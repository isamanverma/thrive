# 🌱 Thrive App - New Architecture Documentation

## Overview

The Thrive app has been restructured to use a **Next.js-only architecture** with Spoonacular API integration, removing the need for a separate Python backend. All backend logic is now handled by Next.js API routes.

## 🏗️ Architecture Changes

### Before (Old Architecture)

- **Frontend**: Next.js with Prisma + Neon
- **Backend**: Python FastAPI with PostgreSQL
- **Recipe Data**: Custom embeddings and ML-based search
- **Complexity**: Separate backend service, complex deployment

### After (New Architecture)

- **Frontend + Backend**: Next.js with API routes
- **Database**: Neon PostgreSQL (via Prisma)
- **Recipe Data**: Spoonacular API + local caching
- **Simplicity**: Single deployment, serverless functions

## 🗄️ Database Schema Changes

### New Tables Added:

1. **`UserRecipe`** - Tracks user's liked/saved/cooked recipes
2. **Updated `Recipe`** - Now stores Spoonacular recipe data with caching
3. **Updated `MealPlan`** & **`MealPlanItem`** - Simplified structure for Spoonacular integration

### Removed Tables:

- **`RecipeEmbedding`** - No longer needed with Spoonacular search
- **`MealPlanRecipe`** - Replaced with `MealPlanItem`

## 🔌 API Routes

### Recipe Search & Discovery

- **`GET /api/searchRecipe`** - Search recipes via Spoonacular
- **`GET /api/recipes/[id]`** - Get detailed recipe information (with caching)

### User Recipe Management

- **`POST /api/user/recipes`** - Add recipe to user's collection (like/save/cooked)
- **`GET /api/user/recipes`** - Get user's saved recipes with filtering
- **`DELETE /api/user/recipes`** - Remove recipe from user's collection

### Meal Planning

- **`POST /api/generateMealPlan`** - Generate weekly meal plan via Spoonacular
- **`GET /api/generateMealPlan`** - Get user's existing meal plans

### User Management (Existing)

- **`POST /api/users`** - Create/update user profile
- **`GET /api/users`** - Get user information

## 🍽️ Application Flow

### 1️⃣ User Authentication

- Users sign up/login via **Clerk**
- User data stored in **Neon** database
- Profile completion during onboarding

### 2️⃣ Recipe Search & Discovery

Users can search recipes by:

- **Keywords** (recipe name, cuisine)
- **Ingredients** (include/exclude specific ingredients)
- **Dietary filters** (vegetarian, keto, gluten-free, etc.)
- **Cooking time** and **calorie** constraints

**Technical Implementation:**

- Next.js API route calls **Spoonacular API**
- Results cached in local database for performance
- Rich filtering options via Spoonacular's advanced search

### 3️⃣ Recipe Viewing

- Display recipe details: ingredients, instructions, nutrition
- Show high-quality images from Spoonacular
- Fallback to Unsplash/Pexels for broken images
- Cache frequently accessed recipes locally

### 4️⃣ Save & Like Recipes

- Users can **like**, **save**, or mark recipes as **cooked**
- Stored in `UserRecipe` table with status tracking
- Used for personalization and recommendation algorithms

### 5️⃣ Meal Plan Generation

- Generate weekly meal plans (7 days, 3 meals/day)
- Consider user preferences and dietary restrictions
- Use Spoonacular's meal planning API
- Store plans in database for future reference

### 6️⃣ Personalized Recommendations

- Analyze user's liked recipes and cuisine preferences
- Query Spoonacular with personalized filters
- Machine learning can be added later as API routes

## 🌍 Environment Variables

Required environment variables (add to `.env.local`):

```env
# Database
DATABASE_URL="your_neon_database_url"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"

# Spoonacular API
SPOONACULAR_API_KEY="your_spoonacular_api_key"

# Optional: Image fallback APIs
UNSPLASH_ACCESS_KEY="your_unsplash_key"
PEXELS_API_KEY="your_pexels_key"
```

## 📦 Dependencies

### Core Dependencies:

- **Next.js 15** - Full-stack framework
- **Prisma** - Database ORM and migrations
- **Clerk** - Authentication
- **TypeScript** - Type safety

### New Dependencies:

- No additional packages needed - uses built-in `fetch` for Spoonacular API calls

## 🚀 Getting Started

### 1. Database Migration

```bash
cd frontend
npx prisma migrate dev --name restructure_for_spoonacular_architecture
npx prisma generate
```

### 2. Environment Setup

```bash
cp .env.example .env.local
# Fill in your API keys and database URL
```

### 3. Get Spoonacular API Key

1. Sign up at [Spoonacular API](https://spoonacular.com/food-api)
2. Get your API key from the dashboard
3. Add it to your `.env.local` file

### 4. Run Development Server

```bash
npm run dev
```

## 🎯 Key Benefits

1. **Simplified Deployment** - Single Next.js app, no separate backend
2. **Better Performance** - Local caching + Spoonacular's optimized API
3. **Rich Recipe Data** - Access to 5,000+ recipes with detailed nutrition info
4. **Scalability** - Serverless functions scale automatically
5. **Maintainability** - Single codebase, fewer moving parts
6. **Cost Effective** - No separate server infrastructure needed

## 🔄 Migration from Python Backend

### Files to Remove:

- Entire `/backend` directory
- Python-related configuration files
- Docker files (if any)

### Files Updated:

- `/frontend/prisma/schema.prisma` - New database schema
- `/frontend/src/lib/api.ts` - Updated API functions
- Frontend components - Will use new API endpoints

### No Code Changes Needed:

- Authentication (Clerk integration remains the same)
- UI components (will work with new API structure)
- Database connection (Neon + Prisma setup unchanged)

## 🛠️ Development Tips

1. **API Testing**: Use tools like Thunder Client or Postman to test API routes
2. **Database Management**: Use Prisma Studio (`npx prisma studio`) to view data
3. **Debugging**: Check Next.js API route logs in terminal
4. **Performance**: Monitor Spoonacular API usage (free tier has limits)

## 📈 Future Enhancements

1. **Image Optimization** - Implement fallback image system for broken URLs
2. **Offline Support** - Cache recipes for offline viewing
3. **Advanced ML** - Add recommendation engine as API routes
4. **Social Features** - Recipe sharing and user reviews
5. **Nutrition Tracking** - Detailed meal logging and analytics

## 🎯 Next Steps

1. ✅ Database schema updated
2. ✅ API routes created
3. ✅ Type definitions added
4. 🔄 Update frontend components to use new APIs
5. 🔄 Test meal plan generation
6. 🔄 Test recipe search and caching
7. 🔄 Remove Python backend references
