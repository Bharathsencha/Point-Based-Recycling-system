"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

export type CartItem = {
  id: string
  name: string
  image: string
  category: string
  size: string
  price: number
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  removeFromCart: (id: string, size: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        localStorage.removeItem("cart")
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, mounted])

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      // Check if item with same id and size already exists
      const existingItemIndex = prevCart.findIndex((item) => item.id === newItem.id && item.size === newItem.size)

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += newItem.quantity
        return updatedCart
      } else {
        // Add new item
        return [...prevCart, newItem]
      }
    })
  }

  const updateQuantity = (id: string, size: string, quantity: number) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === id && item.size === size ? { ...item, quantity } : item)))
  }

  const removeFromCart = (id: string, size: string) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.size === size)))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
