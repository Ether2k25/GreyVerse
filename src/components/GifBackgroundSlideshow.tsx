'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

type GifBackgroundSlideshowProps = {
  fadeMs?: number
  dimClassName?: string
  imageOpacityClassName?: string
  playOnce?: boolean
}

export function GifBackgroundSlideshow({
  fadeMs = 900,
  dimClassName = 'bg-transparent',
  imageOpacityClassName = 'opacity-70',
  playOnce = false,
}: GifBackgroundSlideshowProps) {
  const backgrounds = useMemo(
    () => [
      { src: '/Gifs/coin toss.gif', durationMs: 15000 },
      { src: '/Gifs/Horse Racing.mp4', durationMs: 15000 },
      { src: '/Gifs/penalty.mp4', durationMs: 15000 },
      { src: '/Gifs/bowled.mp4', durationMs: 15000 },
      { src: '/Gifs/six.mp4', durationMs: 15000 },
      { src: '/Gifs/Crash.mp4', durationMs: 15000 },
    ],
    []
  )

  const shuffleArray = (items: string[]) => {
    const next = [...items]
    for (let i = next.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[next[i], next[j]] = [next[j], next[i]]
    }
    return next
  }

  const sources = useMemo(() => backgrounds.map((bg) => bg.src).filter(Boolean) as string[], [backgrounds])

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const [playlist, setPlaylist] = useState<string[]>(() => sources)
  const [playlistIndex, setPlaylistIndex] = useState(0)

  const isVideo = (src?: string) => (src ? src.toLowerCase().endsWith('.mp4') : false)


  useEffect(() => {
    if (!mounted) return
    const next = shuffleArray(sources)
    setPlaylist(next)
    setPlaylistIndex(0)
  }, [mounted, sources])

  useEffect(() => {
    if (!mounted) return
    if (sources.length <= 1) return
    if (playOnce && playlistIndex >= sources.length - 1) return

    const durationMs = 5000
    const id = window.setTimeout(() => {
      setPlaylistIndex((prev) => {
        const nextIndex = prev + 1
        if (nextIndex < playlist.length) return nextIndex

        const reshuffled = shuffleArray(sources)
        setPlaylist(reshuffled)
        return 0
      })
    }, durationMs)

    return () => window.clearTimeout(id)
  }, [mounted, playOnce, playlist.length, playlistIndex, sources, sources.length])

  function FrameMedia({ src }: { src?: string }) {
    const [activeSrc, setActiveSrc] = useState<string | undefined>(src)
    const [incomingSrc, setIncomingSrc] = useState<string | undefined>()
    const [incomingReady, setIncomingReady] = useState(false)

    useEffect(() => {
      if (!src || src === activeSrc) return
      setIncomingSrc(src)
      setIncomingReady(false)
    }, [activeSrc, src])

    useEffect(() => {
      if (!incomingSrc || !incomingReady) return
      const id = window.setTimeout(() => {
        setActiveSrc(incomingSrc)
        setIncomingSrc(undefined)
        setIncomingReady(false)
      }, fadeMs)

      return () => window.clearTimeout(id)
    }, [fadeMs, incomingReady, incomingSrc])

    const renderMedia = (mediaSrc?: string, onReady?: () => void) => {
      if (!mediaSrc) return null
      if (isVideo(mediaSrc)) {
        return (
          <video
            key={mediaSrc}
            src={mediaSrc}
            className={`h-full w-full object-cover bg-transparent blur-[0.6px] ${imageOpacityClassName}`}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            onLoadedData={onReady}
            onCanPlay={onReady}
          />
        )
      }

      return (
        <img
          key={mediaSrc}
          src={mediaSrc}
          alt=""
          className={`h-full w-full object-cover blur-[0.6px] ${imageOpacityClassName}`}
          onLoad={onReady}
          draggable={false}
        />
      )
    }

    return (
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: incomingSrc ? 1 : 1 }}
          transition={{ duration: fadeMs / 1000, ease: 'easeInOut' }}
        >
          {renderMedia(activeSrc)}
        </motion.div>

        {incomingSrc ? (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: incomingReady ? 1 : 0 }}
            transition={{ duration: fadeMs / 1000, ease: 'easeInOut' }}
          >
            {renderMedia(incomingSrc, () => setIncomingReady(true))}
          </motion.div>
        ) : null}

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-y-8 -left-1/2 w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/18 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ x: ['-35%', '35%'], opacity: [0, 0.35, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
        />
      </div>
    )
  }

  const activeSrc = useMemo(() => {
    const deterministicSrc = sources.length ? sources[0] : undefined
    const nextSrc = playlist.length ? playlist[playlistIndex % playlist.length] : undefined
    return mounted ? nextSrc ?? deterministicSrc : deterministicSrc
  }, [mounted, playlist, playlistIndex, sources])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <FrameMedia src={activeSrc} />
      </div>

      <div className={`absolute inset-0 ${dimClassName}`} aria-hidden="true" />
    </div>
  )
}
