"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible!",
      })

      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1500)
  }

  return (
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
            <p className="mt-4 text-muted-foreground">
              Have questions about our recycling program? We're here to help! Fill out the form and we'll get back to
              you as soon as possible.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Our Location</h3>
                <p className="text-sm text-muted-foreground">123 Eco Street, Green City, Earth 54321</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Email Us</h3>
                <p className="text-sm text-muted-foreground">info@ecorewards.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Call Us</h3>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden h-[300px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-20 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-center text-muted-foreground">Interactive map would be displayed here</p>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we'll respond within 24 hours.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What's this about?" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us how we can help..." className="min-h-[120px]" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
