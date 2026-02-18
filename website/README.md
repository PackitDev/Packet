# Packet SDK Website

High-quality landing page for the Packet SDK built with modern web technologies.

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

## Features

- 🎨 Modern, gradient-rich design
- ⚡ Lightning-fast performance
- 📱 Fully responsive
- ✨ Smooth animations
- 🎯 SEO optimized
- 🌙 Dark theme

## Pages

- **Home** - Hero, features, comparison, CTA
- **Pricing** - Plans, version lifecycle, FAQ
- **Docs** - Getting started, examples, API reference

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
website/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx      # Navigation bar
│   │   └── Footer.tsx      # Footer
│   ├── pages/
│   │   ├── HomePage.tsx    # Landing page
│   │   ├── PricingPage.tsx # Pricing page
│   │   └── DocsPage.tsx    # Documentation
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Deployment

This site can be deployed to:

- **Vercel** - `vercel deploy`
- **Netlify** - Drag & drop `dist/` folder
- **GitHub Pages** - Push `dist/` to gh-pages branch
- **AWS S3** - Upload `dist/` to S3 bucket
- **Cloudflare Pages** - Connect GitHub repo

## Environment Variables

No environment variables needed for the static site. 

For Stripe integration (future):
```
VITE_STRIPE_PUBLIC_KEY=pk_...
```

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Bundle size: < 200KB (gzipped)

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

Proprietary - Part of Packet SDK
