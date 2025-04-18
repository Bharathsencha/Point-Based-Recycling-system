"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Leaf, Droplet, Wind } from "lucide-react"
import { motion } from "framer-motion"

export default function ImpactCounter() {
  const [mounted, setMounted] = useState(false)
  const [counts, setCounts] = useState({
    bottles: 0,
    water: 0,
    emissions: 0,
  })

  const targets = {
    bottles: 523487,
    water: 2145,
    emissions: 1876,
  }

  useEffect(() => {
    setMounted(true)

    const interval = setInterval(() => {
      setCounts((prev) => ({
        bottles: Math.min(prev.bottles + 1234, targets.bottles),
        water: Math.min(prev.water + 5, targets.water),
        emissions: Math.min(prev.emissions + 4, targets.emissions),
      }))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Impact</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Together, we're making a difference for our planet.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="overflow-hidden border-green-200 dark:border-green-900">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold">Bottles Recycled</h3>
                      <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                        {counts.bottles.toLocaleString()}
                      </p>
                    </div>
                    <Progress
                      value={(counts.bottles / targets.bottles) * 100}
                      className="h-2 w-full bg-green-100 dark:bg-green-900/30"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="overflow-hidden border-blue-200 dark:border-blue-900">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Droplet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold">Water Saved (kL)</h3>
                      <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                        {counts.water.toLocaleString()}
                      </p>
                    </div>
                    <Progress
                      value={(counts.water / targets.water) * 100}
                      className="h-2 w-full bg-blue-100 dark:bg-blue-900/30"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="overflow-hidden border-purple-200 dark:border-purple-900">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Wind className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold">CO₂ Reduced (tons)</h3>
                      <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                        {counts.emissions.toLocaleString()}
                      </p>
                    </div>
                    <Progress
                      value={(counts.emissions / targets.emissions) * 100}
                      className="h-2 w-full bg-purple-100 dark:bg-purple-900/30"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
