# Modern Landing Page

A professional, multilingual landing page template built with Next.js 16, featuring dark/light theme support, smooth animations, and comprehensive accessibility features.

## Features

- **Internationalization**: Multi-language support (English, German, Italian) with next-intl
- **Theme System**: Dark and light modes with smooth transitions
- **Animations**: GSAP-powered scroll animations and Framer Motion interactions
- **Accessibility**: WCAG compliant with ARIA labels, keyboard navigation, and screen reader support
- **Responsive Design**: Mobile-first approach with optimized layouts for all screen sizes
- **TypeScript**: Full type safety across the codebase
- **Modern Stack**: React 19, Next.js 16, Tailwind CSS 4

## Tech Stack

- **Framework**: Next.js 16.0.5
- **UI Library**: React 19.2.0
- **Styling**: Tailwind CSS 4.1.14
- **Animations**: GSAP 3.13.0, Framer Motion 12.23.24
- **Internationalization**: next-intl 4.5.6
- **Icons**: Lucide React 0.555.0
- **Language**: TypeScript 5

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
src/
├── app/              # Next.js app directory with routing
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   ├── hero/        # Hero section components
│   └── process/     # Process section components
├── contexts/        # React context providers
├── i18n/            # Internationalization configuration
├── lib/             # Utility functions and constants
└── messages/        # Translation files (en, de, it)
```

## Key Components

- **Hero Section**: Animated landing section with statistics and CTAs
- **Value Proposition**: Feature showcase with visual metrics
- **Featured Projects**: Project gallery with hover effects
- **Process Section**: Step-by-step process visualization
- **Contact Form**: Accessible form with validation
- **Navigation**: Responsive navbar with language and theme switchers

## Customization

### Theme Colors

Edit `src/lib/constants.ts` to customize theme colors:

```typescript
export const COLORS = {
  dark: {
    /* dark theme colors */
  },
  light: {
    /* light theme colors */
  },
};
```

### Translations

Add or modify translations in `src/messages/`:

- `en.json` - English
- `de.json` - German
- `it.json` - Italian

### Content

Update component content directly in their respective files under `src/components/`.

## Accessibility

This template follows WCAG 2.1 Level AA guidelines:

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader optimized

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.
