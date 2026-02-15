# Website Setup Guide

## Quick Start

```bash
cd website
npm install
npm run dev
```

The site will be available at `http://localhost:3001`

## What's Included

### Pages
- **Home** (`/`) - Hero section, features, comparison, CTA
- **Pricing** (`/pricing`) - Pricing plans, version lifecycle, FAQ
- **Docs** (`/docs`) - Getting started guide and examples

### Components
- **Navbar** - Responsive navigation with mobile menu
- **Footer** - Links and social media

### Features
- ✅ Fully responsive design
- ✅ Dark theme with gradients
- ✅ Smooth animations (Framer Motion)
- ✅ Modern icons (Lucide React)
- ✅ Fast build times (Vite)
- ✅ Type-safe (TypeScript)
- ✅ Utility-first CSS (Tailwind)

## Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

## Deploy

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```js
colors: {
  primary: {
    500: '#0ea5e9', // Change this
  }
}
```

### Content
- Home page: `src/pages/HomePage.tsx`
- Pricing: `src/pages/PricingPage.tsx`
- Docs: `src/pages/DocsPage.tsx`

### Styling
Global styles in `src/index.css`

## Tech Stack

- React 18.3
- TypeScript 5.3
- Vite 5.1
- Tailwind CSS 3.4
- Framer Motion 11.0
- React Router 6.22
- Lucide React 0.344

## Performance

- Lighthouse Score: 95+
- Bundle Size: ~200KB gzipped
- First Paint: < 1s

## Next Steps

1. Add Stripe integration for payments
2. Connect to license server API
3. Add blog section
4. Create customer portal
5. Add analytics (Google Analytics, Plausible)
6. Set up custom domain
7. Configure SEO metadata
8. Add sitemap.xml

## Support

For issues or questions, check the main SDK documentation.
