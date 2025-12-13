# Creative Portfolio Blog Template

An artistic, gallery-style blog template built for designers, artists, and creative professionals. Features a striking visual design with masonry galleries, full-width images, and portfolio-style presentation.

## Features

- **Artistic Design System**: Black, white, and accent yellow color palette with sophisticated typography
- **Gallery Masonry Layout**: Beautiful image grid with lightbox functionality
- **Portfolio Case Studies**: Showcase creative work with detailed project presentations
- **Minimal Branding**: Clean "STUDIO" branding with elegant navigation
- **Smooth Animations**: Framer Motion powered transitions and hover effects
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **MongoDB Integration**: Store and manage blog posts and gallery images
- **AI Content Generation**: OpenAI integration for creative writing assistance
- **SEO Optimized**: Built-in meta tags and semantic HTML

## Design Philosophy

This template embraces minimalism and bold visual statements. The stark black and white palette provides maximum contrast, while strategic yellow accents draw attention to key elements. Typography combines the geometric Space Grotesk with the elegant Playfair Display for a sophisticated artistic feel.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Database**: MongoDB
- **AI**: OpenAI GPT-4 & DALL-E
- **Typography**: Google Fonts (Space Grotesk + Playfair Display)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)
- OpenAI API key (optional, for AI features)

### Installation

1. Clone or download this template:
   ```bash
   cd creative-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your credentials:
   - `MONGODB_URI`: Your MongoDB connection string
   - `OPENAI_API_KEY`: Your OpenAI API key (optional)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
creative-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Home page with gallery and case studies
│   └── globals.css         # Global styles and custom utilities
├── components/
│   ├── Header.tsx          # Minimal navbar with STUDIO branding
│   ├── Footer.tsx          # Artistic footer with links
│   ├── BlogCard.tsx        # Portfolio-style post cards
│   └── GalleryGrid.tsx     # Masonry image gallery with lightbox
├── lib/
│   ├── db.ts               # MongoDB connection and queries
│   └── openai.ts           # AI content generation functions
└── public/                 # Static assets
```

## Key Components

### Header
Minimal navigation with animated "STUDIO" logo and smooth mobile menu.

### GalleryGrid
Masonry layout image gallery with:
- Responsive columns (1-3 based on screen size)
- Hover effects with image scaling
- Lightbox modal for full-size viewing
- Click-outside-to-close functionality

### BlogCard
Portfolio-style cards featuring:
- Category badges
- Hover animations with scale and rotation
- Gradient overlays
- Read time and metadata
- Animated underlines

### Footer
Artistic footer with:
- Navigation links
- Social media links
- Contact information
- Decorative gradient line
- Back-to-top button

## Customization

### Colors
Edit colors in `tailwind.config.ts` and `app/globals.css`:
```css
:root {
  --color-black: #000000;
  --color-white: #ffffff;
  --color-yellow: #ffd700;
}
```

### Typography
Fonts are configured in `app/layout.tsx`:
- Space Grotesk (headings, UI)
- Playfair Display (display text)

### Content
Update sample content in `app/page.tsx`:
- Featured work
- Case studies array
- Gallery images
- Process steps

## Database Schema

### Posts Collection
```javascript
{
  id: string,
  title: string,
  excerpt: string,
  content: string,
  author: string,
  date: Date,
  image: string,
  category: string,
  readTime: string,
  featured: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Gallery Collection
```javascript
{
  url: string,
  title: string,
  description: string,
  uploadDate: Date,
  tags: string[]
}
```

## AI Features

### Generate Blog Posts
```typescript
import { generateBlogPost } from '@/lib/openai'

const content = await generateBlogPost("Write about color theory in design")
```

### Generate Case Studies
```typescript
import { generateCaseStudy } from '@/lib/openai'

const caseStudy = await generateCaseStudy({
  title: "Brand Identity for FLUX",
  category: "Branding",
  objective: "Create a contemporary art space identity"
})
```

### Generate Images
```typescript
import { generateImage } from '@/lib/openai'

const imageUrl = await generateImage("Abstract geometric composition")
```

## Performance

- Image optimization with Next.js Image component
- Lazy loading for below-fold content
- Code splitting with App Router
- CSS optimization with Tailwind
- Smooth 60fps animations with Framer Motion

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Other Platforms
Build for production:
```bash
npm run build
npm run start
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus visible indicators
- Reduced motion support
- Alt text for images

## License

MIT License - feel free to use for personal or commercial projects.

## Credits

- Design: Custom artistic portfolio design
- Fonts: Google Fonts (Space Grotesk, Playfair Display)
- Images: Unsplash (sample images)
- Icons: Heroicons (SVG icons)

## Support

For issues or questions:
1. Check the documentation
2. Review sample code
3. Open an issue on GitHub

---

**Built for creatives, by creatives.**

Transform your portfolio into an artistic statement.
