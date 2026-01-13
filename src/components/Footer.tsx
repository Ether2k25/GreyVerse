'use client'

import { motion } from 'framer-motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { text: 'Partner with us', href: 'mailto:partnerships@greygaming.com' },
    { text: 'Compliance', href: 'mailto:compliance@greygaming.com' },
    { text: 'Privacy', href: 'mailto:privacy@greygaming.com' },
    { text: 'Contact', href: 'mailto:hello@greygaming.com' },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 4 }}
      className="relative z-10 border-t border-accent/20 bg-charcoal/50 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {footerLinks.map((link, index) => (
              <motion.a
                key={link.text}
                href={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.2 + index * 0.1 }}
                className="text-sm text-accent hover:text-neon transition-colors duration-300 focus:outline-none focus:text-neon"
              >
                {link.text}
              </motion.a>
            ))}
          </nav>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.6 }}
            className="text-xs text-accent text-center sm:text-right"
          >
            © {currentYear} GREY GAMING. All rights reserved.
          </motion.p>
        </div>
      </div>
    </motion.footer>
  )
}
