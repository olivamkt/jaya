# Jaya Tech - Corporate Website

Official website for Jaya Tech, a fully remote software consulting company specializing in nearshore staff augmentation and high-impact projects.

## 🎯 About Jaya

Jaya is a software consulting company founded in 2012, partnering with U.S. companies since 2016. We specialize in:

- **Nearshore Staff Augmentation** - Connecting companies with top-tier developers, tech leads, and staff engineers
- **Outsourcing** - Delivering managed engineering squads
- **Artificial Intelligence** - Supporting AI projects with ML, computer vision, and LLM integration

## 🧩 Tech Stack

This project is built with modern web technologies:

- [Astro v5.12.6](https://astro.build/) - Web framework for content-focused websites
- [Tailwind CSS v4.1.5](https://tailwindcss.com/) - Utility-first CSS framework
- [DaisyUI v5.1.10](https://daisyui.com/) - Tailwind CSS component library
- [React v19.1.0](https://reactjs.org/) - For interactive components
- [Astro SEO v0.8.4](https://github.com/jonasmerlin/astro-seo) - SEO optimization
- [Astro Sitemap v3.4.2](https://docs.astro.build/en/guides/integrations-guide/sitemap/) - Automatic sitemap
- Custom fonts: Open Sauce One & Space Grotesk

## 📁 Project Structure

```
/
├── .cursor/
│   └── rules/              # Cursor AI rules for code consistency
├── public/
│   ├── fonts/              # Custom fonts
│   └── favicon.svg
├── src/
│   ├── assets/             # Images organized by section
│   │   ├── home/
│   │   ├── icons/
│   │   ├── fintech/
│   │   ├── healthtech/
│   │   ├── retail/
│   │   └── saas/
│   ├── components/
│   │   ├── about/          # About page components
│   │   ├── clients/        # Client showcase
│   │   ├── home/           # Homepage sections
│   │   ├── impact/         # Impact/solutions section
│   │   ├── layout/         # Header, Footer, Navigation
│   │   ├── services/       # Service pages components
│   │   └── team/           # Team section
│   ├── data/
│   │   └── social-links.ts # Centralized social media links
│   ├── layouts/
│   │   └── Layout.astro    # Main layout template
│   ├── pages/              # File-based routing
│   │   ├── index.astro     # Homepage
│   │   ├── about.astro     # About page
│   │   ├── cases.astro     # Case studies
│   │   ├── contact.astro   # Contact page
│   │   ├── services.astro  # Services overview
│   │   ├── fintech.astro   # FinTech services
│   │   ├── healthtech.astro # HealthTech services
│   │   ├── retail.astro    # Retail services
│   │   ├── saas.astro      # SaaS services
│   │   └── 404.astro       # 404 error page
│   ├── styles/
│   │   ├── global.css      # Global styles & CSS variables
│   │   └── index.css       # Homepage specific styles
│   └── utils/
│       └── url.ts          # URL utilities (withBase)
├── astro.config.mjs        # Astro configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Design System

The project uses a custom design system with centralized CSS variables:

### Color Palette

- **Primary**: `#00616c` (Teal)
- **Primary Light**: `#03b3cb` (Cyan)
- **Blue**: `#3b86a2`
- **Blue Light**: `#5abfd7`
- **Teal**: `#36808f`
- **Neutral Light**: `#ececea`
- **Text Dark**: `#3b3b3b`

All colors are defined in `src/styles/global.css` and should be used via Tailwind classes.

## ⚡ Key Features

- **🎨 Custom Design System** - Unique Jaya brand identity with rounded corners and custom shapes
- **🗺️ Interactive US Map** - Hover states showing client locations and case studies
- **📱 Fully Responsive** - Mobile-first design that works on all devices
- **♿ Accessible** - Semantic HTML and ARIA attributes
- **🚀 Performance Optimized** - Static generation with Astro's Islands Architecture
- **🔍 SEO Friendly** - Meta tags, sitemap, and robots.txt
- **📊 Analytics Ready** - Structured for easy integration
- **🎯 Smooth Scrolling** - Anchor navigation with offset for fixed header
- **🔗 Centralized Configuration** - Social links and external URLs in one place

## 🏗️ Code Organization

### Style Guidelines

The project follows strict CSS organization rules (see `.cursor/rules/jaya-style-guide.mdc`):

- Grouped `@apply` directives by category (layout, spacing, colors, etc)
- Background and text properties on separate lines
- Centralized color variables (no hardcoded hex values)
- Alias imports (`@/`) instead of relative paths

### Key Patterns

**Social Links:**

```typescript
import { socialLinks } from '@/data/social-links'
<a href={socialLinks.linkedin}>LinkedIn</a>
```

**Path Aliases:**

```typescript
import Component from '@/components/Component.astro'
@reference '@/styles/global.css'
```

**Active States:**

```javascript
const ACTIVE_STATES = ['CA', 'TX', 'IL', 'NY']
ACTIVE_STATES.forEach((id) => {
	document.getElementById(id)?.classList.add('active-state')
})
```

## 🚀 Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/olivamkt/jaya.git
   cd jaya
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open your browser at `http://localhost:4321/jaya/`

## 📦 Available Commands

| Command        | Action                           |
| :------------- | :------------------------------- |
| `pnpm dev`     | Start local development server   |
| `pnpm build`   | Build site for production        |
| `pnpm preview` | Preview production build locally |
| `pnpm astro`   | Run Astro CLI commands           |

## 🌐 Pages

- **/** - Homepage with hero, services, map, impact, clients, and team sections
- **/about** - Company information and culture
- **/cases** - Client case studies and success stories
- **/contact** - Contact form and information
- **/fintech** - FinTech services details
- **/healthtech** - HealthTech services details
- **/retail** - Retail services details
- **/saas** - SaaS services details

## 🎨 Brand Colors

Access colors via Tailwind classes or CSS variables:

```css
/* Tailwind classes */
.text-primary
.bg-primary-light
.text-text-dark

/* CSS variables */
var(--color-primary)
var(--color-primary-light)
var(--color-text-dark)
```

See `src/styles/global.css` for the complete color system.

## 🔧 Configuration

### Base URL

The site is configured for GitHub Pages deployment with base path `/jaya/`. This is set in `astro.config.mjs`:

```javascript
export default defineConfig({
	site: 'https://olivamkt.github.io/jaya/',
	base: '/jaya/'
	// ...
})
```

### Social Links

Update social media links in `src/data/social-links.ts`:

```typescript
export const socialLinks = {
	linkedin: 'https://www.linkedin.com/company/jaya-apps',
	github: 'https://github.com/jaya',
	medium: 'https://jayaj.medium.com'
}
```

## 📝 Development Guidelines

See `.cursor/rules/jaya-style-guide.mdc` for detailed coding standards including:

- CSS @apply organization rules
- Import path conventions
- Color usage guidelines
- JavaScript/TypeScript patterns

---

## 🚀 Deployment

### Live Site

- **Production URL**: https://olivamkt.github.io/jaya/
- **Repository**: https://github.com/olivamkt/jaya

### GitHub Actions (Automated)

The project uses automated deployment via GitHub Actions:

1. **Workflow File**: `.github/workflows/deploy.yml`
2. **Triggers**:
   - Automatic deployment on push to `main` branch
   - Manual deployment via GitHub Actions tab
3. **Settings**: Go to **Settings → Pages** → Source: **GitHub Actions**

### Manual Deployment

If needed:

1. **Build the project:**

   ```bash
   pnpm build
   ```

2. **Preview locally (optional):**

   ```bash
   pnpm preview
   ```

3. **Push to repository:**

   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```

4. GitHub Actions will automatically deploy

### Testing Before Deployment

1. Build for production: `pnpm build`
2. Preview: `pnpm preview`
3. Test at `http://localhost:4321/jaya/`
4. Verify all links, navigation, and base path

### Troubleshooting

**404 Errors:**

- Verify `base: '/jaya/'` in `astro.config.mjs` matches repository name
- Check GitHub Pages is enabled in repository settings

**Assets Not Loading:**

- Use `withBase()` utility for all internal links
- Check font paths include `/jaya/` prefix in `global.css`

**Deployment Failed:**

- Check Actions tab for error details
- Verify `pnpm-lock.yaml` is committed

### Deployment Notes

- Site uses **static generation** (all pages pre-rendered)
- Deployment takes 1-3 minutes after push
- No server-side rendering or API routes

---

## 📄 License

MIT - See the [LICENSE](LICENSE) file for details.
