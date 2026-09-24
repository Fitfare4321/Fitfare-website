import { useState } from "react";
import OwnerLayout from "./components/OwnerLayout";
import { emails } from "./data/dummyData";
import { Star, Trash2, RefreshCw, Download, Inbox, Send, FileText, AlertCircle, Archive, Plus } from "lucide-react";

const folders = [
  { label: "Inbox",   icon: Inbox,        key: "inbox" },
  { label: "Starred", icon: Star,         key: "starred" },
  { label: "Sent",    icon: Send,         key: "sent" },
  { label: "Draft",   icon: FileText,     key: "draft" },
  { label: "Spam",    icon: AlertCircle,  key: "spam" },
  { label: "Bin",     icon: Archive,      key: "bin" },
];

const labels = ["Primary", "Social"];

export default function OwnerInbox() {
  const [selected, setSelected] = useState<number | null>(null);
  const [folder, setFolder] = useState("inbox");
  const [label, setLabel] = useState("Primary");
  const [mailList, setMailList] = useState(emails);

  const filtered = mailList.filter(e => label === "Primary" ? e.label === "Primary" : e.label === label);
  const selectedMail = mailList.find(e => e.id === selected);

  const toggleStar = (id: number) => {
    setMailList(mailList.map(e => e.id === id ? { ...e, starred: !e.starred } : e));
  };

  return (
    <OwnerLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-5">Inbox</h1>
      <div className="flex gap-4 h-[calc(100vh-180px)]">
        {/* Left panel */}
        <div className="w-52 bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex flex-col gap-1 shrink-0">
          <button className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-3 py-2 text-sm font-medium mb-2 hover:bg-blue-700">
            <Plus size={14} /> Compose
          </button>
          <p className="text-xs text-gray-400 uppercase tracking-wider px-2 py-1">My Email</p>
          {folders.map(f => (
            <button key={f.key} onClick={() => setFolder(f.key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${folder === f.key ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
              <f.icon size={14} /> {f.label}
            </button>
          ))}
          <p className="text-xs text-gray-400 uppercase tracking-wider px-2 py-1 mt-2">Label</p>
          {labels.map(l => (
            <button key={l} onClick={() => setLabel(l)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${label === l ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
              <span className={`w-2 h-2 rounded-full ${l === "Primary" ? "bg-green-400" : "bg-blue-400"}`} />
              {l}
            </button>
          ))}
        </div>

        {/* Email list */}
        <div className="w-72 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col shrink-0">
          <div className="p-3 border-b border-gray-100 flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5">
              <span className="text-gray-400 text-xs">🔍</span>
              <input placeholder="Search mail" className="bg-transparent text-xs outline-none w-full" />
            </div>
            <button className="text-gray-400 hover:text-gray-600"><Download size={14} /></button>
            <button className="text-gray-400 hover:text-gray-600"><RefreshCw size={14} /></button>
            <button className="text-gray-400 hover:text-gray-600"><Trash2 size={14} /></button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(mail => (
              <div key={mail.id} onClick={() => setSelected(mail.id)}
                className={`px-4 py-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition ${selected === mail.id ? "bg-blue-50" : ""} ${!mail.read ? "font-semibold" : ""}`}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm text-gray-800 truncate">{mail.from}</span>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">{mail.time}</span>
                </div>
                <p className="text-xs text-gray-600 truncate">{mail.subject}</p>
                <p className="text-xs text-gray-400 truncate">{mail.preview}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Email detail */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-6 overflow-y-auto">
          {selectedMail ? (
            <>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{selectedMail.subject}</h2>
                  <p className="text-sm text-gray-500">From: <span className="text-gray-700">{selectedMail.from}</span></p>
                  <p className="text-xs text-gray-400">{selectedMail.date} · {selectedMail.time}</p>
                </div>
                <button onClick={() => toggleStar(selectedMail.id)}>
                  <Star size={18} className={selectedMail.starred ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                <p>{selectedMail.preview}</p>
                <p className="mt-3 text-gray-500">Thank you for reaching out to FitFare. Our team will get back to you within 24 hours. We appreciate your patience and look forward to assisting you.</p>
                <p className="mt-3 text-gray-500">Best regards,<br />FitFare Support Team</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Reply</button>
                <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">Forward</button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              Select an email to read
            </div>
          )}
        </div>
      </div>
    </OwnerLayout>
  );
}
