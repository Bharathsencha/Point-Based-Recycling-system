"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, LogIn, UserPlus, AlertCircle } from "lucide-react"

import { useAuth } from "@/lib/authContext"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { login, signup, user } = useAuth()

  // Error message states
  const [loginError, setLoginError] = useState<string | null>(null)
  const [signupError, setSignupError] = useState<string | null>(null)

  // Get callbackUrl from query params or default to '/'
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      router.push(callbackUrl)
    }
  }, [user, router, callbackUrl])

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  })

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setLoginForm(prev => ({
      ...prev,
      [id]: value
    }))
    // Clear error when user starts typing
    setLoginError(null)
  }

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setSignupForm(prev => ({
      ...prev,
      [id === 'name' ? 'name' : 
       id === 'signup-email' ? 'email' : 
       id === 'mobile' ? 'mobile' : 'password']: value
    }))
    // Clear error when user starts typing
    setSignupError(null)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError(null) // clear previous error

    try {
      await login(loginForm.email, loginForm.password)
      toast({
        title: "Welcome back",
        description: "Enjoy your recycling rewards!",
      })
      router.push(callbackUrl)
    } catch (error) {
      let description = "Please check your credentials or signup if you're new to our family";
      if (error instanceof Error) {
        if (error.message.includes("User not found")) {
          description = "User not found. Please sign up first.";
        } else if (error.message.includes("Wrong password")) {
          description = "Incorrect password. Please try again.";
        }
      }
      setLoginError(description) // set inline error message
      toast({
        title: "Login failed",
        description,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSignupError(null) // clear previous error

    try {
      await signup(signupForm.name, signupForm.email, signupForm.mobile, signupForm.password)
      toast({
        title: "Super, you are in our family",
        description: "Account created successfully! You are now logged in.",
      })
      router.push(callbackUrl)
    } catch (error) {
      if (error instanceof Error && error.message.includes('exists')) {
        setSignupError("You are already in our family. Please login to continue.")
        // Switch to login tab
        document.getElementById('login-tab')?.click()
        
        // Pre-fill login form with signup email
        setLoginForm(prev => ({
          ...prev,
          email: signupForm.email
        }))
      } else {
        let description = "Something went wrong";
        if (error instanceof Error) {
          if (error.message.includes("Missing required fields")) {
            description = "Please fill in all required fields.";
          } else if (error.message.includes("Failed to create user")) {
            description = "Failed to create user. Please try again later.";
          }
        }
        setSignupError(description) // set inline error message
        toast({
          title: "Signup failed",
          description,
          variant: "destructive"
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger id="login-tab" value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  {loginError && (
                    <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{loginError}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="example@email.com" 
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button variant="link" className="px-0 text-xs" type="button">
                        Forgot password?
                      </Button>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      required 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>Join our recycling rewards program today</CardDescription>
              </CardHeader>
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  {signupError && (
                    <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{signupError}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      value={signupForm.name}
                      onChange={handleSignupChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="example@email.com" 
                      value={signupForm.email}
                      onChange={handleSignupChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input 
                      id="mobile" 
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      value={signupForm.mobile}
                      onChange={handleSignupChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      type="password"
                      value={signupForm.password}
                      onChange={handleSignupChange} 
                      required 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Sign Up
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
