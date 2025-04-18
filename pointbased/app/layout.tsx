import type React from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/components/cart-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "EcoRewards - Recycling Point System",
  description: "Earn points by recycling and redeem them for essential goods and services",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CartProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <div className="flex-1">{children}</div>
            </div>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
