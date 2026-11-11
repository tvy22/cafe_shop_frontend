import { useState } from "react";
import { NavLink, useLocation } from "react-router"; 
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Coffee, 
  CupSoda,
  FolderTree, 
  Users, 
  BarChart3, 
  LogOut, 
  Bell, 
  Menu as MenuIcon, 
  X 
} from "lucide-react";

export default function DashboardLayout({ title, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Live Orders", icon: Coffee, path: "/dashboard/live-orders"},
    { name: "Order History", icon: ShoppingBag, path: "/dashboard/orders" },
    { name: "Menu", icon: CupSoda, path: "/dashboard/menu" },
    { name: "Categories", icon: FolderTree, path: "/dashboard/categories" },
    { name: "Staff", icon: Users, path: "/dashboard/staff" },
    { name: "Reports", icon: BarChart3, path: "/dashboard/reports" },
  ];

  const currentNavItem = navItems.find((item) =>
    item.path === "/dashboard"
      ? location.pathname === "/dashboard"
      : location.pathname.startsWith(item.path)
  );

  const headerTitle = title || currentNavItem?.name || "Dashboard Overview";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-coffee/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Fixed / Non-scrollable viewport fit) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between border-r border-cream/80 bg-white p-6 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Logo & Close Button (Mobile) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-matcha text-body font-bold text-coffee shadow-xs">
                R
              </div>
              <span className="text-h3 font-bold text-coffee">RUPP Cafe</span>
            </div>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="text-coffee/60 hover:text-coffee lg:hidden cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => {
                    const isSubRouteActive =
                      item.path !== "/dashboard" &&
                      location.pathname.startsWith(item.path);

                    const active = isActive || isSubRouteActive;

                    return `flex items-center gap-3 rounded-2xl px-4 py-3 text-body font-semibold transition-all cursor-pointer ${
                      active
                        ? "bg-matcha text-coffee shadow-xs"
                        : "text-coffee/70 hover:bg-cream/40 hover:text-coffee"
                    }`;
                  }}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Left Logout Action */}
        <div className="border-t border-cream/80 pt-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-2xl bg-cream/30 px-4 py-3 text-body font-semibold text-coffee hover:bg-caramel/10 hover:text-caramel transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Container Right Column */}
      <div className="flex flex-1 flex-col overflow-hidden bg-milk">
        {/* Topbar (Sticky header) */}
        <header className="flex h-20 items-center justify-between border-b border-cream/80 bg-white px-6 lg:px-10">
          {/* Title & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-xl border border-cream/80 p-2 text-coffee lg:hidden cursor-pointer hover:bg-cream/30"
            >
              <MenuIcon size={20} />
            </button>
            <h1 className="text-h3 lg:text-h2 font-bold text-coffee">{headerTitle}</h1>
          </div>

          {/* Right Header Controls: Notification + User Profile */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative shrink-0">
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-full border border-cream/80 bg-white text-coffee/80 transition-colors hover:bg-cream/30 cursor-pointer"
              >
                <Bell size={18} />
              </button>
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-matcha text-xs font-bold text-coffee shadow-xs">
                4
              </span>
            </div>

            <div className="h-8 w-[1px] bg-cream/80 shrink-0" />

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <p className="text-body font-bold text-coffee leading-tight">Rithy Chan</p>
                <p className="text-meta font-medium text-caramel">Super Admin</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Rithy Chan Profile"
                className="size-10 rounded-full object-cover border border-cream/80 shrink-0"
              />
            </div>
          </div>
        </header>

        {/* Content View Container */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}