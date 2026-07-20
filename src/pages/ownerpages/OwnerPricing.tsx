import { useState } from "react";
import OwnerLayout from "./components/OwnerLayout";
import { X } from "lucide-react";

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const events = [
  { date: "2026-05-21", label: "Zumba",             color: "bg-green-200 text-green-800",  morning: 100, afternoon: 70 },
  { date: "2026-05-14", label: "Yoga",               color: "bg-blue-200 text-blue-800",    morning: 90,  afternoon: 80 },
  { date: "2026-05-07", label: "CrossFit",           color: "bg-orange-200 text-orange-800",morning: 150, afternoon: 130 },
  { date: "2026-05-28", label: "Strength Training",  color: "bg-purple-200 text-purple-800",morning: 140, afternoon: 120 },
  { date: "2026-05-10", label: "Pilates",            color: "bg-pink-200 text-pink-800",    morning: 100, afternoon: 90 },
  { date: "2026-05-17", label: "Swimming",           color: "bg-cyan-200 text-cyan-800",    morning: 120, afternoon: 100 },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function OwnerPricing() {
  const today = new Date();
  const [year] = useState(today.getFullYear());
  const [month] = useState(today.getMonth());
  const [popup, setPopup] = useState<typeof events[0] | null>(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1);

  const getEvent = (day: number | null) => {
    if (!day) return null;
    const dateStr = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    return events.find(e => e.date === dateStr) || null;
  };

  return (
    <OwnerLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pricing Calendar</h1>
        <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white">
          {MONTHS.map(m => <option key={m}>{m}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map(d => (
            <div key={d} className="text-center text-xs font-semibold text-gray-400 py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-lg overflow-hidden">
          {cells.map((day, i) => {
            const event = getEvent(day);
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            return (
              <div key={i} className="bg-white min-h-[80px] p-1.5 relative">
                {day && (
                  <>
                    <span className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full
                      ${isToday ? "bg-blue-600 text-white" : "text-gray-600"}`}>
                      {day}
                    </span>
                    {event && (
                      <button
                        onClick={(e) => {
                          const rect = (e.target as HTMLElement).getBoundingClientRect();
                          setPopupPos({ x: rect.left, y: rect.bottom + 8 });
                          setPopup(event);
                        }}
                        className={`mt-1 w-full text-left text-xs px-1.5 py-0.5 rounded truncate ${event.color}`}>
                        {event.label}
                      </button>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Popup */}
      {popup && (
        <div className="fixed z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-56"
          style={{ top: Math.min(popupPos.y, window.innerHeight - 200), left: Math.min(popupPos.x, window.innerWidth - 240) }}>
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-gray-800">{popup.label}</p>
            <button onClick={() => setPopup(null)}><X size={14} className="text-gray-400" /></button>
          </div>
          <p className="text-xs text-gray-400 mb-3">{popup.date} → {popup.date}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Morning</span>
              <span className="font-semibold text-gray-800">₹{popup.morning}.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Afternoon</span>
              <span className="font-semibold text-gray-800">₹{popup.afternoon}.00</span>
            </div>
          </div>
        </div>
      )}
    </OwnerLayout>
  );
}
