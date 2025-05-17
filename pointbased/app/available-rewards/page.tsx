"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface Reward {
  id: string;
  name: string;
  image: string;
  pointsRequired: number;
  rupeeValue: number;
}

export default function AvailableRewardsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error" | "warning"; message: string } | null>(null);

  const rewards: Reward[] = [
    { id: "1", name: "Amazon Gift Voucher", image: "/amazon.jpg", pointsRequired: 10000, rupeeValue: 1000 },
    { id: "2", name: "BookMyShow Voucher", image: "/bms.jpg", pointsRequired: 4205, rupeeValue: 420.5 },
    { id: "3", name: "Flipkart Gift Card", image: "/flipkart.png", pointsRequired: 8000, rupeeValue: 800 },
    { id: "4", name: "Myntra Gift Voucher", image: "/myntra.jpg", pointsRequired: 6000, rupeeValue: 600 },
    { id: "5", name: "Zomato Gift Card", image: "/zomato.jpg", pointsRequired: 5000, rupeeValue: 500 },
    { id: "6", name: "Swiggy Gift Voucher", image: "/swiggy.png", pointsRequired: 5500, rupeeValue: 550 },
  ];

  const handlePurchase = async (reward: Reward) => {
    setIsLoading(true);
    console.log('Sending purchase request with userId:', user?.id);
    try {
      const res = await fetch("/api/purchase-reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          rewardId: reward.id,
          voucherName: reward.name,
          pointsRequired: reward.pointsRequired,
          pointsSpent: reward.pointsRequired,
          rupeeValue: reward.rupeeValue,
          purchaseDate: new Date().toISOString(),
        }),
      });

      setIsLoading(false);
      if (res.status === 200) {
        setAlert({ type: "success", message: "Reward purchased successfully!" });
      } else if (res.status === 404) {
        setAlert({ type: "error", message: "Server error. Please try again later." });
      } else if (res.status === 502) {
        const data = await res.json();
        setAlert({ type: "warning", message: data.error });
      }

      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setIsLoading(false);
      setAlert({ type: "error", message: "Failed to process purchase." });
      setTimeout(() => setAlert(null), 3000);
    }
    setSelectedReward(null);
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?callbackUrl=/available-rewards");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Available Rewards</h1>
      {alert && (
        <Alert className="mb-6" variant={alert.type === "success" ? "default" : "destructive"}>
          <AlertTitle>{alert.type === "success" ? "Success" : alert.type === "warning" ? "Warning" : "Error"}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <Card key={reward.id} className="flex flex-col">
            <CardHeader className="p-0">
              <img
                src={reward.image}
                alt={reward.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4 flex-1 flex flex-col">
              <p className="font-semibold text-lg mb-2">{reward.name}</p>
              <div className="mt-auto">
                <p className="text-sm text-muted-foreground mb-1">
                  {reward.pointsRequired.toLocaleString()} points
                </p>
                <p className="text-sm font-medium mb-2">
                  ₹{reward.rupeeValue.toFixed(1)} Voucher
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedReward(reward)} disabled={isLoading}>
                      {isLoading && selectedReward?.id === reward.id ? (
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      ) : null}
                      Buy Now
                    </Button>
                  </DialogTrigger>
                  {selectedReward?.id === reward.id && (
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Purchase</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to buy the {reward.name} for {reward.pointsRequired} points?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedReward(null)} disabled={isLoading}>
                          Cancel
                        </Button>
                        <Button onClick={() => handlePurchase(reward)} disabled={isLoading}>
                          {isLoading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
                          Yes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}