"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useCart } from "@/components/cart-provider"
import { Recycle, Menu, ShoppingCart, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { cart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const totalItems = mounted ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-1">
              <Recycle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">EcoRewards</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {mounted && totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-foreground/80 p-2 rounded-md",
                      pathname === item.href ? "bg-muted text-foreground" : "text-foreground/60",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/login"
                  className="text-lg font-medium transition-colors hover:text-foreground/80 p-2 rounded-md"
                >
                  Login
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
