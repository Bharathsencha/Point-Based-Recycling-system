"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Home } from "lucide-react"
import { useAuth } from "@/lib/authContext"
import { Separator } from "@/components/ui/separator"

export default function CheckoutSuccessPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  interface CartItem {
    id: string;
    name: string;
    size: string;
    quantity: number;
    price: number;
    image?: string;
  }

  interface OrderSummary {
    cart: CartItem[];
    total: number;
    paymentMethod: string;
  }

  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const storedSummary = sessionStorage.getItem("orderSummary")
    if (storedSummary) {
      setOrderSummary(JSON.parse(storedSummary))
      sessionStorage.removeItem("orderSummary")
    }
  }, [])

  if (loading || !orderSummary) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  const { cart: cartItems, total, paymentMethod } = orderSummary

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 rounded-full p-6 mb-4">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          <CardDescription>Your recycling pickup has been scheduled</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-center font-medium">Confirmation #: ECO-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>

          <div className="space-y-2">
            <p className="text-center">
              Thank you for contributing to a greener planet! Our team will collect your recyclables at the scheduled time.
            </p>

            <p className="text-center text-muted-foreground">
              You'll receive an email with all the details of your pickup shortly.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10 rounded overflow-hidden bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.size} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processing Fee</span>
                <span>₹0.00</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            {paymentMethod === "points" && (
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg mt-4">
                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                  You'll earn {Math.floor(total * 10)} points
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Points can be redeemed for essential goods and services
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={() => router.push("/profile")} className="w-full">
            View My Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button variant="outline" onClick={() => router.push("/")} className="w-full">
            <Home className="mr-2 h-4 w-4" />
            Return to Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
