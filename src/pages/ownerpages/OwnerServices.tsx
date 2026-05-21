import { useState } from "react";
import OwnerLayout from "./components/OwnerLayout";
import { services as initialServices } from "./data/dummyData";
import { Plus, Pencil, Trash2, DollarSign } from "lucide-react";

export default function OwnerServices() {
  const [services, setServices] = useState(initialServices);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const handleEdit = (id: number, name: string, price: number) => {
    setEditId(id); setEditName(name); setEditPrice(String(price));
  };

  const handleSave = () => {
    setServices(services.map(s => s.id === editId ? { ...s, name: editName, price: Number(editPrice) } : s));
    setEditId(null);
  };

  return (
    <OwnerLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Services Management</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
          <Plus size={16} /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {services.map((svc) => (
          <div key={svc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <img src={svc.image} alt={svc.name} className="w-full h-44 object-cover" />
            <div className="p-4">
              {editId === svc.id ? (
                <div className="space-y-2 mb-3">
                  <input value={editName} onChange={e => setEditName(e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 text-sm" />
                  <input value={editPrice} onChange={e => setEditPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 text-sm" type="number" />
                  <button onClick={handleSave} className="w-full bg-green-500 text-white rounded py-1 text-sm">Save</button>
                </div>
              ) : (
                <>
                  <p className="font-semibold text-gray-800">{svc.name}</p>
                  <p className="text-xs text-gray-400 mb-1">{svc.category}</p>
                  <p className="text-blue-600 font-bold mb-3">₹{svc.price}.00</p>
                </>
              )}
              <div className="flex gap-2 mb-2">
                <button onClick={() => handleEdit(svc.id, svc.name, svc.price)}
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white rounded-lg py-1.5 text-xs font-medium hover:bg-blue-700">
                  <Pencil size={12} /> Edit Service
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white rounded-lg py-1.5 text-xs font-medium hover:bg-green-600">
                  <DollarSign size={12} /> Set Pricing
                </button>
              </div>
              <button onClick={() => setServices(services.filter(s => s.id !== svc.id))}
                className="w-full flex items-center justify-center gap-1 border border-red-200 text-red-500 rounded-lg py-1.5 text-xs font-medium hover:bg-red-50">
                <Trash2 size={12} /> Delete Service
              </button>
            </div>
          </div>
        ))}
      </div>
    </OwnerLayout>
  );
}
