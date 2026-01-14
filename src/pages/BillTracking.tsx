import { useState } from "react";
import { FileText, CheckCircle, AlertCircle, Clock, Package, Box, RefreshCw, Grid3X3, List, User, CreditCard, Truck, Layers, X, DollarSign, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Bill {
  id: number;
  customerName: string;
  totalAmount: number;
  paidAmount: number;
  status: string;
  totalCTN: number;
  shippedCTN: number;
  cbm: number;
  sent: number;
  remain: number;
}

// Mock data for demonstration
const initialBills: Bill[] = [
  {
    id: 1,
    customerName: "Hussein",
    totalAmount: 101000,
    paidAmount: 0,
    status: "not_paid",
    totalCTN: 0,
    shippedCTN: 0,
    cbm: 0.0,
    sent: 0,
    remain: 0,
  },
  {
    id: 2,
    customerName: "Ahmed",
    totalAmount: 50000,
    paidAmount: 25000,
    status: "partial",
    totalCTN: 10,
    shippedCTN: 5,
    cbm: 2.5,
    sent: 5,
    remain: 5,
  },
  {
    id: 3,
    customerName: "Sara",
    totalAmount: 75000,
    paidAmount: 75000,
    status: "paid",
    totalCTN: 20,
    shippedCTN: 20,
    cbm: 5.0,
    sent: 20,
    remain: 0,
  },
];

const BillTracking = () => {
  const [bills, setBills] = useState<Bill[]>(initialBills);
  const [hideFullyPaid, setHideFullyPaid] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const { toast } = useToast();

  const filteredBills = hideFullyPaid 
    ? bills.filter(bill => bill.status !== "paid")
    : bills;

  // Calculate summary statistics
  const totalBillsAmount = filteredBills.reduce((sum, bill) => sum + bill.totalAmount, 0);
  const totalPaid = filteredBills.reduce((sum, bill) => sum + bill.paidAmount, 0);
  const totalOutstanding = totalBillsAmount - totalPaid;
  const delayedBills = filteredBills.filter(bill => bill.status === "not_paid").length;
  const totalCTN = filteredBills.reduce((sum, bill) => sum + bill.totalCTN, 0);
  const shippedCTN = filteredBills.reduce((sum, bill) => sum + bill.shippedCTN, 0);
  const totalCBM = filteredBills.reduce((sum, bill) => sum + bill.cbm, 0);
  const uniqueCustomers = new Set(filteredBills.map(bill => bill.customerName)).size;
  const paidPercentage = totalBillsAmount > 0 ? Math.round((totalPaid / totalBillsAmount) * 100) : 0;
  const shippedPercentage = totalCTN > 0 ? Math.round((shippedCTN / totalCTN) * 100) : 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <span className="flex items-center gap-1 text-green-600"><span className="w-2 h-2 rounded-full bg-green-500"></span> Paid</span>;
      case "partial":
        return <span className="flex items-center gap-1 text-yellow-600"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Partial</span>;
      default:
        return <span className="flex items-center gap-1 text-red-600"><span className="w-2 h-2 rounded-full bg-red-500"></span> Not Paid</span>;
    }
  };

  const handlePayment = () => {
    if (!selectedBill || !paymentAmount) return;
    
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({ title: "Invalid amount", description: "Please enter a valid payment amount", variant: "destructive" });
      return;
    }

    const outstanding = selectedBill.totalAmount - selectedBill.paidAmount;
    if (amount > outstanding) {
      toast({ title: "Amount too high", description: `Maximum payment is $${outstanding.toLocaleString()}`, variant: "destructive" });
      return;
    }

    setBills(prev => prev.map(bill => {
      if (bill.id === selectedBill.id) {
        const newPaidAmount = bill.paidAmount + amount;
        const newStatus = newPaidAmount >= bill.totalAmount ? "paid" : newPaidAmount > 0 ? "partial" : "not_paid";
        return { ...bill, paidAmount: newPaidAmount, status: newStatus };
      }
      return bill;
    }));

    toast({ title: "Payment recorded", description: `$${amount.toLocaleString()} payment for ${selectedBill.customerName}` });
    setPaymentAmount("");
    setSelectedBill(null);
  };

  const handlePayFullAmount = () => {
    if (!selectedBill) return;
    const outstanding = selectedBill.totalAmount - selectedBill.paidAmount;
    setPaymentAmount(outstanding.toString());
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Bill Tracking</h1>
            <p className="text-muted-foreground">Customer bill tracking and financial control</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Checkbox 
              id="hideFullyPaid" 
              checked={hideFullyPaid}
              onCheckedChange={(checked) => setHideFullyPaid(checked as boolean)}
            />
            <label htmlFor="hideFullyPaid" className="text-sm cursor-pointer">Hide Fully Paid</label>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <div className="flex border rounded-md">
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"} 
              size="icon" 
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"} 
              size="icon" 
              className="rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-blue-100">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold">${totalBillsAmount.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="text-xs text-muted-foreground mt-1">
              {filteredBills.length} bills from {uniqueCustomers} customers
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold">${totalPaid.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Paid</div>
            <div className="text-xs text-muted-foreground mt-1">{paidPercentage}% of total</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-red-100">
                <AlertCircle className="h-4 w-4 text-red-600" />
              </div>
            </div>
            <div className="text-2xl font-bold">${totalOutstanding.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Outstanding</div>
            <div className="text-xs text-muted-foreground mt-1">{filteredBills.filter(b => b.status !== "paid").length} bills not paid</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-yellow-100">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl font-bold">{delayedBills}</div>
            <div className="text-xs text-muted-foreground">Delayed Bills past committed date</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-purple-100">
                <Package className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold">{shippedCTN}</div>
            <div className="text-xs text-muted-foreground">Total CTN</div>
            <div className="text-xs text-muted-foreground mt-1">{shippedPercentage}% shipped ({totalCTN - shippedCTN} remain)</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-cyan-100">
                <Box className="h-4 w-4 text-cyan-600" />
              </div>
            </div>
            <div className="text-2xl font-bold">{totalCBM.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Total CBM</div>
            <div className="text-xs text-muted-foreground mt-1">Cubic meters</div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Bills */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
        {filteredBills.map((bill) => {
          const paymentPercentage = bill.totalAmount > 0 ? Math.round((bill.paidAmount / bill.totalAmount) * 100) : 0;
          const ctnPercentage = bill.totalCTN > 0 ? Math.round((bill.shippedCTN / bill.totalCTN) * 100) : 0;
          const outstanding = bill.totalAmount - bill.paidAmount;

          return (
            <Card 
              key={bill.id} 
              className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary"
              onClick={() => setSelectedBill(bill)}
            >
              <CardContent className="p-4 space-y-4">
                {/* Customer Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">{bill.customerName}</span>
                  </div>
                  {getStatusBadge(bill.status)}
                </div>

                {/* Outstanding Amount */}
                <div>
                  <div className="text-3xl font-bold text-destructive">${outstanding.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Outstanding</div>
                </div>

                {/* Payment Progress */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    <span>Payment</span>
                  </div>
                  <Progress value={paymentPercentage} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>${bill.paidAmount.toLocaleString()} paid</span>
                    <span>{paymentPercentage}%</span>
                  </div>
                </div>

                {/* Shipped CTN Progress */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>Shipped CTN</span>
                  </div>
                  <Progress value={ctnPercentage} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>{bill.shippedCTN} / {bill.totalCTN} CTN</span>
                    <span className={ctnPercentage < 50 ? "text-destructive" : ""}>{ctnPercentage}%</span>
                  </div>
                </div>

                {/* Stats Footer */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t text-sm">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <span>CBM: {bill.cbm.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span>CTN: {bill.totalCTN}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span>Sent: {bill.sent}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Box className="h-4 w-4 text-primary" />
                    <span className="text-primary">Remain: {bill.remain}</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBill(bill);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    disabled={bill.status === "paid"}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBill(bill);
                    }}
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    Pay
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bill Detail Modal */}
      <Dialog open={!!selectedBill} onOpenChange={(open) => !open && setSelectedBill(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {selectedBill?.customerName} - Bill Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedBill && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                {getStatusBadge(selectedBill.status)}
              </div>

              <Separator />

              {/* Financial Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Total Amount</div>
                  <div className="text-xl font-bold">${selectedBill.totalAmount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Paid Amount</div>
                  <div className="text-xl font-bold text-green-600">${selectedBill.paidAmount.toLocaleString()}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-muted-foreground">Outstanding</div>
                  <div className="text-2xl font-bold text-destructive">
                    ${(selectedBill.totalAmount - selectedBill.paidAmount).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Payment Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Payment Progress</span>
                  <span>{Math.round((selectedBill.paidAmount / selectedBill.totalAmount) * 100)}%</span>
                </div>
                <Progress value={(selectedBill.paidAmount / selectedBill.totalAmount) * 100} className="h-3" />
              </div>

              <Separator />

              {/* Shipping Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span>Total CTN: {selectedBill.totalCTN}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span>Shipped: {selectedBill.shippedCTN}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <span>CBM: {selectedBill.cbm.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Box className="h-4 w-4 text-primary" />
                  <span className="text-primary">Remain: {selectedBill.remain}</span>
                </div>
              </div>

              {selectedBill.status !== "paid" && (
                <>
                  <Separator />

                  {/* Direct Payment */}
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Record Payment
                    </h4>
                    <div className="space-y-2">
                      <Label htmlFor="paymentAmount">Payment Amount</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="paymentAmount"
                          type="number"
                          placeholder="Enter amount"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          className="flex-1"
                        />
                        <Button variant="outline" onClick={handlePayFullAmount}>
                          Pay Full
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Outstanding: ${(selectedBill.totalAmount - selectedBill.paidAmount).toLocaleString()}
                      </p>
                    </div>
                    <Button className="w-full" onClick={handlePayment} disabled={!paymentAmount}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Record Payment
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BillTracking;
