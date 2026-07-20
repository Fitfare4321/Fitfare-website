import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerLayout from "./components/OwnerLayout";
import { orders } from "./data/dummyData";

const statusColor: Record<string, string> = {
  Completed: "bg-teal-100 text-teal-700",
  Pending:   "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-600",
};

export default function OwnerOrders() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest First");
  const [filter, setFilter] = useState("All");

  const filtered = orders
    .filter(o => filter === "All" || o.status === filter)
    .filter(o => o.service.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === "Newest First"
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <OwnerLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-5">Order Lists</h1>

      <div className="flex flex-wrap gap-3 mb-5">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search service or customer..."
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 outline-none focus:border-blue-400" />
        <input type="date" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none" />
        <select value={sort} onChange={e => setSort(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
          <option>Newest First</option>
          <option>Oldest First</option>
        </select>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
          <option>All</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["#","Service","Customer","Date","Amount","Status"].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, i) => (
              <tr key={order.id} onClick={() => navigate(`/owner-access/orders/${order.id}`)}
                className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition">
                <td className="px-5 py-3 text-gray-500">{i + 1}</td>
                <td className="px-5 py-3 font-medium text-gray-800">{order.service}</td>
                <td className="px-5 py-3 text-gray-600">{order.customer}</td>
                <td className="px-5 py-3 text-gray-500">{new Date(order.date).toLocaleDateString("en-IN")}</td>
                <td className="px-5 py-3 text-gray-700">₹{order.amount.toFixed(2)}</td>
                <td className="px-5 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </OwnerLayout>
  );
}
