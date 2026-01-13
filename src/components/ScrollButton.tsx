'use client'

import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useEffect } from 'react'

export function ScrollButton() {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Check if user is at the bottom (within 50px)
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 50
      setIsAtBottom(isNearBottom)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollClick = () => {
    if (isAtBottom) {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Scroll to footer
      const footer = document.querySelector('footer')
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <motion.button
      onClick={handleScrollClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.5 }}
      className="fixed bottom-8 z-50 group cursor-pointer focus:outline-none"
      style={{ left: '47%', transform: 'translateX(-47%)' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center"
      >
        <motion.div
          className="w-12 h-12 border-2 border-neon rounded-full flex items-center justify-center bg-neon/10 backdrop-blur-sm group-hover:bg-neon/20 transition-all duration-300"
          animate={{ 
            boxShadow: [
              '0 0 0 0 rgba(255, 255, 255, 0.4)',
              '0 0 0 8px rgba(255, 255, 255, 0)',
              '0 0 0 0 rgba(255, 255, 255, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            key={isAtBottom ? 'up' : 'down'}
            initial={{ rotate: isAtBottom ? 0 : 180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isAtBottom ? (
              <ChevronUp className="w-6 h-6 text-neon" />
            ) : (
              <ChevronDown className="w-6 h-6 text-neon" />
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.button>
  )
}
