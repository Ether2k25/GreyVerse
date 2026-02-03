
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MousePointerClick } from 'lucide-react'
import { GreyGamingLogo } from './GreyGamingLogo'

export function HeroSection() {
  const buttonText = 'Enter the GreyVerse'
  const [attention, setAttention] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [ctaTextDone, setCtaTextDone] = useState(false)
  const ctaWrapperRef = useRef<HTMLDivElement | null>(null)
  const ctaTextRef = useRef<HTMLSpanElement | null>(null)
  const [cursorLeftPx, setCursorLeftPx] = useState<number | null>(null)

  const mediaSources = useMemo(
    () => [
      '/Gifs/coin toss.gif',
      '/Gifs/Horse Racing.mp4',
      '/Gifs/penalty.mp4',
      '/Gifs/bowled.mp4',
      '/Gifs/six.mp4',
      '/Gifs/Crash.mp4',
    ],
    []
  )

  const isVideo = (src: string) => src.toLowerCase().endsWith('.mp4')

  useEffect(() => {
    const alreadyClicked = localStorage.getItem('gg-cta-clicked') === 'true'
    setClicked(alreadyClicked)
    if (alreadyClicked) return

    const timeoutId = window.setTimeout(() => {
      setAttention(true)
    }, 5000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 22, scale: 0.98, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        delay: 1.2,
        ease: 'easeOut',
      },
    },
  }

  const textContainerVariants = {
    hidden: { opacity: 0.99 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 1.55,
        when: 'afterChildren',
        duration: 0.01,
      },
    },
  }

  const charVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  }

  useEffect(() => {
    const updateCursorPosition = () => {
      if (!ctaTextDone) return
      const wrapper = ctaWrapperRef.current
      const textEl = ctaTextRef.current
      if (!wrapper || !textEl) return

      const wrapperRect = wrapper.getBoundingClientRect()
      const textRect = textEl.getBoundingClientRect()
      const gap = 12

      const rawLeft = textRect.right - wrapperRect.left + gap
      const maxLeft = Math.max(0, wrapperRect.width - 22)
      const clampedLeft = Math.min(Math.max(0, rawLeft), maxLeft)
      setCursorLeftPx(clampedLeft)
    }

    updateCursorPosition()
    window.addEventListener('resize', updateCursorPosition)
    return () => {
      window.removeEventListener('resize', updateCursorPosition)
    }
  }, [ctaTextDone])

  return (
    <section className="min-h-screen flex flex-col items-center justify-start pt-14 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-12 opacity-60"
        >
          <GreyGamingLogo 
            customLogo={process.env.NEXT_PUBLIC_CUSTOM_LOGO} 
          />
        </motion.div>

        {/* Surprise CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-10 flex justify-center"
        >
          <div ref={ctaWrapperRef} className="relative inline-flex">
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: [14, 0, 0, 0, 14],
                scale: [0.98, 1, 1, 1, 0.98],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span
                className="absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ease-out"
                style={
                  cursorLeftPx === null
                    ? { left: '70%', opacity: 0 }
                    : { left: cursorLeftPx, opacity: ctaTextDone ? 1 : 0 }
                }
              >
                <motion.span
                  className="absolute left-1.5 top-1.5 h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-neon/50"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: [0, 0.6, 0], scale: [0.6, 1.25, 1.6] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.2, ease: 'easeOut' }}
                />
                <motion.span
                  animate={{ scale: [1, 0.92, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
                  className="inline-flex rounded-full border border-neon/30 bg-charcoal/40 p-2 text-neon/90 backdrop-blur-sm"
                >
                  <MousePointerClick className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.span>
              </span>
            </motion.span>

            <Link href="/world" legacyBehavior>
              <motion.a
                onClick={() => {
                  localStorage.setItem('gg-cta-clicked', 'true')
                  setClicked(true)
                  setAttention(false)
                }}
                animate={
                  attention && !clicked
                    ? {
                        boxShadow: [
                          '0 0 0 rgba(255,255,255,0)',
                          '0 0 34px rgba(255,255,255,0.7), 0 0 90px rgba(255,255,255,0.22)',
                          '0 0 0 rgba(255,255,255,0)',
                        ],
                        scale: [1, 1.04, 1],
                      }
                    : {
                        boxShadow: [
                          '0 0 18px rgba(255,255,255,0.22), 0 0 40px rgba(255,255,255,0.08)',
                          '0 0 22px rgba(255,255,255,0.28), 0 0 48px rgba(255,255,255,0.1)',
                          '0 0 18px rgba(255,255,255,0.22), 0 0 40px rgba(255,255,255,0.08)',
                        ],
                      }
                }
                transition={
                  attention && !clicked
                    ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
                }
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg border-2 border-neon bg-neon/10 px-8 py-4 font-headline text-base sm:text-lg font-semibold text-neon transition-all duration-300 hover:bg-neon hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-neon/50"
              >
              <motion.span
                variants={textContainerVariants}
                initial="hidden"
                animate="visible"
                onAnimationComplete={() => setCtaTextDone(true)}
                aria-label={buttonText}
                className="relative z-10"
              >
                <span ref={ctaTextRef}>
                  {buttonText.split('').map((char, index) => (
                    <motion.span
                      key={`${char}-${index}`}
                      variants={charVariants}
                      className="inline-block"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </span>
              </motion.span>

              <motion.div
                className="absolute inset-0 bg-neon/10"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-y-8 -left-1/2 w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0"
                animate={{
                  x: ['-40%', '40%'],
                  opacity: attention && !clicked ? [0, 1, 0] : [0, 0.55, 0],
                }}
                transition={
                  attention && !clicked
                    ? { duration: 1.05, repeat: Infinity, repeatDelay: 1.1, ease: 'easeInOut' }
                    : { duration: 1.6, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }
                }
              />
            </motion.a>
          </Link>
          </div>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1 }}
          className="text-lg sm:text-xl lg:text-2xl text-mist mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Built to outpace, outscale, and outlast - welcome to the future of iGaming.
        </motion.p>

        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {mediaSources.map((src) => (
            <div
              key={src}
              className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-charcoal/20 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
            >
              {isVideo(src) ? (
                <video
                  key={src}
                  src={src}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                />
              ) : (
                <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-white/5" />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
