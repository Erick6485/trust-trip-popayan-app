import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'TrustTrip Popayán — Experiencias turísticas verificadas con IA',
  description:
    'Planifica tu viaje a Popayán con inteligencia artificial. Descubre experiencias verificadas, lugares con alto índice de confianza y rutas personalizadas en La Ciudad Blanca de Colombia.',
  keywords: ['Popayán', 'turismo', 'Colombia', 'Cauca', 'viaje', 'experiencias', 'IA'],
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#120f26',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} bg-background dark`}
    >
      <body className="font-sans antialiased text-foreground bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
