"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PurchaseItem {
  item_id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  is_reward: number;
}


interface Purchase {
  id: number;
  total_amount: number;
  payment_method: string;
  created_at: string;
  items: PurchaseItem[];
}

export default function RewardsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [purchases, setPurchases] = useState<Purchase[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?callbackUrl=/rewards");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchPurchases() {
      try {
        const res = await fetch("/api/user/purchases", { credentials: "include" });
        if (!res.ok) {
          throw new Error("Failed to fetch purchase history");
        }
        const data = await res.json();
        setPurchases(data.purchases);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    }
    if (user) {
      fetchPurchases();
    }
  }, [user]);

  if (loading || purchases === null) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="container py-12">
        <p className="text-center text-muted-foreground">You have no purchase history yet.</p>
        <div className="text-center mt-4">
          <Button onClick={() => router.push("/recyclables")}>Browse Recyclable Items</Button>
        </div>
      </div>
    );
  }

  function getPurchaseType(items: PurchaseItem[]): "Purchased" | "Recycled" | "Mixed" {
  const hasRewards = items.some((item) => item.is_reward === 1);
  const hasRecycled = items.some((item) => item.is_reward === 0);

  if (hasRewards && hasRecycled) return "Mixed";
  return hasRewards ? "Purchased" : "Recycled";
}


  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">My Rewards & Purchase History</h1>
      {purchases.map((purchase) => (
        <Card key={purchase.id} className="mb-6">
          <CardHeader>
          <CardTitle>
            {getPurchaseType(purchase.items)} on {new Date(purchase.created_at).toLocaleDateString()}
          </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 font-medium">Payment Method: {purchase.payment_method}</p>
            <div className="space-y-2">
              {purchase.items.map((item) => (
                <div key={item.item_id + item.size} className="flex justify-between py-2 border-b last:border-b-0">
  
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.size} × Quantity: {item.quantity}
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        {item.is_reward ? "Purchased" : "Recycled"}
                      </p>
                    </div>
                  <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <Separator className="my-2" />
            <p className="text-right font-bold">Total: ₹{purchase.total_amount.toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
