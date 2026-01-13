'use client'

import { HeroSection } from '@/components/HeroSection'
import { StickyButtons } from '@/components/StickyButtons'
import { Footer } from '@/components/Footer'
import { FogOverlay } from '@/components/FogOverlay'
import { ScrollButton } from '@/components/ScrollButton'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-charcoal to-graphite relative overflow-hidden">
      <FogOverlay />
      
      <div className="relative z-10">
        <HeroSection />
      </div>

      <StickyButtons />
      <ScrollButton />
      <Footer />
    </main>
  )
}
