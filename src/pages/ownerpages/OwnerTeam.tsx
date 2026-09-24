import { useState } from "react";
import OwnerLayout from "./components/OwnerLayout";
import { teamMembers as initial } from "./data/dummyData";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

export default function OwnerTeam() {
  const [members, setMembers] = useState(initial);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const startEdit = (m: typeof initial[0]) => {
    setEditId(m.id); setEditName(m.name); setEditRole(m.role);
  };

  const saveEdit = () => {
    setMembers(members.map(m => m.id === editId ? { ...m, name: editName, role: editRole } : m));
    setEditId(null);
  };

  const addMember = () => {
    if (!newName || !newRole) return;
    const id = Math.max(...members.map(m => m.id)) + 1;
    setMembers([...members, {
      id, name: newName, role: newRole, email: newEmail || `${newName.toLowerCase().replace(" ",".")}@fitfare.com`,
      phone: "9876500000", joined: new Date().toISOString().split("T")[0],
      avatar: newName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2)
    }]);
    setNewName(""); setNewRole(""); setNewEmail(""); setShowAdd(false);
  };

  const colors = ["bg-blue-500","bg-purple-500","bg-green-500","bg-orange-500","bg-pink-500","bg-teal-500","bg-red-500","bg-indigo-500"];

  return (
    <OwnerLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Team</h1>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus size={16} /> Add New Member
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Add New Team Member</h3>
            <button onClick={() => setShowAdd(false)}><X size={16} className="text-gray-400" /></button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Full Name"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
            <input value={newRole} onChange={e => setNewRole(e.target.value)} placeholder="Role"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
            <input value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="Email (optional)"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
          </div>
          <button onClick={addMember} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            Add Member
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {members.map((m, i) => (
          <div key={m.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${colors[i % colors.length]}`}>
                {m.avatar}
              </div>
              <div className="flex-1 min-w-0">
                {editId === m.id ? (
                  <input value={editName} onChange={e => setEditName(e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-0.5 text-sm mb-1" />
                ) : (
                  <p className="font-semibold text-gray-800 truncate">{m.name}</p>
                )}
                {editId === m.id ? (
                  <input value={editRole} onChange={e => setEditRole(e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-0.5 text-xs" />
                ) : (
                  <p className="text-xs text-blue-600">{m.role}</p>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-1">{m.email}</p>
            <p className="text-xs text-gray-400 mb-3">📞 {m.phone}</p>
            <p className="text-xs text-gray-300">Joined: {m.joined}</p>
            <div className="flex gap-2 mt-3">
              {editId === m.id ? (
                <button onClick={saveEdit} className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white rounded-lg py-1.5 text-xs">
                  <Check size={12} /> Save
                </button>
              ) : (
                <button onClick={() => startEdit(m)} className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 rounded-lg py-1.5 text-xs hover:bg-blue-100">
                  <Pencil size={12} /> Edit
                </button>
              )}
              <button onClick={() => setMembers(members.filter(x => x.id !== m.id))}
                className="flex items-center justify-center gap-1 border border-red-100 text-red-400 rounded-lg px-3 py-1.5 text-xs hover:bg-red-50">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </OwnerLayout>
  );
}
