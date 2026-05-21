import { useParams, useNavigate } from "react-router-dom";
import OwnerLayout from "./components/OwnerLayout";
import { orders } from "./data/dummyData";
import { ArrowLeft, Package, MapPin, Mail, Copy } from "lucide-react";

export default function OwnerOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = orders.find(o => o.id === Number(id));

  if (!order) return (
    <OwnerLayout>
      <p className="text-gray-500">Order not found.</p>
    </OwnerLayout>
  );

  const subtotal = Math.round(order.amount * 0.78);
  const platformFee = order.amount - subtotal;

  return (
    <OwnerLayout>
      <button onClick={() => navigate("/owner-access/orders")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 text-sm">
        <ArrowLeft size={16} /> Back to Orders
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-1">Order Details</h1>
      <p className="text-sm text-gray-400 mb-6">Viewing information for Order #{order.id}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main card */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package size={22} className="text-blue-600" />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase
                ${order.status === "Completed" ? "bg-teal-100 text-teal-700" :
                  order.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-600"}`}>
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-5">
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Service Ordered</p>
                <p className="text-xl font-bold text-gray-800">{order.service}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Days Booked</p>
                <p className="text-xl font-bold text-gray-800">{order.days} days</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Remaining Days</p>
                <p className="text-xl font-bold text-gray-800">{order.days}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Amount Paid</p>
                <p className="text-2xl font-bold text-blue-600">₹ {order.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Order Date</p>
                <p className="font-semibold text-gray-700">{new Date(order.date).toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" })}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Last Scan</p>
                <p className="font-semibold text-gray-500">Not scanned yet</p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-blue-500">💳</span> Payment Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Platform Fee</span><span>₹{platformFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-800">
                <span>Total Amount</span>
                <span className="text-blue-600">₹{order.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-gray-400">👤</span> Customer Info
            </h3>
            <p className="font-bold text-gray-800">{order.customer}</p>
            <p className="text-xs text-gray-400 mb-3">Customer Since 2024</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={14} className="text-gray-400" />
              <span>{order.city}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-1">Need help?</h3>
            <p className="text-xs text-gray-400 mb-4">If you're facing any issues with this order, feel free to contact our support team.</p>
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 mb-2">
              <Mail size={14} /> Email Support
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-600 rounded-lg py-2 text-sm hover:bg-gray-50">
              <Copy size={14} /> Copy Email Address
            </button>
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
