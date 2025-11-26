import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { OrderLineRow } from "@/components/OrderLineRow";
import { Save, Plus, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderLine {
  id: string;
  image?: string;
  productName: string;
  description: string;
  qty: number;
  unitPrice: number;
  vendor: string;
}

const MasterOrder = () => {
  const { toast } = useToast();
  const [orderLines, setOrderLines] = useState<OrderLine[]>([
    {
      id: '1',
      productName: 'hh',
      description: '',
      qty: 0,
      unitPrice: 0,
      vendor: '3,Administrator',
    },
  ]);

  const [formData, setFormData] = useState({
    orderNumber: 'MO25-0040',
    projectName: 'ppr t',
    client: 'Hammed',
    orderDate: '2025-03-27',
    expectedDelivery: '2025-11-27',
    virtualInventory: false,
    shipper: '',
    shippingCost: 0,
    shippingCharge: 0,
    shippingMargin: 4,
    currency: 'USD',
    commissionRate: 0,
    totalProfit: 0,
  });

  const handleAddLine = () => {
    const newLine: OrderLine = {
      id: Date.now().toString(),
      productName: '',
      description: '',
      qty: 0,
      unitPrice: 0,
      vendor: '',
    };
    setOrderLines([...orderLines, newLine]);
  };

  const handleUpdateLine = (id: string, field: keyof OrderLine, value: any) => {
    setOrderLines(orderLines.map(line => 
      line.id === id ? { ...line, [field]: value } : line
    ));
  };

  const handleDeleteLine = (id: string) => {
    setOrderLines(orderLines.filter(line => line.id !== id));
  };

  const handleSave = () => {
    toast({
      title: "Order Saved",
      description: "Master order has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card px-6 py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/" },
            { label: "Master Orders", href: "/master-orders" },
            { label: "Master Order #40" },
          ]}
        />
      </div>

      <div className="p-6 max-w-[1400px] mx-auto">
        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground">{formData.orderNumber}</h1>
              <p className="text-sm text-muted-foreground">Master Order</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="orderDate">Order Date</Label>
                  <Input
                    id="orderDate"
                    type="date"
                    value={formData.orderDate}
                    onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="virtualInventory"
                    checked={formData.virtualInventory}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, virtualInventory: checked as boolean })
                    }
                  />
                  <Label htmlFor="virtualInventory" className="text-sm font-normal">
                    Virtual Inventory (Dropship/D2D)
                  </Label>
                </div>

                <div>
                  <Label htmlFor="shippingCost">Shipping Cost</Label>
                  <Input
                    id="shippingCost"
                    type="number"
                    value={formData.shippingCost}
                    onChange={(e) => setFormData({ ...formData, shippingCost: Number(e.target.value) })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="shippingMargin">Shipping Margin</Label>
                  <Input
                    id="shippingMargin"
                    type="number"
                    value={formData.shippingMargin}
                    onChange={(e) => setFormData({ ...formData, shippingMargin: Number(e.target.value) })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    value={formData.commissionRate}
                    onChange={(e) => setFormData({ ...formData, commissionRate: Number(e.target.value) })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="expectedDelivery">Expected Delivery</Label>
                  <Input
                    id="expectedDelivery"
                    type="date"
                    value={formData.expectedDelivery}
                    onChange={(e) => setFormData({ ...formData, expectedDelivery: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="shipper">Shipper</Label>
                  <Input
                    id="shipper"
                    value={formData.shipper}
                    onChange={(e) => setFormData({ ...formData, shipper: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="shippingCharge">Shipping Charge</Label>
                  <Input
                    id="shippingCharge"
                    type="number"
                    value={formData.shippingCharge}
                    onChange={(e) => setFormData({ ...formData, shippingCharge: Number(e.target.value) })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="totalProfit">Total Profit</Label>
                  <Input
                    id="totalProfit"
                    type="number"
                    value={formData.totalProfit}
                    onChange={(e) => setFormData({ ...formData, totalProfit: Number(e.target.value) })}
                    className="mt-1"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Order Lines</h2>
                <div className="flex gap-2">
                  <Button onClick={handleAddLine} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Line
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Custom Column
                  </Button>
                </div>
              </div>

              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr className="border-b border-border">
                      <th className="text-left p-3 text-sm font-medium text-foreground">Image</th>
                      <th className="text-left p-3 text-sm font-medium text-foreground">Product Name</th>
                      <th className="text-left p-3 text-sm font-medium text-foreground">Description</th>
                      <th className="text-left p-3 text-sm font-medium text-foreground">Qty</th>
                      <th className="text-left p-3 text-sm font-medium text-foreground">Unit Price</th>
                      <th className="text-left p-3 text-sm font-medium text-foreground">Vendor</th>
                      <th className="text-left p-3 text-sm font-medium text-foreground">Subtotal</th>
                      <th className="text-left p-3 text-sm font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card">
                    {orderLines.map((line) => (
                      <OrderLineRow
                        key={line.id}
                        line={line}
                        onUpdate={handleUpdateLine}
                        onDelete={handleDeleteLine}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MasterOrder;
