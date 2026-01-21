import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Dashboard from "./pages/Dashboard";
import MasterOrders from "./pages/MasterOrders";
import MasterOrder from "./pages/MasterOrder";
import BillTracking from "./pages/BillTracking";
import Invoices from "./pages/Invoices";
import Invoice from "./pages/Invoice";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <div className="flex-1 flex flex-col">
                <header className="h-12 border-b bg-card flex items-center justify-between px-4">
                  <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <ThemeSwitcher />
                  </div>
                </header>
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/master-orders" element={<MasterOrders />} />
                    <Route path="/master-order/:id" element={<MasterOrder />} />
                    <Route path="/bill-tracking" element={<BillTracking />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/invoice/:id" element={<Invoice />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
