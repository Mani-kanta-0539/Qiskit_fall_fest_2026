import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ContactModalProvider } from '@/context/ContactModalContext'
import { ThemeProvider } from '@/context/ThemeContext'
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
  metadataBase: new URL('https://qff-2026.vercel.app'),
  title: 'Qiskit Fall Fest 2026 — Andhra University',
  description: 'Official IBM Qiskit Fall Fest 2026 at Andhra University. Free 3-day quantum computing event — workshops, hackathon, and IBM mentorship.',
  openGraph: {
    title: 'Qiskit Fall Fest 2026',
    description: 'Quantum computing event at Andhra University — Oct 5–7, 2026',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('qff-theme');var dark=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(dark){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');document.documentElement.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <ContactModalProvider>
            <SparkleTrail />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <LumaCheckout />
          </ContactModalProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}