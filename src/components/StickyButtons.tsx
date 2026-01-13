'use client'

import { motion } from 'framer-motion'
import { Facebook, Instagram, Mail } from 'lucide-react'

// Custom TikTok Icon Component
const TikTokIcon = (props: any) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.43z"/>
  </svg>
)

export function StickyButtons() {
  const leftButtons = [
    {
      icon: Facebook,
      label: 'Facebook',
      href: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com/greygaming',
      color: '#1877F2'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/greygaming2025',
      color: '#E4405F'
    }
  ]

  const rightButtons = [
    {
      icon: TikTokIcon,
      label: 'TikTok',
      href: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://tiktok.com/@greygaming25',
      color: '#000000'
    },
    {
      icon: Mail,
      label: 'Email',
      href: process.env.NEXT_PUBLIC_EMAIL_URL || 'mailto:greygaming247@gmail.com',
      color: '#EA4335'
    }
  ]

  const ButtonGroup = ({ buttons, position }: { buttons: any[], position: 'left' | 'right' }) => (
    <div className={`fixed ${position === 'left' ? 'left-4' : 'right-4'} bottom-4 z-50 flex flex-col gap-3`}>
      {buttons.map((button, index) => (
        <motion.a
          key={button.label}
          href={button.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0, [position]: -100 }}
          animate={{ opacity: 1, scale: 1, [position]: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 3 + index * 0.1,
            type: 'spring',
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 0 25px rgba(255, 255, 255, 0.4)'
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative w-12 h-12 sm:w-16 sm:h-16 rounded-full glass neon-glow flex items-center justify-center transition-all duration-300 hover:bg-neon/10 focus:outline-none focus:ring-2 focus:ring-neon/50"
          aria-label={button.label}
          style={{
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            paddingLeft: position === 'left' ? 'env(safe-area-inset-left, 0px)' : '0px',
            paddingRight: position === 'right' ? 'env(safe-area-inset-right, 0px)' : '0px',
          }}
        >
          <button.icon 
            className="w-5 h-5 sm:w-6 sm:h-6 text-neon transition-colors duration-300 group-hover:text-white" 
          />
          
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className={`absolute ${position === 'left' ? 'left-full ml-3' : 'right-full mr-3'} top-1/2 transform -translate-y-1/2 px-3 py-2 bg-charcoal/90 text-neon text-sm rounded-lg whitespace-nowrap pointer-events-none border border-accent/20`}
          >
            {button.label}
            <div 
              className={`absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-charcoal/90 border-accent/20 rotate-45 ${
                position === 'left' ? '-left-1 border-r border-b' : '-right-1 border-l border-t'
              }`} 
            />
          </motion.div>

          {/* Pulse effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-neon/30"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut'
            }}
          />
        </motion.a>
      ))}
    </div>
  )

  return (
    <>
      <ButtonGroup buttons={leftButtons} position="left" />
      <ButtonGroup buttons={rightButtons} position="right" />
    </>
  )
}
