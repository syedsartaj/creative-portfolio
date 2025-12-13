'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface BlogCardProps {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  image: string
  category: string
  readTime: string
}

export default function BlogCard({
  id,
  title,
  excerpt,
  author,
  date,
  image,
  category,
  readTime
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <Link href={`/blog/${id}`}>
      <motion.article
        className="group cursor-pointer"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-white/5">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category Badge */}
          <motion.div
            className="absolute top-4 left-4 bg-yellow text-black px-3 py-1 text-xs font-space tracking-wider uppercase"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {category}
          </motion.div>

          {/* Hover Arrow */}
          <motion.div
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
          >
            <div className="w-12 h-12 bg-yellow rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Title */}
          <h3 className="font-playfair text-2xl leading-tight group-hover:text-yellow transition-colors duration-300">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
            {excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center space-x-4">
              <span className="text-xs text-white/40 font-space uppercase tracking-wide">
                {author}
              </span>
              <span className="text-white/20">•</span>
              <time className="text-xs text-white/40 font-space" dateTime={date}>
                {formattedDate}
              </time>
            </div>

            <span className="text-xs text-yellow font-space uppercase tracking-wide">
              {readTime}
            </span>
          </div>

          {/* Animated Underline */}
          <div className="relative">
            <motion.div
              className="h-px bg-yellow"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
