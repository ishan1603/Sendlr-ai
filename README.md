# Sendlr AI - Personalized Newsletter SaaS Platform

<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Next.JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=black" alt="next.js" />
    <img src="https://img.shields.io/badge/-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="supabase" />
    <img src="https://img.shields.io/badge/-Groq-FF6B35?style=for-the-badge&logo=groq&logoColor=white" alt="groq" />
    <img src="https://img.shields.io/badge/-Inngest-6366F1?style=for-the-badge&logo=inngest&logoColor=white" alt="inngest" />
    <img src="https://img.shields.io/badge/-Tailwind-00BCFF?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="tailwind" />
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
  </div>

  <h3 align="center">Sendlr AI - AI-Powered Newsletter SaaS with Next.js, Supabase & Groq</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🗄️ [Database Setup](#database-setup)
6. 🔐 [Environment Variables](#environment-variables)

## <a name="introduction">🤖 Introduction</a>

Sendlr AI is a sophisticated SaaS platform that automates the creation and delivery of personalized newsletters using artificial intelligence. Built from scratch with Next.js, Supabase, and Groq AI, it features secure user authentication, intelligent content curation, and automated scheduling. Sendlr AI enables users to receive AI-generated newsletters tailored to their interests, powered by advanced workflow orchestration and real-time data processing.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[Next.js](https://nextjs.org/)** is a powerful React framework that enables the development of fast, scalable web applications with features like server-side rendering, static site generation, and API routes for building full-stack applications.

- **[Supabase](https://supabase.com/)** is an open-source backend-as-a-service platform that provides instant APIs, real-time subscriptions, authentication, storage, and a PostgreSQL database, enabling developers to build scalable and secure applications with ease.

- **[Groq](https://groq.com/)** is a high-performance AI inference engine that provides ultra-fast language model processing, enabling real-time AI content generation with significantly lower latency than traditional solutions.

- **[Inngest](https://www.inngest.com/)** is a durable workflow engine that provides reliable background job processing with automatic retries, error handling, and event-driven architecture for mission-critical operations.

- **[Tailwind CSS](https://tailwindcss.com/)** is a utility-first CSS framework that allows developers to design custom user interfaces by applying low-level utility classes directly in HTML, streamlining the design process.

- **[TypeScript](https://www.typescriptlang.org/)** is a superset of JavaScript that adds static typing, providing better tooling, code quality, and error detection for developers, making it ideal for building large-scale applications.

- **[EmailJS](https://www.emailjs.com/)** is a client-side email service that enables sending emails directly from JavaScript without backend infrastructure, providing reliable email delivery with template management.

- **[NewsAPI](https://newsapi.org/)** is a comprehensive news aggregation service that provides real-time access to news articles from thousands of sources worldwide, enabling dynamic content curation.

## <a name="features">🔋 Features</a>

👉 **AI-Powered Content Generation**: Advanced newsletter creation using Groq AI's LLaMA models to transform news articles into engaging, personalized content with contextual analysis and sentiment optimization.

👉 **Intelligent Category Selection**: Dynamic content curation system supporting 8 distinct news verticals (Technology, Business, Sports, Entertainment, Science, Health, Politics, Environment) with smart filtering.

👉 **Automated Scheduling System**: Sophisticated scheduling engine supporting multiple delivery frequencies (daily, weekly, bi-weekly) with timezone-aware delivery and user preference management.

� **Durable Workflow Management**: Built with Inngest's reliable execution framework featuring automatic retries, error handling, and comprehensive monitoring for mission-critical newsletter delivery.

� **User Authentication & Management**: Secure Supabase authentication with granular preference controls, subscription management, and real-time status updates.

� **Real-time Dashboard**: Interactive control panel with live newsletter management, scheduling controls, preference updates, and comprehensive usage analytics.

👉 **Professional Email Templates**: Responsive HTML email templates with organized content structure and delivery optimization through EmailJS integration.

👉 **Modern UI/UX**: Custom retro-gaming aesthetic using Press Start 2P typography, pixelated components, and responsive layouts optimized for accessibility.

👉 **Database Security**: Advanced PostgreSQL implementation with Row Level Security (RLS), optimized indexing, and automated timestamp management.

� **Background Job Processing**: Robust workflow orchestration with Inngest handling newsletter generation, scheduling, and delivery with fault tolerance.

👉 **Cross-Device Compatibility**: Fully responsive design that works seamlessly across all devices with consistent user experience.

👉 **Fallback Mechanisms**: Intelligent content generation fallbacks ensuring reliable newsletter delivery even when AI services are unavailable.

and many more, including scalable architecture, code reusability, and production-ready deployment patterns.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/ishan1603/sendlr-ai.git
cd sendlr-ai
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
# AI Content Generation
GROQ_API_KEY=gsk_your_groq_api_key_here

# Background Job Processing
INNGEST_SIGNING_KEY=signkey_your_inngest_signing_key_here

# News Data Source
NEWS_API_KEY=your_newsapi_key_here

# Email Delivery Service
EMAILJS_SERVICE_ID=service_your_emailjs_service_id
EMAILJS_TEMPLATE_ID=template_your_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Database & Authentication
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Replace the placeholder values with your actual credentials from:

- [Groq Console](https://console.groq.com/)
- [Inngest Dashboard](https://www.inngest.com/)
- [NewsAPI](https://newsapi.org/)
- [EmailJS](https://www.emailjs.com/)
- [Supabase](https://supabase.com/)

**Running the Project**

```bash
# Start the Next.js development server
npm run dev

# In a separate terminal, start the Inngest development server
npx inngest dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="database-setup">🗄️ Database Setup</a>

**Create a Supabase Project**

1. Go to [Supabase](https://supabase.com/) and create a new project
2. Wait for the database to be set up
3. Go to the SQL Editor in your Supabase dashboard
4. Execute the following SQL to create the required tables:

```sql
-- User Preferences Table with Optimized Indexing
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id          bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  user_id     text NOT NULL UNIQUE,
  email       text NOT NULL,
  categories  text[] NOT NULL DEFAULT '{}',
  frequency   text NOT NULL DEFAULT 'weekly',
  send_time   text NOT NULL DEFAULT '09:00',
  is_active   boolean NOT NULL DEFAULT true
);

-- Security Implementation: Row Level Security
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Granular Access Control Policies
CREATE POLICY "Users can view their own preferences"
ON public.user_preferences FOR SELECT
USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert their own preferences"
ON public.user_preferences FOR INSERT
WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update their own preferences"
ON public.user_preferences FOR UPDATE
USING (user_id = auth.uid()::text)
WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can delete their own preferences"
ON public.user_preferences FOR DELETE
USING (user_id = auth.uid()::text);

-- Performance Optimization: Strategic Indexing
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id
ON public.user_preferences(user_id);

CREATE INDEX IF NOT EXISTS idx_user_preferences_is_active
ON public.user_preferences(is_active);

-- Data Integrity: Automated Timestamp Management
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_user_preferences_updated_at
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
```

---

## 🔐 Environment Configuration

### Production Environment Variables

```env
# AI Content Generation
GROQ_API_KEY=gsk_your_groq_api_key_here

# Background Job Processing
INNGEST_SIGNING_KEY=signkey_your_inngest_signing_key_here

# News Data Source
NEWS_API_KEY=your_newsapi_key_here

# Email Delivery Service
EMAILJS_SERVICE_ID=service_your_emailjs_service_id
EMAILJS_TEMPLATE_ID=template_your_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Database & Authentication
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Development Workflow

```bash
# Initialize Supabase (optional for local development)
supabase start
supabase db push

# Start development environment
npm run dev              # Frontend (http://localhost:3000)
npx inngest dev         # Background jobs (http://localhost:8288)

# Code quality checks
npm run lint            # ESLint validation
npm run build           # Production build verification
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to set these in your production environment:

- `GROQ_API_KEY`
- `INNGEST_SIGNING_KEY`
- `NEWS_API_KEY`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## 📚 API Documentation

### Core API Routes

#### User Preferences

- `POST /api/user-preferences` - Save user newsletter preferences
- `GET /api/user-preferences` - Retrieve user preferences
- `PATCH /api/user-preferences` - Update subscription status

#### Newsletter Operations

- `POST /api/send-newsletter` - Send immediate newsletter
- `POST /api/schedule-newsletter` - Schedule newsletter for specific time
- `GET /api/test-news` - Test news article fetching

#### Inngest Integration

- `POST /api/inngest` - Webhook endpoint for Inngest events

---

## 🎯 Key Features Explained

### AI Newsletter Generation

The system uses Groq AI (faster and cheaper than OpenAI) to:

- Fetch recent news articles from selected categories
- Generate engaging, personalized summaries
- Create professional HTML email templates
- Deliver content via EmailJS

### Scheduled Workflows

Inngest handles:

- Newsletter scheduling based on user frequency preferences
- Background job processing with automatic retries
- User status validation before sending
- Fallback content generation when AI fails

### User Experience

Features include:

- Pixelated retro gaming design aesthetic
- Real-time preference management
- Newsletter pause/resume functionality
- Immediate send and custom scheduling options
- Comprehensive dashboard with usage insights

---

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Groq AI Docs](https://console.groq.com/docs)
- [Inngest Docs](https://www.inngest.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [EmailJS Docs](https://www.emailjs.com/docs)
- [NewsAPI Docs](https://newsapi.org/docs)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🆘 Support

For issues and questions:

- Check the [Inngest documentation](https://www.inngest.com/docs)
- Review [Next.js documentation](https://nextjs.org/docs)
- Open an issue in this repository

---

## 🎉 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- AI powered by [Groq](https://groq.com/)
- Background jobs by [Inngest](https://www.inngest.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/)
