import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceLineRow } from "@/components/InvoiceLineRow";
import { DocumentsTab } from "@/components/DocumentsTab";
import { Save, Plus, Menu, FileText, User, Calendar, DollarSign, Download, Send, Eye, CreditCard, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";

interface InvoiceLine {
  id: string;
  product: string;
  account: string;
  quantity: number;
  unitPrice: number;
  taxes: string;
  discount: number;
}

const Invoice = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [customColumns, setCustomColumns] = useState<string[]>([]);
  const [invoiceLines, setInvoiceLines] = useState<InvoiceLine[]>([
    {
      id: '1',
      product: 'Product A',
      account: '400000 Product Sales',
      quantity: 1,
      unitPrice: 1000,
      taxes: '15%',
      discount: 0,
    },
  ]);

  const [formData, setFormData] = useState({
    invoiceNumber: `INV/2025/${id || '00001'}`,
    customer: 'Hammed',
    journal: 'Customer Invoices',
    paymentReference: '',
    fiscalPosition: '',
    invoiceDate: '2025-01-21',
    dueDate: '2025-02-20',
    accountingDate: '2025-01-21',
    currency: 'USD',
    untaxedAmount: 1000,
    taxAmount: 150,
    totalAmount: 1150,
    status: 'draft' as 'draft' | 'posted' | 'paid',
  });

  const calculateTotals = () => {
    const untaxed = invoiceLines.reduce((sum, line) => {
      return sum + (line.quantity * line.unitPrice * (1 - line.discount / 100));
    }, 0);
    const tax = invoiceLines.reduce((sum, line) => {
      const lineTotal = line.quantity * line.unitPrice * (1 - line.discount / 100);
      const taxRate = parseFloat(line.taxes.replace('%', '')) || 0;
      return sum + (lineTotal * taxRate / 100);
    }, 0);
    return { untaxed, tax, total: untaxed + tax };
  };

  const handleAddLine = () => {
    const newLine: InvoiceLine = {
      id: Date.now().toString(),
      product: '',
      account: '',
      quantity: 1,
      unitPrice: 0,
      taxes: '15%',
      discount: 0,
    };
    setInvoiceLines([...invoiceLines, newLine]);
  };

  const handleUpdateLine = (id: string, field: keyof InvoiceLine, value: any) => {
    setInvoiceLines(invoiceLines.map(line =>
      line.id === id ? { ...line, [field]: value } : line
    ));
  };

  const handleDeleteLine = (id: string) => {
    setInvoiceLines(invoiceLines.filter(line => line.id !== id));
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
      title: "Invoice Saved",
      description: "Invoice has been saved successfully.",
    });
  };

  const handlePost = () => {
    setFormData({ ...formData, status: 'posted' });
    toast({
      title: "Invoice Posted",
      description: "Invoice has been posted and is now final.",
    });
  };

  const handleRegisterPayment = () => {
    toast({
      title: "Register Payment",
      description: "Payment registration dialog would open here.",
    });
  };

  const totals = calculateTotals();

  const getStatusBadge = () => {
    switch (formData.status) {
      case 'draft':
        return <Badge variant="secondary" className="bg-muted text-muted-foreground">Draft</Badge>;
      case 'posted':
        return <Badge variant="default" className="bg-blue-500">Posted</Badge>;
      case 'paid':
        return <Badge variant="default" className="bg-green-500">Paid</Badge>;
    }
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
            { label: "Invoices", href: "/invoices" },
            { label: `Invoice #${id || '1'}` },
          ]}
        />
      </div>

      <div className="p-4 max-w-[1600px] mx-auto">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-lg font-bold text-foreground">{formData.invoiceNumber}</h1>
                  <p className="text-xs text-muted-foreground">Customer Invoice</p>
                </div>
                {getStatusBadge()}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handlePost}
                  size="sm"
                  variant="outline"
                  className="gap-1.5 h-8"
                  disabled={formData.status !== 'draft'}
                >
                  <FileText className="h-3.5 w-3.5" />
                  Post
                </Button>
                <Button
                  onClick={() => toast({
                    title: "Preview",
                    description: "Opening invoice preview..."
                  })}
                  size="sm"
                  variant="outline"
                  className="gap-1.5 h-8"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Preview
                </Button>
                <Button
                  onClick={() => toast({
                    title: "Send & Print",
                    description: "Send and print options would open here."
                  })}
                  size="sm"
                  variant="outline"
                  className="gap-1.5 h-8"
                >
                  <Send className="h-3.5 w-3.5" />
                  Send & Print
                </Button>
                <Button
                  onClick={handleRegisterPayment}
                  size="sm"
                  className="gap-1.5 h-8"
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  Register Payment
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {/* Basic Information */}
              <div className="bg-muted/20 rounded p-3 border border-border/50">
                <div className="flex items-center gap-1.5 mb-2">
                  <User className="h-3.5 w-3.5 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">CUSTOMER INFO</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="customer" className="text-xs">Customer</Label>
                    <Input
                      id="customer"
                      value={formData.customer}
                      onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                      className="mt-0.5 h-7 text-xs"
                      placeholder="Customer name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="journal" className="text-xs flex items-center gap-1">
                      <BookOpen className="h-2.5 w-2.5" />
                      <span>Journal</span>
                    </Label>
                    <Input
                      id="journal"
                      value={formData.journal}
                      onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                      className="mt-0.5 h-7 text-xs"
                      placeholder="Journal"
                    />
                  </div>
                  <div>
                    <Label htmlFor="paymentReference" className="text-xs">Payment Reference</Label>
                    <Input
                      id="paymentReference"
                      value={formData.paymentReference}
                      onChange={(e) => setFormData({ ...formData, paymentReference: e.target.value })}
                      className="mt-0.5 h-7 text-xs"
                      placeholder="Reference"
                    />
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-muted/20 rounded p-3 border border-border/50">
                <div className="flex items-center gap-1.5 mb-2">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">DATES</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="invoiceDate" className="text-xs">Invoice Date</Label>
                    <Input
                      id="invoiceDate"
                      type="date"
                      value={formData.invoiceDate}
                      onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
                      className="mt-0.5 h-7 text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dueDate" className="text-xs">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="mt-0.5 h-7 text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountingDate" className="text-xs">Accounting Date</Label>
                    <Input
                      id="accountingDate"
                      type="date"
                      value={formData.accountingDate}
                      onChange={(e) => setFormData({ ...formData, accountingDate: e.target.value })}
                      className="mt-0.5 h-7 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="bg-muted/20 rounded p-3 border border-border/50">
                <div className="flex items-center gap-1.5 mb-2">
                  <DollarSign className="h-3.5 w-3.5 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">AMOUNTS</h3>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
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
                      <Label className="text-xs">Untaxed</Label>
                      <div className="mt-0.5 h-7 text-xs flex items-center px-2 bg-muted/30 rounded border border-border">
                        ${totals.untaxed.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Taxes</Label>
                      <div className="mt-0.5 h-7 text-xs flex items-center px-2 bg-muted/30 rounded border border-border">
                        ${totals.tax.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold">Total</Label>
                      <div className="mt-0.5 h-7 text-xs font-bold flex items-center px-2 bg-primary/10 rounded border border-primary/20 text-primary">
                        ${totals.total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="invoice-lines" className="mt-6">
              <TabsList className="mb-3">
                <TabsTrigger value="invoice-lines">Invoice Lines</TabsTrigger>
                <TabsTrigger value="journal-items">Journal Items</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
              </TabsList>

              <TabsContent value="invoice-lines">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold">Invoice Lines</h2>
                  <div className="flex gap-2">
                    <Button onClick={handleAddLine} size="sm" className="gap-1 h-8 text-xs">
                      <Plus className="h-3 w-3" />
                      Add Line
                    </Button>
                    <Button onClick={handleAddCustomColumn} variant="outline" size="sm" className="gap-1 h-8 text-xs">
                      <Plus className="h-3 w-3" />
                      Add Custom Column
                    </Button>
                    <Button
                      onClick={() => toast({
                        title: "Exporting to Excel",
                        description: "Invoice lines are being exported."
                      })}
                      variant="outline"
                      size="sm"
                      className="gap-1 h-8 text-xs"
                    >
                      <Download className="h-3 w-3" />
                      Export to Excel
                    </Button>
                  </div>
                </div>

                <div className="border border-border overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30">Product</th>
                        <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30">Account</th>
                        <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-16">Qty</th>
                        <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-24">Unit Price</th>
                        <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-16">Taxes</th>
                        <th className="text-left px-1.5 py-1 text-[10px] font-semibold text-foreground border border-border bg-muted/30 w-16">Discount %</th>
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
                      {invoiceLines.map((line) => (
                        <InvoiceLineRow
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

                {/* Totals Section */}
                <div className="flex justify-end mt-4">
                  <div className="w-64 space-y-1 text-sm">
                    <div className="flex justify-between py-1 border-b border-border">
                      <span className="text-muted-foreground">Untaxed Amount:</span>
                      <span className="font-medium">${totals.untaxed.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border">
                      <span className="text-muted-foreground">Taxes:</span>
                      <span className="font-medium">${totals.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 font-bold text-primary">
                      <span>Total:</span>
                      <span>${totals.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="journal-items">
                <div className="bg-muted/10 rounded p-8 border border-border text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Journal Items - Accounting entries will appear here after posting</p>
                </div>
              </TabsContent>

              <TabsContent value="documents">
                <DocumentsTab orderId={formData.invoiceNumber} />
              </TabsContent>

              <TabsContent value="payments">
                <div className="bg-muted/10 rounded p-8 border border-border text-center">
                  <CreditCard className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Payment records will appear here</p>
                  <Button onClick={handleRegisterPayment} size="sm" className="mt-4 gap-1.5">
                    <Plus className="h-3.5 w-3.5" />
                    Register Payment
                  </Button>
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
    </div>
  );
};

export default Invoice;
