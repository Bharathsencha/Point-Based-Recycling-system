import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import RecyclableItems from "@/components/recyclable-items"
import HowItWorks from "@/components/how-it-works"
import ImpactCounter from "@/components/impact-counter"
import { CommunityLeaderboard } from "@/components/community-leaderboard"
import { EcoMascot } from "@/components/eco-mascot"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroSection />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Recyclable Items</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Select your recyclable items, specify the size and quantity, and add them to your cart.
              </p>
            </div>
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
                  <Skeleton className="h-[350px] w-full rounded-xl" />
                  <Skeleton className="h-[350px] w-full rounded-xl" />
                  <Skeleton className="h-[350px] w-full rounded-xl" />
                  <Skeleton className="h-[350px] w-full rounded-xl" />
                  <Skeleton className="h-[350px] w-full rounded-xl" />
                  <Skeleton className="h-[350px] w-full rounded-xl" />
                </div>
              }
            >
              <RecyclableItems limit={3} />
            </Suspense>
          </div>
        </div>
      </section>
      <HowItWorks />
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-1">
            <ImpactCounter />
          </div>
        </div>
      </section>
      <EcoMascot />
    </main>
  )
}
