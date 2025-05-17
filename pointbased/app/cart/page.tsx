"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const calculateSubtotal = (price: number, quantity: number) => {
    return price * quantity
  }

  const calculateTotal = () => {
    if (!mounted) return 0
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (!mounted) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          <p>Loading cart...</p>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <ShoppingCart className="h-24 w-24 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any recyclable items to your cart yet.
          </p>
          <Button onClick={() => router.push("/recyclables")}>Browse Recyclable Items</Button>
        </div>
      </div>
    )
  }

  return (
    console.log(cart),
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <Button
            variant="outline"
            onClick={() => {
              clearCart()
              toast({
                title: "Cart cleared",
                description: "All items have been removed from your cart.",
              })
            }}
          >
            Clear Cart
          </Button>
        </div>

        <div className="space-y-4 mb-8">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={`${item.id}-${item.size}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-32 h-32 bg-muted">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{item.size}</Badge>
                              <Badge variant="secondary">{item.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">₹{item.price.toFixed(2)} per unit</p>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-r-none"
                                onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <div className="h-8 px-3 flex items-center justify-center border border-x-0">
                                {item.quantity}
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-l-none"
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => {
                                removeFromCart(item.id, item.size)
                                toast({
                                  title: "Item removed",
                                  description: `${item.name} (${item.size}) has been removed from your cart.`,
                                })
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-muted/50 flex justify-between items-center">
                      <span className="text-sm font-medium">Subtotal</span>
                      <span className="font-semibold">₹{calculateSubtotal(item.price, item.quantity).toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Items ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                </span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processing Fee</span>
                <span>₹0.00</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Points you'll earn</span>
                <span>{Math.floor(calculateTotal() * 10)} points</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg" onClick={handleCheckout}>
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
