'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

type Game = {
  title: string
  status: 'Launched' | 'In the lineup'
  genre?: string
  description: string
  tags?: string[]
  url?: string
  imageSrc?: string
}

const launchedGames: Game[] = [
  {
    title: 'Ball by Ball',
    status: 'Launched',
    description: 'Live and ready inside the Grey World.',
    url: 'https://www.icecric247.com/sport/ball-event-detail/40001',
    imageSrc: '/ball by ball.png',
  },
  {
    title: 'Lucky15 Balls',
    status: 'Launched',
    description: 'Live and ready inside the Grey World.',
    url: 'https://www.icecric247.com/sport/ball-event-detail/40017',
    imageSrc: '/lucky15 balls.png',
  },
  {
    title: 'Horse Racing',
    status: 'Launched',
    description: 'Live and ready inside the Grey World.',
    url: 'https://www.icecric247.com/sport/ball-event-detail/40025',
    imageSrc: '/horse racing.png',
  },
  {
    title: 'Coin Toss',
    status: 'Launched',
    description: 'Live and ready inside the Grey World.',
    url: 'https://www.icecric247.com/sport/ball-event-detail/40037',
    imageSrc: '/coin toss.png',
  },
  {
    title: '7 Coins Toss',
    status: 'Launched',
    description: 'Live and ready inside the Grey World.',
    url: 'https://www.icecric247.com/sport/ball-event-detail/40041',
    imageSrc: '/7 coin toss.png',
  },
  {
    title: 'Penalty Shootout',
    status: 'Launched',
    description: 'Live and ready inside the Grey World.',
    url: 'https://www.icecric247.com/sport/ball-event-detail/40045',
    imageSrc: '/penalty.png',
  },
]

const lineupGames: Game[] = [
  {
    title: 'Super Over',
    status: 'In the lineup',
    description: 'Coming soon in the Grey World lineup.',
    url: 'https://www.icecric247.com',
    imageSrc: '/GG.png',
  },
  {
    title: 'GreyWings (Aviator)',
    status: 'In the lineup',
    description: 'Coming soon in the Grey World lineup.',
    url: 'https://www.icecric247.com',
    imageSrc: '/GG.png',
  },
]

function GameCard({ game, onOpen }: { game: Game; onOpen?: (game: Game) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass rounded-2xl p-6 border border-accent/20"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-headline font-semibold text-neon">
            {game.title}
          </h3>
          {game.genre ? (
            <p className="mt-1 text-sm text-accent">{game.genre}</p>
          ) : null}
        </div>
        <span className="shrink-0 rounded-full border border-neon/40 bg-neon/10 px-3 py-1 text-xs font-semibold text-neon">
          {game.status}
        </span>
      </div>

      {game.imageSrc ? (
        <div className="mt-4">
          <div className="mx-auto w-full max-w-[200px]">
            <div className="relative">
              <motion.div
                aria-hidden="true"
                className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-white/10 blur-xl"
                animate={{
                  opacity: [0.35, 0.65, 0.35],
                  scale: [0.98, 1.05, 0.98],
                  rotate: [0, 6, 0],
                }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-3xl"
                style={{
                  background:
                    'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.12), transparent 60%)',
                  filter: 'blur(14px)',
                }}
                animate={{ opacity: [0.25, 0.5, 0.25] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="relative overflow-hidden rounded-xl border border-accent/20 bg-charcoal/40">
                <div className="relative aspect-[200/267] w-full">
                  <Image
                    src={game.imageSrc}
                    alt={game.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 200px"
                    className="object-cover"
                    priority={game.status === 'Launched'}
                  />
                </div>

                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-y-8 -left-1/2 w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0"
                  animate={{ x: ['-35%', '35%'], opacity: [0, 0.55, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <p className="mt-4 text-mist leading-relaxed">{game.description}</p>

      {game.url ? (
        <div className="mt-6">
          {onOpen ? (
            <button
              type="button"
              onClick={() => onOpen(game)}
              className="inline-flex items-center justify-center rounded-lg border border-neon/40 bg-neon/10 px-4 py-2 text-sm font-semibold text-neon transition-all duration-300 hover:bg-neon hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-neon/50"
            >
              Open
            </button>
          ) : (
            <a
              href={game.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-neon/40 bg-neon/10 px-4 py-2 text-sm font-semibold text-neon transition-all duration-300 hover:bg-neon hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-neon/50"
            >
              Open
            </a>
          )}
        </div>
      ) : null}

      {game.tags && game.tags.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-accent/30 bg-charcoal/40 px-3 py-1 text-xs text-mist"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </motion.div>
  )
}

export default function WorldPage() {
  const headlineText = 'Welcome to the GreyVerse'
  const greyVerseText = 'GreyVerse'
  const prefixText = useMemo(() => headlineText.replace(greyVerseText, ''), [headlineText])
  const [greyVerseEffectIndex, setGreyVerseEffectIndex] = useState(0)
  const [activeGame, setActiveGame] = useState<Game | null>(null)

  const greyVerseEffects = useMemo(
    () => [
      {
        initial: {
          opacity: 0.35,
          filter: 'blur(1.5px) contrast(1.25) saturate(1.2)',
          x: 0,
          y: 0,
          rotateZ: 0,
        },
        animate: {
          opacity: [0.35, 1, 0.9, 1],
          x: [0, -2, 2, -1, 1, 0],
          y: [0, 1, -1, 2, -2, 0],
          rotateZ: [0, -1.5, 1.5, -0.8, 0.8, 0],
          filter: [
            'blur(1.8px) contrast(1.3) saturate(1.2)',
            'blur(0px) contrast(1) saturate(1)',
            'blur(0.8px) contrast(1.2) saturate(1.15)',
            'blur(0px) contrast(1) saturate(1)',
          ],
          textShadow: [
            '0 0 0 rgba(0,0,0,0), 1px 1px 0 rgba(255,255,255,0.22), -1px -1px 0 rgba(255,255,255,0.12)',
            '0 0 18px rgba(255,255,255,0.18)',
            '0 0 0 rgba(0,0,0,0), 2px 0 0 rgba(255,255,255,0.18), -2px 0 0 rgba(255,255,255,0.12)',
            '0 0 18px rgba(255,255,255,0.18)',
          ],
        },
        transition: {
          duration: 1.2,
          ease: 'easeInOut',
          times: [0, 0.25, 0.65, 1],
        },
      },
      {
        style: {
          color: 'transparent',
          backgroundImage:
            'linear-gradient(100deg, rgba(255,255,255,0.95) 0%, rgba(180,255,255,0.85) 22%, rgba(255,255,255,0.95) 44%, rgba(140,200,255,0.9) 66%, rgba(255,255,255,0.95) 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          backgroundSize: '240% 200%',
        },
        initial: {
          opacity: 0.4,
          rotateX: 12,
          backgroundPosition: '0% 60%',
          filter: 'blur(0.2px) contrast(1.15)',
        },
        animate: {
          opacity: [0.4, 1, 1],
          rotateX: [12, 0, 0],
          backgroundPosition: ['0% 60%', '120% 40%', '240% 60%'],
          filter: ['blur(0.4px) contrast(1.2)', 'blur(0px) contrast(1)', 'blur(0px) contrast(1)'],
        },
        transition: {
          duration: 1.35,
          ease: 'easeInOut',
        },
      },
      {
        mode: 'letters',
      },
    ],
    []
  )

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setGreyVerseEffectIndex((current) => (current + 1) % greyVerseEffects.length)
    }, 5000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [greyVerseEffects.length])

  const activeGreyVerseEffect = greyVerseEffects[greyVerseEffectIndex] as any

  const headlineContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
  }

  const headlineCharVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-charcoal to-graphite relative overflow-hidden">
      {activeGame?.url ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeGame.title}
          onClick={() => setActiveGame(null)}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-accent/20 bg-charcoal/90"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-accent/20 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-neon">{activeGame.title}</p>
                <p className="truncate text-xs text-mist">{activeGame.url}</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeGame.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-neon/40 bg-neon/10 px-3 py-2 text-xs font-semibold text-neon transition-all duration-300 hover:bg-neon hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-neon/50"
                >
                  Open in new tab
                </a>
                <button
                  type="button"
                  onClick={() => setActiveGame(null)}
                  className="inline-flex items-center justify-center rounded-lg border border-accent/30 bg-charcoal/40 px-3 py-2 text-xs font-semibold text-mist transition-colors hover:text-neon hover:border-neon/40 focus:outline-none focus:ring-2 focus:ring-neon/50"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="relative h-[75vh] w-full bg-black">
              <iframe
                key={activeGame.url}
                src={activeGame.url}
                title={activeGame.title}
                className="h-full w-full"
                referrerPolicy="no-referrer"
                sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                allow="fullscreen; autoplay; clipboard-read; clipboard-write"
              />
            </div>
          </div>
        </div>
      ) : null}
      <div className="relative z-10">
        <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <motion.h1
                variants={headlineContainerVariants}
                initial="hidden"
                animate="visible"
                className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-neon"
                aria-label={headlineText}
              >
                {prefixText.split('').map((char, index) => (
                  <motion.span
                    key={`${char}-${index}`}
                    variants={headlineCharVariants}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
                <span className="inline-block" style={{ perspective: '900px' }}>
                  {activeGreyVerseEffect?.mode === 'letters' ? (
                    <motion.span
                      key={greyVerseEffectIndex}
                      className="inline-flex"
                      style={{ transformStyle: 'preserve-3d', textShadow: '0 0 18px rgba(255,255,255,0.18)' }}
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.08,
                          },
                        },
                      }}
                    >
                      {greyVerseText.split('').map((char: string, index: number) => (
                        <motion.span
                          key={`${char}-${index}`}
                          className="inline-block"
                          variants={{
                            hidden: {
                              opacity: 0,
                              y: 18,
                              rotateX: 60,
                              filter: 'blur(6px)',
                            },
                            visible: {
                              opacity: 1,
                              y: [18, -10, 0, 6, 0],
                              rotateX: [60, 0, 0],
                              filter: ['blur(6px)', 'blur(0px)', 'blur(0px)'],
                              transition: {
                                duration: 0.9,
                                ease: 'easeOut',
                              },
                            },
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.span>
                  ) : (
                    <motion.span
                      key={greyVerseEffectIndex}
                      className="inline-block"
                      style={{
                        transformStyle: 'preserve-3d',
                        textShadow: '0 0 18px rgba(255,255,255,0.18)',
                        ...(activeGreyVerseEffect as any)?.style,
                      }}
                      initial={(activeGreyVerseEffect as any)?.initial}
                      animate={(activeGreyVerseEffect as any)?.animate}
                      transition={(activeGreyVerseEffect as any)?.transition}
                    >
                      {greyVerseText}
                    </motion.span>
                  )}
                </span>
              </motion.h1>
              <p className="mt-3 text-base sm:text-lg text-mist max-w-2xl">
                Explore the games we’ve launched and what’s coming next.
              </p>
            </div>
            <Link
              href="/"
              className="shrink-0 inline-flex items-center justify-center rounded-lg border border-accent/30 bg-charcoal/40 px-4 py-2 text-sm text-mist hover:text-neon hover:border-neon/40 transition-colors focus:outline-none focus:ring-2 focus:ring-neon/50"
            >
              Back
            </Link>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-neon">
                Launched
              </h2>
              <p className="mt-2 text-mist">Live and ready to play.</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {launchedGames.map((game) => (
              <GameCard key={game.title} game={game} onOpen={setActiveGame} />
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div>
            <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-neon">
              In the lineup
            </h2>
            <p className="mt-2 text-mist">Currently in development and lining up for release.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lineupGames.map((game) => (
              <GameCard key={game.title} game={game} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
