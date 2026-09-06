import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ContactModalProvider } from '@/context/ContactModalContext'
import LumaCheckout from '@/components/LumaCheckout'
import SparkleTrail from '@/components/SparkleTrail'
import { Analytics } from '@vercel/analytics/next'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://qiskit-fall-fest-2026.vercel.app'
  ),
  title: 'Qiskit Fall Fest 2026 | Decoding Quantum Horizons',
  description:
    'Official IBM Qiskit Fall Fest 2026 Extension — A 3-day quantum computing hackathon, workshop series, and learning festival. Register for free and hack, learn & build with Qiskit.',
  keywords: ['Qiskit', 'Fall Fest', 'Quantum Computing', 'Hackathon', 'IBM Quantum', '2026'],
  openGraph: {
    title: 'Qiskit Fall Fest 2026',
    description: 'Decoding Quantum Horizons: Hack, Learn & Build.',
    images: ['/assets/blog/Fall Fest.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qiskit Fall Fest 2026',
    description: 'Decoding Quantum Horizons: Hack, Learn & Build.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#fff8fa] text-slate-900 overflow-x-hidden`}
      >
        <ContactModalProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ContactModalProvider>
        <LumaCheckout />
        <SparkleTrail />
        <Analytics />
      </body>
    </html>
  )
}
