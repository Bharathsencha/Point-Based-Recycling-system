import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Recycle, Coins, ShieldCheck } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2 text-center mb-12">
          <Badge className="mb-2">About Us</Badge>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Our Mission</h1>
          <p className="text-muted-foreground md:text-xl">
            Promoting sustainable recycling habits through rewards and incentives
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert mx-auto mb-12">
          <p>
            The Recycling-Based Point System is a digital initiative aimed at promoting sustainable recycling habits by
            rewarding users with redeemable points based on the type and quantity of recyclables they submit. Users can
            exchange these points for essential goods and services like medicine, electricity bill payments, or school
            fees.
          </p>
          <p>
            Our system features a user-friendly portal for submissions and tracking, alongside an admin dashboard for
            managing transactions and ensuring compliance. By leveraging modern technology, this project seeks to
            encourage responsible waste management and contribute to environmental sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="overflow-hidden border-green-200 dark:border-green-900 transition-all duration-300 hover:shadow-lg hover:shadow-green-100/20 dark:hover:shadow-green-900/20">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold">Environmental Impact</h3>
              <p className="text-muted-foreground">
                Our initiative has helped divert thousands of recyclable items from landfills, significantly reducing
                environmental pollution and conserving natural resources.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-cyan-200 dark:border-cyan-900 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-100/20 dark:hover:shadow-cyan-900/20">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                <Recycle className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold">Sustainable Practices</h3>
              <p className="text-muted-foreground">
                We promote circular economy principles by ensuring recyclables are properly processed and reintroduced
                into the manufacturing cycle, reducing the need for virgin materials.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-amber-200 dark:border-amber-900 transition-all duration-300 hover:shadow-lg hover:shadow-amber-100/20 dark:hover:shadow-amber-900/20">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Coins className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold">Economic Benefits</h3>
              <p className="text-muted-foreground">
                Our point system provides tangible economic benefits to participants, allowing them to offset essential
                expenses while contributing to environmental conservation.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-purple-200 dark:border-purple-900 transition-all duration-300 hover:shadow-lg hover:shadow-purple-100/20 dark:hover:shadow-purple-900/20">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold">Community Engagement</h3>
              <p className="text-muted-foreground">
                We foster community involvement through educational programs, recycling drives, and partnerships with
                local businesses and institutions to maximize our collective impact.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            Be part of the solution by participating in our recycling program. Every bottle, can, and container makes a
            difference in building a more sustainable future.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="outline" className="text-sm py-2 px-4">
              Since 2023
            </Badge>
            <Badge variant="outline" className="text-sm py-2 px-4">
              10,000+ Users
            </Badge>
            <Badge variant="outline" className="text-sm py-2 px-4">
              500,000+ Items Recycled
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
