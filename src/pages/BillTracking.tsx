import { useState } from "react";
import { FileText, CheckCircle, AlertCircle, Clock, Package, Box, RefreshCw, Grid3X3, List, User, CreditCard, Truck, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

// Mock data for demonstration
const mockBills = [
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
  const [hideFullyPaid, setHideFullyPaid] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredBills = hideFullyPaid 
    ? mockBills.filter(bill => bill.status !== "paid")
    : mockBills;

  // Calculate summary statistics
  const totalBills = filteredBills.reduce((sum, bill) => sum + bill.totalAmount, 0);
  const totalPaid = filteredBills.reduce((sum, bill) => sum + bill.paidAmount, 0);
  const totalOutstanding = totalBills - totalPaid;
  const delayedBills = filteredBills.filter(bill => bill.status === "not_paid").length;
  const totalCTN = filteredBills.reduce((sum, bill) => sum + bill.totalCTN, 0);
  const shippedCTN = filteredBills.reduce((sum, bill) => sum + bill.shippedCTN, 0);
  const totalCBM = filteredBills.reduce((sum, bill) => sum + bill.cbm, 0);
  const uniqueCustomers = new Set(filteredBills.map(bill => bill.customerName)).size;
  const paidPercentage = totalBills > 0 ? Math.round((totalPaid / totalBills) * 100) : 0;
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
            <div className="text-2xl font-bold">${totalBills.toLocaleString()}</div>
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
            <Card key={bill.id} className="hover:shadow-md transition-shadow">
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
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BillTracking;
