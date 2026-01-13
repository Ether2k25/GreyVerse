'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, User, Phone } from 'lucide-react'
import { toast } from 'sonner'

interface WaitlistFormProps {
  onSubmit: (data: { name: string; email: string; whatsapp?: string }) => Promise<void>
}

export function WaitlistForm({ onSubmit }: WaitlistFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (formData.whatsapp && !/^\+?[\d\s-()]+$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        whatsapp: formData.whatsapp.trim() || undefined,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (showSuccessMessage) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <div className="glass rounded-2xl p-6 sm:p-8 lg:p-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-6">🎮</div>
            <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-neon mb-4">
              Thanks for your interest!
            </h2>
            <p className="text-lg text-mist mb-6">
              Follow our social links to get more updates about Grey Gaming launch!
            </p>
            <div className="flex justify-center space-x-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-neon"
              >
                📱 Instagram • 📘 Facebook • 🎵 TikTok
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.5 }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 lg:p-10">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="text-2xl sm:text-3xl font-headline font-semibold text-neon text-center mb-8"
        >
          Join the waitlist
        </motion.h2>

        <div className="space-y-6">
          {/* Name Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3 }}
          >
            <label htmlFor="name" className="block text-sm font-medium text-mist mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent w-5 h-5" />
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 bg-charcoal/50 border rounded-lg text-neon placeholder-accent focus:outline-none focus:ring-2 focus:ring-neon/30 focus:border-neon/50 transition-all ${
                  errors.name ? 'border-red-500' : 'border-accent/30'
                }`}
                placeholder="Enter your full name"
                disabled={isSubmitting}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.1 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-mist mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent w-5 h-5" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 bg-charcoal/50 border rounded-lg text-neon placeholder-accent focus:outline-none focus:ring-2 focus:ring-neon/30 focus:border-neon/50 transition-all ${
                  errors.email ? 'border-red-500' : 'border-accent/30'
                }`}
                placeholder="Enter your email address"
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </motion.div>

          {/* WhatsApp Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.2 }}
          >
            <label htmlFor="whatsapp" className="block text-sm font-medium text-mist mb-2">
              WhatsApp Number (Optional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent w-5 h-5" />
              <input
                type="tel"
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 bg-charcoal/50 border rounded-lg text-neon placeholder-accent focus:outline-none focus:ring-2 focus:ring-neon/30 focus:border-neon/50 transition-all ${
                  errors.whatsapp ? 'border-red-500' : 'border-accent/30'
                }`}
                placeholder="+1 (555) 123-4567"
                disabled={isSubmitting}
              />
            </div>
            {errors.whatsapp && (
              <p className="mt-1 text-sm text-red-400">{errors.whatsapp}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3 }}
          >
            <button
              type="button"
              onClick={() => {
                setShowSuccessMessage(true)
                // Redirect to Instagram after showing the message
                setTimeout(() => {
                  window.open(process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/greygaming2025', '_blank')
                }, 2000)
              }}
              className="w-full py-4 px-6 bg-transparent border-2 border-neon text-neon font-headline font-semibold rounded-lg hover:bg-neon hover:text-charcoal transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon/50 group relative overflow-hidden"
            >
              <span className="relative z-10">
                Join the waitlist
              </span>
              <motion.div
                className="absolute inset-0 bg-neon/10"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </button>
          </motion.div>
        </div>
      </form>
    </motion.section>
  )
}
