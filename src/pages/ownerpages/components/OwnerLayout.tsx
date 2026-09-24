import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Settings, Inbox, ShoppingCart, CreditCard,
  Tag, Users, Star, User, Image, LogOut, Menu, X, Search
} from "lucide-react";

const navItems = [
  { label: "Dashboard",   icon: LayoutDashboard, path: "/owner-access" },
  { label: "Services",    icon: Settings,         path: "/owner-access/services" },
  { label: "Inbox",       icon: Inbox,            path: "/owner-access/inbox" },
  { label: "Order Lists", icon: ShoppingCart,     path: "/owner-access/orders" },
  { label: "Billings",    icon: CreditCard,       path: "/owner-access/billings" },
];

const pageItems = [
  { label: "Pricing",  icon: Tag,   path: "/owner-access/pricing" },
  { label: "Team",     icon: Users, path: "/owner-access/team" },
  { label: "Reviews",  icon: Star,  path: "/owner-access/reviews" },
  { label: "Profile",  icon: User,  path: "/owner-access/profile" },
  { label: "Gallery",  icon: Image, path: "/owner-access/gallery" },
];

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-56" : "w-0 overflow-hidden"} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col`}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-gray-100">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="font-bold text-blue-600 text-lg">FitFare</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive(item.path) ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}

          <p className="text-xs text-gray-400 uppercase tracking-wider px-3 pt-4 pb-1">Pages</p>
          {pageItems.map((item) => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive(item.path) ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 pb-4">
          <button onClick={() => navigate("/")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 w-full transition-colors">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-64">
              <Search size={14} className="text-gray-400" />
              <input placeholder="Search" className="bg-transparent text-sm outline-none w-full text-gray-600" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">R</div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">Rohit</p>
              <p className="text-xs text-gray-400">Owner</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
