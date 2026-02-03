'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function FogOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const renderScale = 0.35

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * renderScale))
      canvas.height = Math.max(1, Math.floor(window.innerHeight * renderScale))
    }

    const animate = () => {
      time += 0.005
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Create noise pattern
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % canvas.width
        const y = Math.floor((i / 4) / canvas.width)
        
        // Simple noise function
        const noise = Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time) * 0.5 + 0.5
        const alpha = Math.floor(noise * 15) // Very low opacity
        
        data[i] = 255     // R
        data[i + 1] = 255 // G
        data[i + 2] = 255 // B
        data[i + 3] = alpha // A
      }
      
      ctx.putImageData(imageData, 0, 0)
      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1 }}
      className="fixed inset-0 h-full w-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen', width: '100%', height: '100%' }}
    />
  )
}
