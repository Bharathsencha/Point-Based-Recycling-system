import { Card, CardContent } from "@/components/ui/card"
import { Recycle, ShoppingCart, CreditCard, Package } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: Recycle,
      title: "Collect Recyclables",
      description: "Gather your recyclable items such as plastic bottles, glass bottles, and cans.",
    },
    {
      icon: ShoppingCart,
      title: "Add to Cart",
      description: "Select the type, size, and quantity of your recyclables and add them to your cart.",
    },
    {
      icon: Package,
      title: "Submit Items",
      description: "Complete the checkout process and arrange for collection or drop-off of your recyclables.",
    },
    {
      icon: CreditCard,
      title: "Earn Points",
      description: "Receive points based on the type and quantity of recyclables you submit.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Follow these simple steps to participate in our recycling rewards program.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8 w-full">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="overflow-hidden border-green-200 dark:border-green-900 transition-all duration-300 hover:shadow-lg hover:shadow-green-100/20 dark:hover:shadow-green-900/20"
              >
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
