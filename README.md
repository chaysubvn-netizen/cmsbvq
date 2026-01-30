# CMSBVQ.COM - Next.js Application

Marketplace platform for buying and selling source code, built with Next.js 16 and TypeScript.

## 🚀 Features

- **Product Marketplace**: Browse and purchase source code
- **VPS Services**: Configure and order VPS packages
- **User Dashboard**: Manage orders, balance, and account
- **Floating Chat Widget**: Multi-channel support (Zalo, Messenger, Telegram, Hotline)
- **Legal Pages**: Privacy Policy and Terms of Service
- **Premium Dark Theme**: Modern glassmorphism design

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://cmsbvq.com
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Or deploy via Vercel Dashboard:
1. Import repository from GitHub
2. Deploy automatically

### Other Platforms

- **Railway**: Auto-deploy from GitHub
- **Netlify**: Connect repository and deploy
- **VPS**: Run `npm run build` and `npm start`

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── products/          # Product pages
│   ├── services/          # Service pages (VPS, Cronjob)
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── ui/               # UI components (Shadcn)
│   └── vps/              # VPS-specific components
├── lib/                   # Utilities and API
│   ├── api.ts            # API client
│   ├── api-types.ts      # TypeScript types
│   └── image-helper.ts   # Image utilities
└── public/               # Static assets
```

## 🔗 API Integration

Backend API: `https://cmsbvq.top/api`

All API calls are handled through `lib/api.ts` with TypeScript types defined in `lib/api-types.ts`.

## 📝 License

Copyright © 2026 CMSBVQ.COM

## 🤝 Contributing

This is a private project. For issues or questions, contact the development team.

## 📧 Contact

- Website: https://cmsbvq.com
- Zalo: https://zalo.me/0395046244
- Telegram: https://t.me/hackliketop2
