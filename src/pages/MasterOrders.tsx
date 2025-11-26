import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const MasterOrders = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Master Orders</h1>
            <p className="text-muted-foreground">View and manage all master orders</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Order
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Master Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link to="/master-order/40">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div>
                    <h3 className="font-semibold">MO25-0040</h3>
                    <p className="text-sm text-muted-foreground">Project: ppr t</p>
                    <p className="text-sm text-muted-foreground">Client: Hammed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Expected Delivery</p>
                    <p className="text-sm text-muted-foreground">2025/11/27</p>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MasterOrders;
