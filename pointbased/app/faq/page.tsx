export default function FAQPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <section className="space-y-4">
        <article>
          <h2 className="text-xl font-semibold">What is EcoRewards?</h2>
          <p>EcoRewards is a platform that encourages recycling by rewarding users with points that can be redeemed for essential goods and services.</p>
        </article>
        <article>
          <h2 className="text-xl font-semibold">How do I earn points?</h2>
          <p>You earn points by submitting recyclable items through our platform. The more you recycle, the more points you earn.</p>
        </article>
        <article>
          <h2 className="text-xl font-semibold">How can I redeem my points?</h2>
          <p>Points can be redeemed for various essential goods and services listed on our rewards page.</p>
        </article>
      </section>
    </main>
  )
}
