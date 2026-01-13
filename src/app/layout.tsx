import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GREY GAMING — Coming Soon',
  description: 'Enterprise iGaming provider. Built for speed, scale, and compliance. Something big is loading the game.',
  keywords: ['iGaming', 'casino', 'sports betting', 'gaming platform', 'enterprise'],
  authors: [{ name: 'GREY GAMING' }],
  creator: 'GREY GAMING',
  publisher: 'GREY GAMING',
  openGraph: {
    title: 'GREY GAMING — Coming Soon',
    description: 'Enterprise iGaming provider. Built for speed, scale, and compliance.',
    url: 'https://greygaming.com',
    siteName: 'GREY GAMING',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'GREY GAMING - Coming Soon',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GREY GAMING — Coming Soon',
    description: 'Enterprise iGaming provider. Built for speed, scale, and compliance.',
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
      sizes: 'any',
    },
    {
      rel: 'icon',
      url: '/favicon-16x16.png',
      type: 'image/png',
      sizes: '16x16',
    },
    {
      rel: 'icon',
      url: '/favicon-32x32.png',
      type: 'image/png',
      sizes: '32x32',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Toaster 
          theme="dark" 
          position="top-center"
          toastOptions={{
            style: {
              background: 'rgba(26, 29, 36, 0.9)',
              border: '1px solid rgba(230, 232, 236, 0.1)',
              color: '#E6E8EC',
            },
          }}
        />
      </body>
    </html>
  )
}
