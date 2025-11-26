import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { OrderLineRow } from "@/components/OrderLineRow";
import { Save, Plus, Menu, FileText, User, Calendar, Truck, DollarSign, Package } from "lucide-react";
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
  const [customColumns, setCustomColumns] = useState<string[]>([]);
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

  const handleAddCustomColumn = () => {
    const columnName = prompt("Enter custom column name:");
    if (columnName && columnName.trim()) {
      setCustomColumns([...customColumns, columnName.trim()]);
      toast({
        title: "Column Added",
        description: `Custom column "${columnName}" has been added.`,
      });
    }
  };

  const handleSave = () => {
    toast({
      title: "Order Saved",
      description: "Master order has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card px-4 py-2 flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Menu className="h-4 w-4" />
        </Button>
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/" },
            { label: "Master Orders", href: "/master-orders" },
            { label: "Master Order #40" },
          ]}
        />
      </div>

      <div className="p-4 max-w-[1600px] mx-auto">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-lg font-bold text-foreground">{formData.orderNumber}</h1>
                <p className="text-xs text-muted-foreground">Master Order</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => toast({ 
                    title: "Purchase Order Created", 
                    description: "New purchase order has been generated from this master order." 
                  })}
                  size="sm"
                  className="gap-1.5 h-8"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Create Purchase Order
                </Button>
                <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded border border-border">
                  <Package className="h-3 w-3 text-primary" />
                  <Checkbox
                    id="virtualInventory"
                    checked={formData.virtualInventory}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, virtualInventory: checked as boolean })
                    }
                  />
                  <Label htmlFor="virtualInventory" className="text-xs cursor-pointer">
                    Virtual Inventory
                  </Label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-2">
              {/* Left Side - All Form Fields */}
              <div className="space-y-2">
                {/* Basic Information */}
                <div className="bg-muted/20 rounded p-2 border border-border/50">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <FileText className="h-3 w-3 text-primary" />
                    <h3 className="text-xs font-semibold text-foreground">BASIC INFO</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="projectName" className="text-xs">Project</Label>
                      <Input
                        id="projectName"
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                        className="mt-0.5 h-7 text-xs"
                        placeholder="Project name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="client" className="text-xs flex items-center gap-1">
                        <User className="h-2.5 w-2.5" />
                        <span>Client</span>
                      </Label>
                      <Input
                        id="client"
                        value={formData.client}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        className="mt-0.5 h-7 text-xs"
                        placeholder="Client name"
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-muted/20 rounded p-2 border border-border/50">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Calendar className="h-3 w-3 text-primary" />
                    <h3 className="text-xs font-semibold text-foreground">TIMELINE</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="orderDate" className="text-xs">Order Date</Label>
                      <Input
                        id="orderDate"
                        type="date"
                        value={formData.orderDate}
                        onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                        className="mt-0.5 h-7 text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expectedDelivery" className="text-xs">Delivery</Label>
                      <Input
                        id="expectedDelivery"
                        type="date"
                        value={formData.expectedDelivery}
                        onChange={(e) => setFormData({ ...formData, expectedDelivery: e.target.value })}
                        className="mt-0.5 h-7 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="bg-muted/20 rounded p-2 border border-border/50">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Truck className="h-3 w-3 text-primary" />
                    <h3 className="text-xs font-semibold text-foreground">SHIPPING</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="shipper" className="text-xs">Shipper</Label>
                      <Input
                        id="shipper"
                        value={formData.shipper}
                        onChange={(e) => setFormData({ ...formData, shipper: e.target.value })}
                        className="mt-0.5 h-7 text-xs"
                        placeholder="Shipper"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <div>
                        <Label htmlFor="shippingCost" className="text-xs">Cost</Label>
                        <Input
                          id="shippingCost"
                          type="number"
                          value={formData.shippingCost}
                          onChange={(e) => setFormData({ ...formData, shippingCost: Number(e.target.value) })}
                          className="mt-0.5 h-7 text-xs"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="shippingCharge" className="text-xs">Charge</Label>
                        <Input
                          id="shippingCharge"
                          type="number"
                          value={formData.shippingCharge}
                          onChange={(e) => setFormData({ ...formData, shippingCharge: Number(e.target.value) })}
                          className="mt-0.5 h-7 text-xs"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="shippingMargin" className="text-xs">Margin %</Label>
                        <Input
                          id="shippingMargin"
                          type="number"
                          value={formData.shippingMargin}
                          onChange={(e) => setFormData({ ...formData, shippingMargin: Number(e.target.value) })}
                          className="mt-0.5 h-7 text-xs"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="bg-muted/20 rounded p-2 border border-border/50">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <DollarSign className="h-3 w-3 text-primary" />
                    <h3 className="text-xs font-semibold text-foreground">FINANCIAL</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <Label htmlFor="currency" className="text-xs">Currency</Label>
                        <Input
                          id="currency"
                          value={formData.currency}
                          onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                          className="mt-0.5 h-7 text-xs"
                          placeholder="USD"
                        />
                      </div>
                      <div>
                        <Label htmlFor="commissionRate" className="text-xs">Commission %</Label>
                        <Input
                          id="commissionRate"
                          type="number"
                          value={formData.commissionRate}
                          onChange={(e) => setFormData({ ...formData, commissionRate: Number(e.target.value) })}
                          className="mt-0.5 h-7 text-xs"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="totalProfit" className="text-xs font-semibold">Total Profit</Label>
                      <Input
                        id="totalProfit"
                        type="number"
                        value={formData.totalProfit}
                        onChange={(e) => setFormData({ ...formData, totalProfit: Number(e.target.value) })}
                        className="mt-0.5 h-8 text-xs font-bold bg-primary/5 border-primary/20"
                        disabled
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Link Buttons */}
              <div className="space-y-3">
                <div className="bg-card rounded p-4 border border-border">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Related Orders</h3>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2 h-9"
                      onClick={() => toast({ title: "Navigate to Sale Order" })}
                    >
                      <FileText className="h-4 w-4" />
                      Sale Order
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2 h-9"
                      onClick={() => toast({ title: "Navigate to Purchase Order" })}
                    >
                      <Package className="h-4 w-4" />
                      Purchase Order
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2 h-9"
                      onClick={() => toast({ title: "Navigate to Shipping" })}
                    >
                      <Truck className="h-4 w-4" />
                      Shipping
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2 h-9"
                      onClick={() => toast({ title: "Navigate to Payment" })}
                    >
                      <DollarSign className="h-4 w-4" />
                      Payment
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold">Order Lines</h2>
                <div className="flex gap-2">
                  <Button onClick={handleAddLine} size="sm" className="gap-1 h-8 text-xs">
                    <Plus className="h-3 w-3" />
                    Add Line
                  </Button>
                  <Button onClick={handleAddCustomColumn} variant="outline" size="sm" className="gap-1 h-8 text-xs">
                    <Plus className="h-3 w-3" />
                    Add Custom Column
                  </Button>
                </div>
              </div>

              <div className="border border-border overflow-hidden">
                <table className="w-full border-collapse">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-14">Image</th>
                      <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30">Product Name</th>
                      <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30">Description</th>
                      <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-16">Qty</th>
                      <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-24">Unit Price</th>
                      <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30">Vendor</th>
                      {customColumns.map((col, idx) => (
                        <th key={idx} className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-32">
                          {col}
                        </th>
                      ))}
                      <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-24">Subtotal</th>
                      <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-12">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card">
                    {orderLines.map((line) => (
                      <OrderLineRow
                        key={line.id}
                        line={line}
                        onUpdate={handleUpdateLine}
                        onDelete={handleDeleteLine}
                        customColumns={customColumns}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4">
              <Button onClick={handleSave} size="sm" className="gap-1 h-8">
                <Save className="h-3 w-3" />
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
