'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/components/cart-provider';
import { CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('points');
  const [recycleStation, setRecycleStation] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [notes, setNotes] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recycleStation || !submissionDate) {
      toast({
        title: 'Missing Fields',
        description: 'Please select a recycle station and submission date.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      toast({
        title: 'Processing',
        description: 'Sending checkout request...',
      });

      console.log('Sending request to /final-checkout');
      const response = await fetch('/api/final-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recycleStation,
          orderDetails: cart,
          paymentMethod,
        }),
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        if (data.error.includes('Not authenticated') || data.error.includes('Invalid token')) {
          toast({
            title: 'Authentication Error',
            description: 'Please log in again.',
            variant: 'destructive',
          });
          router.push('/login');
          return;
        }
        throw new Error(data.error || 'Failed to complete checkout');
      }

      toast({
        title: 'Success',
        description: 'Checkout completed successfully!',
      });

      sessionStorage.setItem(
        'orderSummary',
        JSON.stringify({ cart, total: calculateTotal(), paymentMethod, recycleStation })
      );
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Checkout Failed',
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">You need to add items to your cart before checking out.</p>
          <Button onClick={() => router.push('/')}>Browse Recyclable Items</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6" onClick={() => router.push('/cart')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Submission Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recycle-station">Select Recycle Station</Label>
                    <Select value={recycleStation} onValueChange={setRecycleStation} required>
                      <SelectTrigger id="recycle-station">
                        <SelectValue placeholder="Choose a recycle station" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Koramangala">Koramangala</SelectItem>
                        <SelectItem value="Indiranagar">Indiranagar</SelectItem>
                        <SelectItem value="Whitefield">Whitefield</SelectItem>
                        <SelectItem value="Jayanagar">Jayanagar</SelectItem>
                        <SelectItem value="Malleshwaram">Malleshwaram</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Submission Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={submissionDate}
                      onChange={(e) => setSubmissionDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special instructions..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="points" id="points" />
                      <Label htmlFor="points" className="flex-1 cursor-pointer">
                        <div className="font-medium">Earn Points</div>
                        <div className="text-sm text-muted-foreground">Receive points for your recyclables</div>
                      </Label>
                      <Badge className="ml-auto">Recommended</Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        <div className="font-medium">Cash Payment</div>
                        <div className="text-sm text-muted-foreground">Receive cash for your recyclables</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Complete Checkout'
                )}
              </Button>
            </form>
          </div>

          <div className="md:col-span-2">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between py-2">
                      <div className="flex items-center gap-2">
                        <div className="relative w-10 h-10 rounded overflow-hidden bg-muted">
                          <Image src={item.image || '/placeholder.svg'} alt={item.name} fill className="object-cover" />
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
                    <span>₹{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Fee</span>
                    <span>₹0.00</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>

                {paymentMethod === 'points' && (
                  <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      You'll earn {Math.floor(calculateTotal() * 10)} points
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Points can be redeemed for essential goods and services
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}