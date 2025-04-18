import { Button } from "@/components/ui/button"
import { ArrowRight, Recycle } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-green-50 to-background dark:from-green-950/30 dark:to-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Recycle, Earn Points, <br />
                <span className="text-green-600 dark:text-green-400">Make a Difference</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join our recycling rewards program and earn points for every recyclable item you submit. Redeem your
                points for essential goods and services.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/login">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Recycle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-muted-foreground">500,000+ Items Recycled</span>
              </div>
              <div className="flex items-center space-x-1">
                <Recycle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-muted-foreground">10,000+ Active Users</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[500px] overflow-hidden rounded-full bg-gradient-to-br from-green-100 via-green-50 to-white dark:from-green-900/40 dark:via-green-900/20 dark:to-background p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,255,120,0.15),transparent_70%)]"></div>
              <div className="relative h-full w-full rounded-full bg-white dark:bg-black/20 shadow-xl flex items-center justify-center">
                <Recycle className="h-32 w-32 text-green-600 dark:text-green-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
