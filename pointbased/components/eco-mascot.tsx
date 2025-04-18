"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const ecoTips = [
  "Did you know? Recycling one aluminum can saves enough energy to run a TV for three hours.",
  "Plastic bottles take up to 450 years to decompose in landfills.",
  "Glass can be recycled endlessly without loss in quality or purity.",
  "Recycling paper reduces greenhouse gas emissions that can contribute to climate change.",
  "The energy saved from recycling one glass bottle can power a computer for 30 minutes.",
  "Every ton of paper recycled saves 17 trees, 7,000 gallons of water and 380 gallons of oil.",
  "Recycling plastic saves twice as much energy as burning it in an incinerator.",
  "The average person has the opportunity to recycle more than 25,000 cans in their lifetime.",
]

export function EcoMascot() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [currentTip, setCurrentTip] = useState("")
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    // Show mascot after 5 seconds
    const timer = setTimeout(() => {
      if (!isClosed) setIsVisible(true)
    }, 5000)

    // Set random tip
    setCurrentTip(ecoTips[Math.floor(Math.random() * ecoTips.length)])

    return () => clearTimeout(timer)
  }, [isClosed])

  const handleClose = () => {
    setIsVisible(false)
    setIsClosed(true)
  }

  const handleMascotClick = () => {
    setShowMessage(!showMessage)
    // Change tip when clicked
    setCurrentTip(ecoTips[Math.floor(Math.random() * ecoTips.length)])
  }

  if (isClosed) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-2 max-w-[250px]"
          >
            <Card>
              <CardContent className="p-3 text-sm">
                <p>{currentTip}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            className="relative"
          >
            <Button
              variant="outline"
              size="icon"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 z-10"
              onClick={handleClose}
            >
              <X className="h-3 w-3" />
            </Button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMascotClick}
              className="relative cursor-pointer"
            >
              <div className="relative h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center shadow-lg">
                <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  className="absolute -top-1 -right-1"
                >
                  <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
