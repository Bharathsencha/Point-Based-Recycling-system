"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample leaderboard data
const leaderboardData = [
  { id: 1, name: "Sarah Johnson", points: 12450, items: 342, avatar: "/placeholder.svg" },
  { id: 2, name: "Michael Chen", points: 10820, items: 298, avatar: "/placeholder.svg" },
  { id: 3, name: "Aisha Patel", points: 9675, items: 267, avatar: "/placeholder.svg" },
  { id: 4, name: "David Kim", points: 8930, items: 246, avatar: "/placeholder.svg" },
  { id: 5, name: "Emma Wilson", points: 7845, items: 216, avatar: "/placeholder.svg" },
  { id: 6, name: "Carlos Rodriguez", points: 6790, items: 187, avatar: "/placeholder.svg" },
  { id: 7, name: "Olivia Taylor", points: 5980, items: 165, avatar: "/placeholder.svg" },
  { id: 8, name: "James Brown", points: 4870, items: 134, avatar: "/placeholder.svg" },
  { id: 9, name: "Sophia Martinez", points: 3950, items: 109, avatar: "/placeholder.svg" },
  { id: 10, name: "Noah Garcia", points: 2840, items: 78, avatar: "/placeholder.svg" },
]

export function CommunityLeaderboard() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [visibleItems, setVisibleItems] = useState(3)

  useEffect(() => {
    setVisibleItems(isExpanded ? leaderboardData.length : 3)
  }, [isExpanded])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-700" />
      default:
        return <span className="text-sm font-medium text-muted-foreground">{rank}</span>
    }
  }

  return (
    <Card className="overflow-hidden border-green-200 dark:border-green-900">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center justify-between">
          Community Leaderboard
          <Badge variant="outline" className="ml-2">
            This Month
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-6 py-2 bg-muted/50 flex items-center text-sm font-medium text-muted-foreground">
          <div className="w-10 text-center">Rank</div>
          <div className="flex-1 ml-2">User</div>
          <div className="w-20 text-right">Points</div>
          <div className="w-20 text-right">Items</div>
        </div>

        <div className="divide-y">
          <AnimatePresence initial={false}>
            {leaderboardData.slice(0, visibleItems).map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="px-6 py-3 flex items-center"
              >
                <div className="w-10 flex justify-center">{getRankIcon(index + 1)}</div>
                <div className="flex-1 flex items-center ml-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium truncate">{user.name}</span>
                </div>
                <div className="w-20 text-right font-semibold">{user.points.toLocaleString()}</div>
                <div className="w-20 text-right text-muted-foreground">{user.items}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-3 flex justify-center">
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-xs">
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Show More <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
