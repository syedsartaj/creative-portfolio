'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Behance', href: 'https://behance.net' },
    { name: 'Dribbble', href: 'https://dribbble.com' },
    { name: 'Twitter', href: 'https://twitter.com' },
  ]

  const footerLinks = [
    { name: 'Work', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Journal', href: '/journal' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-space text-2xl font-bold mb-4 tracking-wider">STUDIO</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              A creative studio exploring the intersection of art, design, and technology.
            </p>
            <div className="mt-6 h-px w-16 bg-yellow" />
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-space text-sm tracking-wider uppercase mb-6 text-yellow">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-space text-sm tracking-wider uppercase mb-6 text-yellow">
              Follow
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm group inline-flex items-center"
                  >
                    {link.name}
                    <svg
                      className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-space text-sm tracking-wider uppercase mb-6 text-yellow">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-white/60">
                <a
                  href="mailto:hello@studio.com"
                  className="hover:text-white transition-colors duration-300"
                >
                  hello@studio.com
                </a>
              </p>
              <p className="text-white/60">
                Based in New York
                <br />
                Working Worldwide
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/40 text-xs">
              &copy; {currentYear} STUDIO. All rights reserved.
            </p>

            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-white/40 hover:text-white text-xs transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/40 hover:text-white text-xs transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Artistic Element */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-yellow to-transparent" />
          </motion.div>
        </motion.div>

        {/* Back to Top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-12 mx-auto block group"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-px h-12 bg-yellow/50 group-hover:bg-yellow transition-colors" />
            <span className="text-xs text-white/40 group-hover:text-white tracking-wider uppercase">
              Back to Top
            </span>
          </div>
        </motion.button>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="grid-pattern h-full w-full" />
      </div>
    </footer>
  )
}
