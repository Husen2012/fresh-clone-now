import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderLineRow } from "@/components/OrderLineRow";
import { DocumentsTab } from "@/components/DocumentsTab";
import { MobileOrderLineCard } from "@/components/MobileOrderLineCard";
import { MobileOrderLineEditSheet } from "@/components/MobileOrderLineEditSheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Save,
  Plus,
  Menu,
  FileText,
  User,
  Calendar,
  DollarSign,
  Package,
  Download,
  MoreVertical,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface OrderLine {
  id: string;
  image?: string;
  productName: string;
  description: string;
  qty: number;
  unitPrice: number;
  vendor: string;
  [key: string]: any;
}

const MasterOrder = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [customColumns, setCustomColumns] = useState<string[]>([]);
  const [orderLines, setOrderLines] = useState<OrderLine[]>([
    {
      id: "1",
      productName: "hh",
      description: "",
      qty: 0,
      unitPrice: 0,
      vendor: "3,Administrator",
    },
  ]);

  // Mobile edit sheet state
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [editingLine, setEditingLine] = useState<OrderLine | null>(null);
  const [isNewLine, setIsNewLine] = useState(false);

  const [formData, setFormData] = useState({
    orderNumber: "MO25-0040",
    projectName: "ppr t",
    client: "Hammed",
    orderDate: "2025-03-27",
    expectedDelivery: "2025-11-27",
    virtualInventory: false,
    currency: "USD",
    commissionRate: 0,
    totalProfit: 0,
  });

  const handleAddLine = () => {
    if (isMobile) {
      setEditingLine(null);
      setIsNewLine(true);
      setEditSheetOpen(true);
    } else {
      const newLine: OrderLine = {
        id: Date.now().toString(),
        productName: "",
        description: "",
        qty: 0,
        unitPrice: 0,
        vendor: "",
      };
      setOrderLines([...orderLines, newLine]);
    }
  };

  const handleEditLine = (line: OrderLine) => {
    setEditingLine(line);
    setIsNewLine(false);
    setEditSheetOpen(true);
  };

  const handleSaveLine = (line: OrderLine) => {
    if (isNewLine) {
      setOrderLines([...orderLines, line]);
    } else {
      setOrderLines(
        orderLines.map((l) => (l.id === line.id ? line : l))
      );
    }
  };

  const handleUpdateLine = (id: string, field: keyof OrderLine, value: any) => {
    setOrderLines(
      orderLines.map((line) =>
        line.id === id ? { ...line, [field]: value } : line
      )
    );
  };

  const handleDeleteLine = (id: string) => {
    setOrderLines(orderLines.filter((line) => line.id !== id));
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

  const handleSync = () => {
    toast({
      title: "Syncing...",
      description: "Master order is being synchronized.",
    });
  };

  const handleCreateSalesOrder = () => {
    toast({
      title: "Sales Order Created",
      description: "New sales order has been generated from this master order.",
    });
  };

  const handleCreatePurchaseOrder = () => {
    toast({
      title: "Purchase Order Created",
      description: "New purchase order has been generated from this master order.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exporting to Excel",
      description: "Order lines are being exported.",
    });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="border-b border-border bg-card px-2 md:px-4 py-2 flex items-center gap-2 md:gap-3 overflow-hidden">
        <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0">
          <Menu className="h-4 w-4" />
        </Button>
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/" },
            { label: "Master Orders", href: "/master-orders" },
            { label: "Order #40" },
          ]}
        />
      </div>

      <div className="p-3 md:p-4 max-w-[1600px] mx-auto">
        <Card>
          <CardContent className="p-4">
            {/* Header - Responsive */}
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  {formData.orderNumber}
                </h1>
                <p className="text-xs text-muted-foreground">Master Order</p>
              </div>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center gap-2">
                <Button onClick={handleSync} size="sm" variant="outline" className="gap-1.5 h-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                  </svg>
                  Sync
                </Button>
                <Button onClick={handleCreateSalesOrder} size="sm" variant="outline" className="gap-1.5 h-8">
                  <Plus className="h-3.5 w-3.5" />
                  Create Sales Order
                </Button>
                <Button onClick={handleCreatePurchaseOrder} size="sm" className="gap-1.5 h-8">
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

              {/* Mobile Actions - Dropdown */}
              <div className="flex md:hidden items-center gap-2">
                <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded border border-border">
                  <Package className="h-3 w-3 text-primary" />
                  <Checkbox
                    id="virtualInventoryMobile"
                    checked={formData.virtualInventory}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, virtualInventory: checked as boolean })
                    }
                  />
                  <Label htmlFor="virtualInventoryMobile" className="text-xs cursor-pointer">
                    VI
                  </Label>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background">
                    <DropdownMenuItem onClick={handleSync}>
                      Sync
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCreateSalesOrder}>
                      Create Sales Order
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCreatePurchaseOrder}>
                      Create Purchase Order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Form Fields - Desktop: Grid, Mobile: Accordion */}
            {isMobile ? (
              <Accordion type="single" collapsible className="mb-4" defaultValue="basic-info">
                <AccordionItem value="basic-info" className="border rounded-lg mb-2">
                  <AccordionTrigger className="px-3 py-2 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Basic Info</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="projectNameMobile" className="text-xs">
                          Project
                        </Label>
                        <Input
                          id="projectNameMobile"
                          value={formData.projectName}
                          onChange={(e) =>
                            setFormData({ ...formData, projectName: e.target.value })
                          }
                          className="mt-1"
                          placeholder="Project name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="clientMobile" className="text-xs">
                          Client
                        </Label>
                        <Input
                          id="clientMobile"
                          value={formData.client}
                          onChange={(e) =>
                            setFormData({ ...formData, client: e.target.value })
                          }
                          className="mt-1"
                          placeholder="Client name"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="timeline" className="border rounded-lg mb-2">
                  <AccordionTrigger className="px-3 py-2 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Timeline</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="orderDateMobile" className="text-xs">
                          Order Date
                        </Label>
                        <Input
                          id="orderDateMobile"
                          type="date"
                          value={formData.orderDate}
                          onChange={(e) =>
                            setFormData({ ...formData, orderDate: e.target.value })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expectedDeliveryMobile" className="text-xs">
                          Expected Delivery
                        </Label>
                        <Input
                          id="expectedDeliveryMobile"
                          type="date"
                          value={formData.expectedDelivery}
                          onChange={(e) =>
                            setFormData({ ...formData, expectedDelivery: e.target.value })
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="financial" className="border rounded-lg">
                  <AccordionTrigger className="px-3 py-2 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Financial</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="currencyMobile" className="text-xs">
                            Currency
                          </Label>
                          <Input
                            id="currencyMobile"
                            value={formData.currency}
                            onChange={(e) =>
                              setFormData({ ...formData, currency: e.target.value })
                            }
                            className="mt-1"
                            placeholder="USD"
                          />
                        </div>
                        <div>
                          <Label htmlFor="commissionRateMobile" className="text-xs">
                            Commission %
                          </Label>
                          <Input
                            id="commissionRateMobile"
                            type="number"
                            value={formData.commissionRate}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                commissionRate: Number(e.target.value),
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="totalProfitMobile" className="text-xs font-semibold">
                          Total Profit
                        </Label>
                        <Input
                          id="totalProfitMobile"
                          type="number"
                          value={formData.totalProfit}
                          className="mt-1 font-bold bg-primary/5 border-primary/20"
                          disabled
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {/* Basic Information */}
                <div className="bg-muted/20 rounded p-3 border border-border/50">
                  <div className="flex items-center gap-1.5 mb-2">
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    <h3 className="text-xs font-semibold text-foreground">BASIC INFO</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="projectName" className="text-xs">
                        Project
                      </Label>
                      <Input
                        id="projectName"
                        value={formData.projectName}
                        onChange={(e) =>
                          setFormData({ ...formData, projectName: e.target.value })
                        }
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
                        onChange={(e) =>
                          setFormData({ ...formData, client: e.target.value })
                        }
                        className="mt-0.5 h-7 text-xs"
                        placeholder="Client name"
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-muted/20 rounded p-3 border border-border/50">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <h3 className="text-xs font-semibold text-foreground">TIMELINE</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="orderDate" className="text-xs">
                        Order Date
                      </Label>
                      <Input
                        id="orderDate"
                        type="date"
                        value={formData.orderDate}
                        onChange={(e) =>
                          setFormData({ ...formData, orderDate: e.target.value })
                        }
                        className="mt-0.5 h-7 text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expectedDelivery" className="text-xs">
                        Delivery
                      </Label>
                      <Input
                        id="expectedDelivery"
                        type="date"
                        value={formData.expectedDelivery}
                        onChange={(e) =>
                          setFormData({ ...formData, expectedDelivery: e.target.value })
                        }
                        className="mt-0.5 h-7 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="bg-muted/20 rounded p-3 border border-border/50">
                  <div className="flex items-center gap-1.5 mb-2">
                    <DollarSign className="h-3.5 w-3.5 text-primary" />
                    <h3 className="text-xs font-semibold text-foreground">FINANCIAL</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="currency" className="text-xs">
                          Currency
                        </Label>
                        <Input
                          id="currency"
                          value={formData.currency}
                          onChange={(e) =>
                            setFormData({ ...formData, currency: e.target.value })
                          }
                          className="mt-0.5 h-7 text-xs"
                          placeholder="USD"
                        />
                      </div>
                      <div>
                        <Label htmlFor="commissionRate" className="text-xs">
                          Commission %
                        </Label>
                        <Input
                          id="commissionRate"
                          type="number"
                          value={formData.commissionRate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              commissionRate: Number(e.target.value),
                            })
                          }
                          className="mt-0.5 h-7 text-xs"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="totalProfit" className="text-xs font-semibold">
                        Total Profit
                      </Label>
                      <Input
                        id="totalProfit"
                        type="number"
                        value={formData.totalProfit}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            totalProfit: Number(e.target.value),
                          })
                        }
                        className="mt-0.5 h-7 text-xs font-bold bg-primary/5 border-primary/20"
                        disabled
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs - Scrollable on mobile */}
            <Tabs defaultValue="order-lines" className="mt-6">
              <TabsList className="mb-3 w-full md:w-auto overflow-x-auto flex-nowrap justify-start">
                <TabsTrigger value="order-lines" className="whitespace-nowrap">
                  Order Lines
                </TabsTrigger>
                <TabsTrigger value="documents" className="whitespace-nowrap">
                  Documents
                </TabsTrigger>
                <TabsTrigger value="payments" className="whitespace-nowrap">
                  Payments
                </TabsTrigger>
                <TabsTrigger value="expenses" className="whitespace-nowrap">
                  Expenses
                </TabsTrigger>
                <TabsTrigger value="inspection" className="whitespace-nowrap">
                  Inspection
                </TabsTrigger>
              </TabsList>

              <TabsContent value="order-lines">
                {/* Order Lines Header */}
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h2 className="text-base font-semibold">Order Lines</h2>
                  <div className="flex gap-2">
                    {/* Desktop buttons */}
                    <Button
                      onClick={handleAddLine}
                      size="sm"
                      className="gap-1 h-8 text-xs hidden md:flex"
                    >
                      <Plus className="h-3 w-3" />
                      Add Line
                    </Button>
                    <Button
                      onClick={handleAddCustomColumn}
                      variant="outline"
                      size="sm"
                      className="gap-1 h-8 text-xs"
                    >
                      <Plus className="h-3 w-3" />
                      <span className="hidden sm:inline">Add Custom Column</span>
                      <span className="sm:hidden">Column</span>
                    </Button>
                    <Button
                      onClick={handleExport}
                      variant="outline"
                      size="sm"
                      className="gap-1 h-8 text-xs hidden sm:flex"
                    >
                      <Download className="h-3 w-3" />
                      Export to Excel
                    </Button>
                  </div>
                </div>

                {/* Desktop: Table View */}
                <div className="hidden md:block border border-border overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-14">
                          Image
                        </th>
                        <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30">
                          Product Name
                        </th>
                        <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30">
                          Description
                        </th>
                        <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-16">
                          Qty
                        </th>
                        <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-24">
                          Unit Price
                        </th>
                        <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30">
                          Vendor
                        </th>
                        {customColumns.map((col, idx) => (
                          <th
                            key={idx}
                            className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-32"
                          >
                            {col}
                          </th>
                        ))}
                        <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-24">
                          Subtotal
                        </th>
                        <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-12">
                          Actions
                        </th>
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

                {/* Mobile: Card View */}
                <div className="md:hidden">
                  {orderLines.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No products added yet</p>
                      <p className="text-xs">Tap the + button to add products</p>
                    </div>
                  ) : (
                    orderLines.map((line) => (
                      <MobileOrderLineCard
                        key={line.id}
                        line={line}
                        customColumns={customColumns}
                        onEdit={handleEditLine}
                        onDelete={handleDeleteLine}
                      />
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="documents">
                <DocumentsTab orderId={formData.orderNumber} />
              </TabsContent>

              <TabsContent value="payments">
                <div className="bg-muted/10 rounded p-8 border border-border text-center">
                  <DollarSign className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Payments section - Coming soon
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="expenses">
                <div className="bg-muted/10 rounded p-8 border border-border text-center">
                  <DollarSign className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Expenses section - Coming soon
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="inspection">
                <div className="bg-muted/10 rounded p-8 border border-border text-center">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Inspection section - Coming soon
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-4">
              <Button onClick={handleSave} size="sm" className="gap-1 h-8">
                <Save className="h-3 w-3" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Add Button - Mobile Only */}
      {isMobile && (
        <Button
          onClick={handleAddLine}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}

      {/* Mobile Edit Sheet */}
      <MobileOrderLineEditSheet
        open={editSheetOpen}
        onOpenChange={setEditSheetOpen}
        line={editingLine}
        customColumns={customColumns}
        onSave={handleSaveLine}
        isNew={isNewLine}
      />
    </div>
  );
};

export default MasterOrder;
