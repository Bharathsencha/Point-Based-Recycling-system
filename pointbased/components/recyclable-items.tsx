"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"
import { Plus, Minus, ShoppingCart, Info, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

// Define recyclable items
const items = [
  {
    id: "plastic-bottle",
    name: "Plastic Bottle",
    category: "Plastic",
    image: "/placeholder.svg?height=400&width=400",
    basePrice: 5,
    impact: "Saves 3kWh of energy",
  },
  {
    id: "glass-bottle",
    name: "Glass Bottle",
    category: "Glass",
    image: "/placeholder.svg?height=400&width=400",
    basePrice: 8,
    impact: "Reduces CO₂ by 0.3kg",
  },
  {
    id: "milk-bottle",
    name: "Milk Bottle",
    category: "Plastic",
    image: "/placeholder.svg?height=400&width=400",
    basePrice: 6,
    impact: "Saves 2L of water",
  },
  {
    id: "cold-drink-can",
    name: "Cold Drink Can",
    category: "Aluminum",
    image: "/placeholder.svg?height=400&width=400",
    basePrice: 10,
    impact: "Saves 4kWh of energy",
  },
  {
    id: "cooking-oil-can",
    name: "Cooking Oil Can",
    category: "Metal",
    image: "/placeholder.svg?height=400&width=400",
    basePrice: 15,
    impact: "Reduces CO₂ by 0.5kg",
    isNew: true,
  },
  {
    id: "milk-can",
    name: "Milk Can",
    category: "Metal",
    image: "/placeholder.svg?height=400&width=400",
    basePrice: 12,
    impact: "Saves 3L of water",
  },
]

// Available sizes
const sizes = [
  { value: "100ml", label: "100ml", multiplier: 0.5 },
  { value: "250ml", label: "250ml", multiplier: 1 },
  { value: "500ml", label: "500ml", multiplier: 1.5 },
  { value: "1L", label: "1 Liter", multiplier: 2 },
  { value: "1.5L", label: "1.5 Liters", multiplier: 2.5 },
  { value: "1.75L", label: "1.75 Liters", multiplier: 2.75 },
  { value: "2L", label: "2 Liters", multiplier: 3 },
]

export default function RecyclableItems({ limit, styleVariant = "full" }: { limit?: number, styleVariant?: "compact" | "full" }) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  // Limit items if limit prop is provided
  const displayedItems = limit ? items.slice(0, limit) : items

  // State for each item's quantity and selected size
  const [itemStates, setItemStates] = useState(displayedItems.map(() => ({ quantity: 1, size: "250ml", showInfo: false })))

  const handleQuantityChange = (index: number, change: number) => {
    setItemStates((prev) => {
      const newStates = [...prev]
      newStates[index].quantity = Math.max(1, prev[index].quantity + change)
      return newStates
    })
  }

  const handleSizeChange = (index: number, size: string) => {
    setItemStates((prev) => {
      const newStates = [...prev]
      newStates[index].size = size
      return newStates
    })
  }

  const toggleInfo = (index: number) => {
    setItemStates((prev) => {
      const newStates = [...prev]
      newStates[index].showInfo = !prev[index].showInfo
      return newStates
    })
  }

  const calculatePrice = (basePrice: number, size: string) => {
    const sizeObj = sizes.find((s) => s.value === size)
    return basePrice * (sizeObj?.multiplier || 1)
  }

  const handleAddToCart = (index: number) => {
    const item = displayedItems[index]
    const state = itemStates[index]
    const price = calculatePrice(item.basePrice, state.size)

    addToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      category: item.category,
      size: state.size,
      price,
      quantity: state.quantity,
    })

    // Show confetti animation on add to cart
    toast({
      title: "Added to cart",
      description: `${state.quantity} × ${item.name} (${state.size}) added to your cart.`,
      action: (
        <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
        </div>
      ),
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 w-full px-4 md:px-0">
      {displayedItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.15 }}
          whileHover={{ y: -8, boxShadow: "0 10px 15px rgba(34,197,94,0.3)" }}
          className="h-full"
        >
          <Card className="overflow-hidden h-full flex flex-col transition-all duration-400 hover:shadow-xl hover:shadow-green-400/30 dark:hover:shadow-green-900/40 rounded-xl">
            {item.isNew && (
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-red-600 hover:bg-red-700 text-white font-semibold">NEW</Badge>
              </div>
            )}

            <div className="relative aspect-square bg-muted group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <Badge className="absolute top-2 right-2 bg-green-600 text-white font-semibold">{item.category}</Badge>
            </div>

            <CardContent className="p-5 flex-1">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">{item.name}</h3>
                  <p className="text-green-700 dark:text-green-400 font-semibold text-base">
                    ₹{calculatePrice(item.basePrice, itemStates[index].size).toFixed(2)} per unit
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => toggleInfo(index)}>
                  <Info className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </Button>
              </div>

              <AnimatePresence>
                {itemStates[index].showInfo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-sm bg-green-50 dark:bg-green-900/30 p-3 rounded-md text-green-900 dark:text-green-200"
                  >
                    <p>{item.impact}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-5 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Size</label>
                  <Select value={itemStates[index].size} onValueChange={(value) => handleSizeChange(index, value)}>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-r-none"
                      onClick={() => handleQuantityChange(index, -1)}
                    >
                      <Minus className="h-5 w-5" />
                    </Button>
                    <div className="h-8 px-4 flex items-center justify-center border border-x-0 text-base font-semibold text-gray-900 dark:text-gray-100">
                      {itemStates[index].quantity}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-l-none"
                      onClick={() => handleQuantityChange(index, 1)}
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-5 pt-0">
              <Button className="w-full relative overflow-hidden group" onClick={() => handleAddToCart(index)}>
                <span className="relative z-10 flex items-center text-base font-semibold">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </span>
                <span className="absolute inset-0 bg-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded"></span>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
