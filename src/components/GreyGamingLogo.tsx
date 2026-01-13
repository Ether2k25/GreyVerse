'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface GreyGamingLogoProps {
  customLogo?: string
  backgroundImage?: string
}

export function GreyGamingLogo({ customLogo, backgroundImage }: GreyGamingLogoProps) {
  return (
    <div className="relative">
      {/* Background Image */}
      {backgroundImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.1 }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src={backgroundImage}
            alt=""
            width={600}
            height={400}
            className="w-full h-full object-cover rounded-full opacity-20"
            priority
          />
          {/* Background overlay for better contrast */}
          <div className="absolute inset-0 bg-charcoal/60 rounded-full" />
        </motion.div>
      )}

      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full neon-glow"
        animate={{
          scale: [0.9, 1.05, 0.9],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
      
      {/* External shimmer sweep effect - outside the logo */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-20"
        animate={{
          x: ['-100%', '100%', '-100%'],
        }}
        transition={{
          duration: 4,
          delay: 3,
          repeat: Infinity,
          repeatDelay: 5,
          ease: 'easeInOut',
        }}
        style={{
          filter: 'blur(1px)',
        }}
      />
      
      {/* Logo container */}
      <div className="relative z-10 p-8 sm:p-12">
        {customLogo ? (
          <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 800 200"
            className="w-full h-auto min-h-[120px] sm:min-h-[160px] lg:min-h-[220px] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            {/* Shimmer effect overlay */}
            <defs>
              <linearGradient id="shimmerCustom" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.6)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <mask id="logoMask">
                <rect width="100%" height="100%" fill="black" />
                <image
                  href={customLogo}
                  x="0"
                  y="0"
                  width="800"
                  height="200"
                  preserveAspectRatio="xMidYMid slice"
                />
              </mask>
            </defs>

            {/* Main logo image with glow effects */}
            <motion.image
              href={customLogo}
              x="0"
              y="0"
              width="800"
              height="200"
              preserveAspectRatio="xMidYMid slice"
              className="text-glow"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3)) drop-shadow(0 0 10px rgba(255,255,255,0.5))',
              }}
              animate={{
                filter: [
                  'drop-shadow(0 0 20px rgba(255,255,255,0.3)) drop-shadow(0 0 10px rgba(255,255,255,0.5))',
                  'drop-shadow(0 0 30px rgba(255,255,255,0.5)) drop-shadow(0 0 15px rgba(255,255,255,0.7))',
                  'drop-shadow(0 0 20px rgba(255,255,255,0.3)) drop-shadow(0 0 10px rgba(255,255,255,0.5))',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

          </motion.svg>
        ) : (
          <div className="w-full h-auto min-h-[120px] sm:min-h-[160px] lg:min-h-[220px] max-w-md mx-auto flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-neon text-center"
            >
              GG
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
