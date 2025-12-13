'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import BlogCard from '@/components/BlogCard'
import GalleryGrid from '@/components/GalleryGrid'

const featuredWork = {
  title: "Visual Identity for FLUX",
  category: "Branding",
  description: "A complete brand identity system for a contemporary art space, exploring the intersection of digital and physical experiences.",
  image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&h=900&fit=crop",
  year: "2024"
}

const caseStudies = [
  {
    id: '1',
    title: 'Kinetic Typography Exploration',
    excerpt: 'Experimenting with motion and type to create dynamic visual narratives.',
    author: 'Studio',
    date: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop',
    category: 'Typography',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Minimalist Product Photography',
    excerpt: 'Finding beauty in simplicity through careful composition and lighting.',
    author: 'Studio',
    date: '2024-03-10',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
    category: 'Photography',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Generative Art Systems',
    excerpt: 'Creating algorithmic art that evolves and responds to its environment.',
    author: 'Studio',
    date: '2024-03-05',
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=600&fit=crop',
    category: 'Digital Art',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'Editorial Design: The Future Issue',
    excerpt: 'A bold editorial direction exploring speculative futures and design fiction.',
    author: 'Studio',
    date: '2024-02-28',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=600&fit=crop',
    category: 'Editorial',
    readTime: '7 min read'
  },
  {
    id: '5',
    title: 'Spatial Design for XR',
    excerpt: 'Designing immersive experiences that blur the line between real and virtual.',
    author: 'Studio',
    date: '2024-02-20',
    image: 'https://images.unsplash.com/photo-1617802690658-1173a812650d?w=800&h=600&fit=crop',
    category: 'XR Design',
    readTime: '8 min read'
  },
  {
    id: '6',
    title: 'Color Theory in Practice',
    excerpt: 'Deep dive into color relationships and emotional impact in visual design.',
    author: 'Studio',
    date: '2024-02-15',
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800&h=600&fit=crop',
    category: 'Theory',
    readTime: '5 min read'
  }
]

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop', title: 'Abstract Composition' },
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', title: 'Mountain Light' },
  { url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&h=600&fit=crop', title: 'Urban Geometry' },
  { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=900&fit=crop', title: 'Still Life Study' },
  { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop', title: 'Natural Forms' },
  { url: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&h=800&fit=crop', title: 'Digital Dreams' },
]

export default function Home() {
  return (
    <>
      {/* Hero Section - Full Width Featured Work */}
      <section className="relative h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
        <Image
          src={featuredWork.image}
          alt={featuredWork.title}
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 h-full flex items-end">
          <motion.div
            className="container mx-auto px-6 pb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-yellow font-space text-sm tracking-[0.2em] uppercase mb-4">
              {featuredWork.category} — {featuredWork.year}
            </p>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl mb-6 max-w-4xl">
              {featuredWork.title}
            </h1>
            <p className="font-space text-lg md:text-xl max-w-2xl text-white/80">
              {featuredWork.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl">Selected Work</h2>
              <div className="h-px bg-yellow w-24" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogCard {...post} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section - Masonry Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-16 text-center">
              <h2 className="font-playfair text-4xl md:text-5xl text-black mb-4">
                Gallery
              </h2>
              <p className="font-space text-black/60">
                Visual explorations and experiments
              </p>
            </div>

            <GalleryGrid images={galleryImages} />
          </motion.div>
        </div>
      </section>

      {/* Statement Section - Full Width */}
      <section className="py-32 bg-yellow">
        <motion.div
          className="container mx-auto px-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl text-black max-w-5xl mx-auto leading-tight">
            We believe great design is the intersection of art, technology, and human experience.
          </h2>
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl mb-20">Our Process</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="border-l-2 border-yellow pl-6">
                <h3 className="font-space text-2xl mb-4 text-yellow">01. Discover</h3>
                <p className="text-white/70">
                  Deep research and exploration to understand the core challenge and opportunities.
                </p>
              </div>
              <div className="border-l-2 border-yellow pl-6">
                <h3 className="font-space text-2xl mb-4 text-yellow">02. Create</h3>
                <p className="text-white/70">
                  Iterative design process blending intuition with systematic experimentation.
                </p>
              </div>
              <div className="border-l-2 border-yellow pl-6">
                <h3 className="font-space text-2xl mb-4 text-yellow">03. Refine</h3>
                <p className="text-white/70">
                  Meticulous attention to detail, perfecting every element of the final work.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
