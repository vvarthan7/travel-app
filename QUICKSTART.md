# Quick Start Guide

This guide will help you get the Tourvisto Travel App up and running in minutes.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase (Optional for Development)

The app will work without Supabase credentials, but authentication features will be limited.

### If you want to enable authentication:

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings > API
4. Copy your project URL and anon key
5. Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Database Setup (Future)

Once you have Supabase configured, you'll need to create the following tables:
- users
- destinations
- itineraries
- analytics

SQL migration scripts will be provided in a future update.

## Step 3: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 4: Explore the Application

### Available Routes:
- `/` - Home page with hero and featured destinations
- `/login` - User login (requires Supabase setup)
- `/signup` - User registration (requires Supabase setup)
- `/dashboard` - Admin dashboard with mock data

## Step 5: Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Build Errors
- Make sure you're using Node.js 20.x or higher
- Delete `node_modules` and `.next` folders, then run `npm install` again

### Supabase Warnings
- If you see Supabase warnings but don't need authentication yet, you can ignore them
- The app uses placeholder credentials that allow it to build successfully

### Port Already in Use
- If port 3000 is in use, Next.js will automatically suggest another port
- Or you can specify a custom port: `npm run dev -- -p 3001`

## Next Steps

1. Set up your Supabase database schema
2. Configure authentication flows
3. Add real destination data
4. Implement AI features
5. Deploy to Vercel or your preferred hosting platform

## Need Help?

Check the [PROJECT_SETUP.md](./PROJECT_SETUP.md) file for detailed documentation.
