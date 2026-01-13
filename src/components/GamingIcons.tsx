'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  Coins, 
  Trophy, 
  Target, 
  Zap, 
  Star, 
  Crown,
  Dice1,
  Dice6
} from 'lucide-react'

// Custom SVG icons for specific gaming elements
const HorseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5s-.96.06-1.42.17L8.41 3 7 4.41l1.63 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-8 9c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
  </svg>
)

const CricketIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M15.04 12.79l-8.5-8.5c-.78-.78-2.05-.78-2.83 0s-.78 2.05 0 2.83l8.5 8.5c.78.78 2.05.78 2.83 0s.78-2.05 0-2.83zm-2.83-2.83L9.38 7.13l2.83 2.83 2.83-2.83zm5.66 5.66l-2.83-2.83-2.83 2.83 2.83 2.83z"/>
    <circle cx="18" cy="6" r="2"/>
  </svg>
)

const FootballIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
)

const SlotIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
  </svg>
)

interface GamingIconsProps {
  customIcons?: Array<{
    src: string
    label: string
  }>
}

export function GamingIcons({ customIcons }: GamingIconsProps) {
  const defaultIcons = [
    { Icon: HorseIcon, label: 'Horse Racing', delay: 0 },
    { Icon: Coins, label: 'Coin Toss', delay: 0.1 },
    { Icon: CricketIcon, label: 'Cricket', delay: 0.2 },
    { Icon: FootballIcon, label: 'Football', delay: 0.3 },
    { Icon: Dice1, label: 'Dice Games', delay: 0.4 },
    { Icon: SlotIcon, label: 'Slots', delay: 0.5 },
    { Icon: Trophy, label: 'Tournaments', delay: 0.6 },
    { Icon: Crown, label: 'VIP Games', delay: 0.7 },
  ]

  const icons = customIcons || defaultIcons

  return (
    <div className="flex justify-center items-center gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto pb-4">
      {customIcons ? (
        customIcons.map((icon, index) => (
          <motion.div
            key={icon.label}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1,
              type: 'spring',
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.2,
              rotate: 10,
              transition: { duration: 0.2 }
            }}
            className="group relative"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                delay: index * 0.2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 relative flex-shrink-0"
            >
              <Image
                src={icon.src}
                alt={icon.label}
                width={64}
                height={64}
                className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 blur-sm"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Image
                  src={icon.src}
                  alt={icon.label}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain opacity-30"
                />
              </motion.div>
            </motion.div>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileHover={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-charcoal/90 text-accent text-xs rounded whitespace-nowrap pointer-events-none border border-accent/20"
            >
              {icon.label}
            </motion.div>

            {/* Pulse ring on hover */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-neon/30"
              initial={{ scale: 1, opacity: 0 }}
              whileHover={{
                scale: [1, 1.5, 1],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeOut'
              }}
            />
          </motion.div>
        ))
      ) : (
        defaultIcons.map(({ Icon, label, delay }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: delay,
              type: 'spring',
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.2,
              rotate: 10,
              transition: { duration: 0.2 }
            }}
            className="group relative"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                delay: delay * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-neon/80 group-hover:text-neon transition-colors duration-300 relative flex-shrink-0"
            >
              <Icon />
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 text-neon/30 blur-sm"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  delay: delay,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Icon />
              </motion.div>
            </motion.div>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-charcoal/90 text-accent text-xs rounded whitespace-nowrap pointer-events-none border border-accent/20"
          >
            {label}
          </motion.div>

            {/* Pulse ring on hover */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-neon/30"
              initial={{ scale: 1, opacity: 0 }}
              whileHover={{
                scale: [1, 1.5, 1],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeOut'
              }}
            />
          </motion.div>
        ))
      )}
    </div>
  )
}
