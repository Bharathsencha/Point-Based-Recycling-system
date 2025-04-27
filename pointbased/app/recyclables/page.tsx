import RecyclableItems from "@/components/recyclable-items"

export default function RecyclablesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">Recyclable Items</h1>
      <RecyclableItems styleVariant="compact" />
    </div>
  )
}
