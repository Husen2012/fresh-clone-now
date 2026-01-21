import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, FileText, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InvoiceListItem {
  id: string;
  invoiceNumber: string;
  customer: string;
  invoiceDate: string;
  dueDate: string;
  total: number;
  status: 'draft' | 'posted' | 'paid';
}

const Invoices = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const [invoices] = useState<InvoiceListItem[]>([
    {
      id: '1',
      invoiceNumber: 'INV/2025/00001',
      customer: 'Hammed',
      invoiceDate: '2025-01-21',
      dueDate: '2025-02-20',
      total: 1150,
      status: 'draft',
    },
    {
      id: '2',
      invoiceNumber: 'INV/2025/00002',
      customer: 'Ahmed Corp',
      invoiceDate: '2025-01-20',
      dueDate: '2025-02-19',
      total: 5500,
      status: 'posted',
    },
    {
      id: '3',
      invoiceNumber: 'INV/2025/00003',
      customer: 'Tech Solutions',
      invoiceDate: '2025-01-15',
      dueDate: '2025-02-14',
      total: 3200,
      status: 'paid',
    },
  ]);

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary" className="bg-muted text-muted-foreground">Draft</Badge>;
      case 'posted':
        return <Badge variant="default" className="bg-blue-500">Posted</Badge>;
      case 'paid':
        return <Badge variant="default" className="bg-green-500">Paid</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
            <p className="text-sm text-muted-foreground">Manage customer invoices</p>
          </div>
          <Button 
            onClick={() => toast({ title: "Create Invoice", description: "New invoice form would open here." })}
            className="gap-1.5"
          >
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filteredInvoices.map((invoice) => (
            <Card key={invoice.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{invoice.invoiceNumber}</h3>
                      <p className="text-sm text-muted-foreground">{invoice.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Invoice Date</p>
                      <p className="font-medium">{invoice.invoiceDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="font-medium">{invoice.dueDate}</p>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-bold text-primary">${invoice.total.toFixed(2)}</p>
                    </div>
                    <div className="min-w-[80px]">
                      {getStatusBadge(invoice.status)}
                    </div>
                    <Link to={`/invoice/${invoice.id}`}>
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">No invoices found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;
