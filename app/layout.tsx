import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import NavBar from '@/app/ui/nav-bar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JoinIn',
  description: 'JoinIn: A new way to connect with people and join events.',
  keywords: 'meetup, events, connect, social, joinin',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
