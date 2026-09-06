'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function LumaCheckout() {
  useEffect(() => {
    const init = () => {
      if (typeof window !== 'undefined' && (window as any).luma?.initCheckout) {
        ;(window as any).luma.initCheckout()
      }
    }

    // Initialize when DOM is ready
    init()

    // Ensure buttons rendered by React or route transitions are bound
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        '[data-luma-action="checkout"], .luma-checkout--button'
      )
      if (target) {
        init()
      }
    }

    document.addEventListener('click', handleDocumentClick, { capture: true })
    return () => {
      document.removeEventListener('click', handleDocumentClick, { capture: true })
    }
  }, [])

  return (
    <Script
      id="luma-checkout"
      src="https://embed.lu.ma/checkout-button.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined' && (window as any).luma?.initCheckout) {
          ;(window as any).luma.initCheckout()
        }
      }}
    />
  )
}
