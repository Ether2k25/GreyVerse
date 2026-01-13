'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function CountdownTimer() {
  // Set launch date to January 1, 2025 (editable)
  const [launchDate] = useState(() => {
    return new Date('2025-01-01T00:00:00')
  })
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Calculate immediately
    calculateTimeLeft()

    // Then update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [launchDate])

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="glass rounded-xl p-4 sm:p-6 min-w-[80px] sm:min-w-[100px] text-center"
        >
          <motion.div
            key={unit.value}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-headline font-bold text-neon mb-2"
          >
            {unit.value.toString().padStart(2, '0')}
          </motion.div>
          <div className="text-xs sm:text-sm text-accent uppercase tracking-wider font-medium">
            {unit.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
