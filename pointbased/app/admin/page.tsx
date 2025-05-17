'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  points: number;
  created_at: string;
}

interface Purchase {
  id: number;
  total_amount: number;
  payment_method: string;
  created_at: string;
}

interface PurchaseItem {
  id: number;
  item_id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  is_reward: boolean;
}

interface SummaryData {
  totalTransactions: number;
  totalRecycledItems: number;
  totalRewardItems: number;
  totalQuantityRecycled: number;
  totalRevenue: number;
  totalRewardValue: number;
  totalUsers: number;
  lastTransaction: string;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<SummaryData | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [items, setItems] = useState<PurchaseItem[]>([]);

  useEffect(() => {
    fetch('/api/admin/summary')
      .then((res) => res.json())
      .then((data: SummaryData) => setData(data))
      .catch((err) => console.error('Failed to fetch summary:', err));
  }, []);

  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data))
      .catch((err) => console.error('Failed to fetch users:', err));
  }, []);

  const handleUserClick = async (userId: number) => {
    setSelectedUserId(userId);
    try {
      const purchaseRes = await fetch(`/api/admin/users/${userId}/purchases`);
      if (!purchaseRes.ok) throw new Error('Failed to fetch purchases');
      const purchaseData: Purchase[] = await purchaseRes.json();
      setPurchases(purchaseData);
      setItems([]);
    } catch (err) {
      console.error('Failed to fetch purchases:', err);
      setPurchases([]);
    }
  };

  const handlePurchaseClick = async (purchaseId: number) => {
    try {
      const itemsRes = await fetch(`/api/admin/purchases/${purchaseId}/items`);
      if (!itemsRes.ok) throw new Error('Failed to fetch items');
      const itemsData: PurchaseItem[] = await itemsRes.json();
      setItems(itemsData);
    } catch (err) {
      console.error('Failed to fetch items:', err);
      setItems([]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold">Total Transactions</h3>
              <p>{data.totalTransactions}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold">Recycled Items</h3>
              <p>{data.totalRecycledItems}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold">Reward Items</h3>
              <p>{data.totalRewardItems}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold">Total Quantity Recycled</h3>
              <p>{data.totalQuantityRecycled}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold">Total Revenue</h3>
              <p>₹{data.totalRevenue.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold">Reward Value Given</h3>
              <p>₹{data.totalRewardValue.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold">Total Users</h3>
              <p>{data.totalUsers}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold">Last Transaction</h3>
              <p>{new Date(data.lastTransaction).toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>
      )}

      <ScrollArea className="h-[calc(100vh-200px)]">
        <Tabs defaultValue="users" className="w-full">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="purchases" disabled={!selectedUserId}>
              Purchases
            </TabsTrigger>
            <TabsTrigger value="items" disabled={items.length === 0}>
              Items
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow
                    key={u.id}
                    onClick={() => handleUserClick(u.id)}
                    className="cursor-pointer hover:bg-muted"
                  >
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.mobile}</TableCell>
                    <TableCell>{u.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="purchases">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchases.map((p) => (
                  <TableRow
                    key={p.id}
                    onClick={() => handlePurchaseClick(p.id)}
                    className="cursor-pointer hover:bg-muted"
                  >
                    <TableCell>₹{p.total_amount.toFixed(2)}</TableCell>
                    <TableCell>{p.payment_method}</TableCell>
                    <TableCell>{new Date(p.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="items">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Reward?</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell>{i.name}</TableCell>
                    <TableCell>{i.size}</TableCell>
                    <TableCell>{i.quantity}</TableCell>
                    <TableCell>₹{i.price.toFixed(2)}</TableCell>
                    <TableCell>{i.is_reward ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
}