# Tourvisto - AI Travel Planning App

An AI-powered travel planning platform built with Next.js 16, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- **Modern Tech Stack**: Next.js 16 with App Router, TypeScript, and Tailwind CSS v4
- **Beautiful UI**: Gradient-heavy design with blue/purple color scheme matching Figma designs
- **Authentication**: Supabase Auth integration for user registration and login
- **Responsive Design**: Mobile-first approach with responsive components
- **Admin Dashboard**: Analytics and management interface with stats
- **Type-Safe**: Full TypeScript support with comprehensive type definitions

## 📦 Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Supabase account (for authentication and database)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/vvarthan7/travel-app.git
cd travel-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your Supabase credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
travel-app/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Home page with hero and destinations
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── dashboard/           # Admin dashboard
│   ├── layout.tsx           # Root layout with Header/Footer
│   └── globals.css          # Global styles with custom colors
├── components/              # Reusable React components
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer with links
│   ├── Button.tsx          # Reusable button component
│   ├── Input.tsx           # Form input component
│   └── DestinationCard.tsx # Destination display card
├── lib/                     # Utility functions and configs
│   ├── supabase.ts         # Supabase client setup
│   └── utils.ts            # Helper functions
├── types/                   # TypeScript type definitions
│   └── index.ts            # User, Destination, Itinerary types
├── public/                  # Static assets
├── .env.example            # Environment variables template
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Design System

### Colors
The app uses a blue/purple gradient color scheme:

- **Primary Blue**: `#3b82f6`
- **Primary Purple**: `#8b5cf6`
- **Secondary Blue**: `#60a5fa`
- **Secondary Purple**: `#a78bfa`
- **Accent Blue**: `#2563eb`
- **Accent Purple**: `#7c3aed`

### Gradient Classes
- `.gradient-primary` - Primary gradient (blue to purple)
- `.gradient-secondary` - Secondary gradient (lighter shades)
- `.gradient-accent` - Accent gradient (darker shades)

## 🔑 Key Components

### Header
Global navigation with logo, menu links, and auth buttons.

### Footer
Company information and resource links.

### DestinationCard
Displays destination information with image, rating, and CTA button.

### Button
Versatile button component with multiple variants:
- `default` - Primary blue button
- `gradient` - Gradient background
- `secondary` - Secondary style
- `outline` - Outlined button
- `ghost` - Transparent button

## 📄 Pages

### Home (`/`)
- Hero section with CTA
- Feature highlights
- Featured destinations grid
- Call-to-action section

### Login (`/login`)
- Email/password login form
- Remember me checkbox
- Forgot password link
- Supabase Auth integration

### Signup (`/signup`)
- Registration form with validation
- Name, email, password fields
- Terms acceptance
- Supabase Auth integration

### Dashboard (`/dashboard`)
- Stats cards (Users, Destinations, Itineraries)
- Recent activity feed
- Popular destinations list
- Quick action buttons

## 🗄️ Database Schema (Planned)

The following Supabase tables are planned:

### users
- id (uuid)
- email (text)
- name (text)
- role (enum: 'user', 'admin')
- created_at (timestamp)
- updated_at (timestamp)

### destinations
- id (uuid)
- name (text)
- country (text)
- description (text)
- image_url (text)
- popularity_score (decimal)
- featured (boolean)
- created_at (timestamp)
- updated_at (timestamp)

### itineraries
- id (uuid)
- user_id (uuid, foreign key)
- destination_id (uuid, foreign key)
- title (text)
- description (text)
- start_date (date)
- end_date (date)
- activities (jsonb)
- created_at (timestamp)
- updated_at (timestamp)

### analytics
- id (uuid)
- user_id (uuid, nullable)
- event_type (text)
- event_data (jsonb)
- created_at (timestamp)

## 🔐 Authentication

The app uses Supabase Auth for:
- User registration with email/password
- Login with email/password
- Session management
- Password reset (coming soon)

## 🚧 Future Enhancements

- [ ] AI-powered itinerary generation
- [ ] Destination search and filters
- [ ] User profile management
- [ ] Booking integration
- [ ] Social features (reviews, sharing)
- [ ] Mobile app
- [ ] Multi-language support
- [ ] Payment integration

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

This is an MVP project. Contributions are welcome once the core features are stable.

## 📄 License

MIT

## 👥 Team

Built by the Tourvisto team for the 5-10 day MVP sprint.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for backend infrastructure
- Tailwind CSS for utility-first styling
- shadcn/ui for component inspiration
