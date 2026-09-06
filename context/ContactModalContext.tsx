'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import ContactModal, { ModalTab } from '@/components/ContactModal'

interface ContactModalContextType {
  isOpen: boolean
  activeTab: ModalTab
  openContactModal: (tab?: ModalTab) => void
  closeContactModal: () => void
}

const ContactModalContext = createContext<ContactModalContextType>({
  isOpen: false,
  activeTab: 'general',
  openContactModal: () => {},
  closeContactModal: () => {},
})

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<ModalTab>('general')

  const openContactModal = useCallback((tab: ModalTab = 'general') => {
    setActiveTab(tab)
    setIsOpen(true)
  }, [])

  const closeContactModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Listen for custom window event so any button/link in any component can trigger it
  useEffect(() => {
    const handleGlobalTrigger = (event: Event) => {
      const customEvent = event as CustomEvent<{ tab?: ModalTab }>
      const tab = customEvent.detail?.tab || 'general'
      openContactModal(tab)
    }

    window.addEventListener('open-contact-modal', handleGlobalTrigger)
    return () => {
      window.removeEventListener('open-contact-modal', handleGlobalTrigger)
    }
  }, [openContactModal])

  return (
    <ContactModalContext.Provider
      value={{ isOpen, activeTab, openContactModal, closeContactModal }}
    >
      {children}
      <ContactModal
        isOpen={isOpen}
        initialTab={activeTab}
        onClose={closeContactModal}
      />
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  return useContext(ContactModalContext)
}

export function triggerContactModal(tab: ModalTab = 'general') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('open-contact-modal', { detail: { tab } })
    )
  }
}
