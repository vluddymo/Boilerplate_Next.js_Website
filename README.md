# Next.js Multilingual Boilerplate

A starter template for Next.js with TypeScript, Tailwind CSS, and internationalization (i18n) using the App Router.

## Features

- ✅ **Next.js App Router** for modern routing solutions
- 🌐 **Multilingual support** with i18n (DE/EN)
- 🎨 **Tailwind CSS** for fast and flexible styling
- 📝 **TypeScript** for type-safe development
- 🔄 **Locale Switcher** for easy language switching
- 📱 **Responsive Design** for desktop and mobile
- 🔍 **SEO optimized** with dynamic meta tags
- 📦 **Centralized type definitions** in `src/types/index.ts`
- 🧹 **ESLint configuration** with modern flat config format

## Installation

1. **Clone repository or use as template**

```bash
# Clone with Git
git clone https://github.com/yourusername/nextjs-multilingual-boilerplate.git my-project

# Or use as template
# Click "Use this template" on the GitHub repository page
```

2. **Install dependencies**

```bash
cd my-project
npm install
npm install --save-dev eslint @eslint/js typescript-eslint @next/eslint-plugin-next eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import
```

3. **Start development server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
my-nextjs-project/
├── src/
│   ├── app/
│   │   ├── [locale]/         # Locale-based routing structure
│   │   │   ├── layout.tsx    # Layout component for localized pages
│   │   │   └── page.tsx      # Home page for each language
│   │   ├── layout.tsx        # Root layout
│   │   └── not-found.tsx     # 404 page
│   ├── components/           # UI components
│   │   ├── common/           # Reusable components
│   │   └── ui/               # Base UI components
│   ├── lib/                  # Utilities and helpers
│   │   └── i18n.ts           # i18n configuration and functions
│   ├── middleware.ts         # Next.js middleware for language redirection
│   ├── styles/               # Global styles
│   │   └── globals.css       # Tailwind imports and global styles
│   └── types/                # Centralized type definitions
│       └── index.ts          # Shared TypeScript types
├── public/
│   ├── locales/              # Translation files
│   │   ├── de/
│   │   │   └── common.json   # German translations
│   │   └── en/
│   │       └── common.json   # English translations
│   └── images/               # Static images
├── .gitignore                # Git ignore file
├── eslint.config.mjs         # ESLint configuration (flat config)
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

## Internationalization (i18n)

This boilerplate uses a routing-based approach for internationalization with the Next.js App Router.

### Supported Languages

- German (`de`) - Default
- English (`en`)

### Language-specific Routes

All pages are available under `/[locale]/...`, for example:
- `/de` - German home page
- `/en` - English home page
- `/de/about` - About us (German)
- `/en/about` - About us (English)

### Automatic Redirection

The middleware (`src/middleware.ts`) automatically redirects requests without a language prefix to the default language (`de`).

### Language Selection

The `LocaleSwitch` component allows users to switch between available languages.

## Adding Translations

1. Add new translation keys to the type definition in `src/types/index.ts`
2. Update the translation files in `public/locales/[locale]/common.json`

## Creating New Pages

To add a new page, create a new file in `src/app/[locale]/[your-page]/page.tsx`:

```tsx
import { Metadata } from 'next';
import { Locale } from '@/types';
import { getDictionary } from '@/lib/i18n';

interface PageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = params;
  const dict = await getDictionary(locale);

  return {
    title: dict.pages.yourPage.title,
    description: dict.pages.yourPage.description,
  };
}

export default async function YourPage({ params }: PageProps) {
  const { locale } = params;
  const dict = await getDictionary(locale);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{dict.pages.yourPage.title}</h1>
      <p>{dict.pages.yourPage.content}</p>
    </div>
  );
}
```

## Production Build

```bash
npm run build
```

This creates an optimized version of the app for production in the `.next` folder.

```bash
npm start
```

Starts the application in production mode.

## Customization

### Colors

Edit the `tailwind.config.js` to define your own colors:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors here
      },
    },
  },
},
```

### Fonts

1. Edit `src/app/layout.tsx` to import your own fonts
2. Update the `fontFamily` entries in `tailwind.config.js`

### Linting and Code Style

This boilerplate includes a modern ESLint configuration using the new flat config format:

- TypeScript integration
- React and React Hooks best practices
- Next.js specific rules
- Accessibility checks
- Import organization
- Consistent code style

You can customize the rules in `eslint.config.mjs` to match your team's coding standards.

## License

MIT# cambio_game
