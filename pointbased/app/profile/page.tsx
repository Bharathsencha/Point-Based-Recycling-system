"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { LogOut, User, Mail, Phone, Loader2, BadgeCheck } from "lucide-react"

import { useAuth } from '@/lib/authContext'

export default function ProfilePage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // ⬇️ State for stats
  const [stats, setStats] = useState({
    points: "--",
    items: "--",
    rewards: "--",
  })

  // 🔁 Call this only after user is available
  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to view your profile",
        variant: "destructive"
      })
      router.push('/login?callbackUrl=/profile')
    }

    if (!loading && user?.email) {
      const fetchStats = async () => {
        try {
          const res = await fetch("/api/user/stats", {
            method: "POST",
            body: JSON.stringify({ email: user.email }),
          })
          const data = await res.json()
          setStats({
            points: data.points ?? "--",
            items: data.items ?? "--",
            rewards: data.rewards ?? "--",
          })
        } catch (err) {
          console.error("Failed to fetch stats", err)
          toast({
            title: "Failed to load stats",
            description: "We couldn't retrieve your recycling data.",
            variant: "destructive",
          })
        }
      }

      fetchStats()
    }
  }, [user, loading, router, toast])


  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
      toast({
        title: "Logged out successfully",
        description: "Hope to see you soon!",
      })
      // Router.push is called inside logout function in the auth context
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive"
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto mb-4" />
          <p>Loading your profile...</p>
        </div>
      </div>
    )
  }

  // Return loading state during the redirect instead of null
  if (!user) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto mb-4" />
          <p>Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center border-b pb-6">
          <div className="mx-auto bg-primary/10 rounded-full p-6 mb-4">
            <User className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-3xl">{user.name}</CardTitle>
          <CardDescription className="text-lg flex items-center justify-center gap-2">
            EcoRewards Member <BadgeCheck className="h-5 w-5 text-primary" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
            <Mail className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
            <Phone className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Mobile Number</p>
              <p className="font-medium">{user.mobile || "Not provided"}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-lg mb-2">Your recycling stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{stats.points}</p>
                <p className="text-sm text-muted-foreground">Points earned</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{stats.items}</p>
                <p className="text-sm text-muted-foreground">Items recycled</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{stats.rewards}</p>
                <p className="text-sm text-muted-foreground">Rewards redeemed</p>
              </div>

            </div>
          </div>
        </CardContent>
<CardFooter className="flex flex-col gap-4">
  <div className="w-full flex flex-col sm:flex-row gap-4">
    <Button
      variant="outline"
      className="w-full"
      onClick={() => router.push("/available-rewards")}
    >
      View Available Rewards
    </Button>

    <Button
      variant="outline"
      className="w-full"
      onClick={() => router.push("/history")}
    >
      Transaction History
    </Button>
  </div>

  <Button
    onClick={handleLogout}
    variant="destructive"
    className="w-full"
    disabled={isLoggingOut}
  >
    {isLoggingOut ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Logging out...
      </>
    ) : (
      <>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </>
    )}
  </Button>
</CardFooter>

      </Card>
    </div>
  )
}