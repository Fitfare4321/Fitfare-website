import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { Users, ShoppingCart, TrendingUp, Clock } from "lucide-react";
import OwnerLayout from "./components/OwnerLayout";
import { users, orders, salesData } from "./data/dummyData";

const totalSales = orders.reduce((s, o) => s + o.amount, 0);
const totalPending = orders.filter((o) => o.status === "Pending").length;

const statCards = [
  { label: "Total Users",   value: users.length,   icon: Users,        color: "bg-purple-100 text-purple-600" },
  { label: "Total Orders",  value: orders.length,  icon: ShoppingCart, color: "bg-yellow-100 text-yellow-600" },
  { label: "Total Sales",   value: `₹${totalSales.toLocaleString()}`, icon: TrendingUp, color: "bg-green-100 text-green-600" },
  { label: "Total Pending", value: totalPending,   icon: Clock,        color: "bg-red-100 text-red-600" },
];

export default function OwnerDashboard() {
  const [month, setMonth] = useState("May");
  const navigate = useNavigate();

  return (
    <OwnerLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <select value={month} onChange={(e) => setMonth(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 bg-white">
          {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.color}`}>
              <card.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Sales Details Bar Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Sales Details</h2>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> Gross Sales</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Your Profit (60%)</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={salesData}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `₹${v}`} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
            <Bar dataKey="grossSales" fill="#3b82f6" radius={[4,4,0,0]} name="Gross Sales" />
            <Bar dataKey="profit"     fill="#22c55e" radius={[4,4,0,0]} name="Your Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Line Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={salesData}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `₹${v}`} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
            <Legend />
            <Line type="monotone" dataKey="grossSales" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} name="Sales" />
            <Line type="monotone" dataKey="profit"     stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} name="Profit" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Customers */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
          onClick={() => navigate("/owner-access/orders")}>
          <h3 className="font-semibold text-gray-700 mb-3">Customers</h3>
          <div className="flex items-center justify-center py-4">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3"
                  strokeDasharray={`${(users.filter(u=>u.status==="Active").length/users.length)*100} 100`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-800">{users.filter(u=>u.status==="Active").length}</span>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500">Active Members</p>
        </div>

        {/* Featured Service */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
          onClick={() => navigate("/owner-access/services")}>
          <h3 className="font-semibold text-gray-700 mb-3">Featured Service</h3>
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80"
            alt="Strength Training" className="w-full h-28 object-cover rounded-lg mb-2" />
          <p className="font-medium text-gray-800">Strength Training</p>
          <p className="text-sm text-blue-600 font-semibold">₹140.00</p>
        </div>

        {/* Sales Analytics */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
          onClick={() => navigate("/owner-access/billings")}>
          <h3 className="font-semibold text-gray-700 mb-3">Sales Analytics</h3>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={salesData}>
              <Line type="monotone" dataKey="grossSales" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="profit"     stroke="#a855f7" strokeWidth={2} dot={{ r: 3 }} />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis hide />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </OwnerLayout>
  );
}
