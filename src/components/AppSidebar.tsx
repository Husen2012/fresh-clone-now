import { Home, FileText, Package, LayoutDashboard, Receipt } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Master Orders", url: "/master-orders", icon: FileText },
  { title: "Bill Tracking", url: "/bill-tracking", icon: Receipt },
  { title: "Products", url: "/products", icon: Package },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar className={open ? "w-56" : "w-14"} collapsible="icon">
      <SidebarContent className="flex h-full flex-col">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Theme switcher (always visible, even when sidebar is collapsed) */}
        <div className="mt-auto border-t border-sidebar-border p-2">
          <ThemeSwitcher compact={!open} />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

