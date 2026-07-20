import { useState } from "react";
import OwnerLayout from "./components/OwnerLayout";
import { User, Phone, Building2, MapPin, Link, Clock } from "lucide-react";

const defaultProfile = {
  fullName: "Rohit",
  phone: "8907465234",
  gymName: "Wonder Fitness",
  gymCity: "Pune",
  gymAddress: "Sector 30 Nigdi",
  mapsLink: "https://share.google/5vhnS7ili4Ayunder",
  latitude: "18.63991844",
  longitude: "73.76916589",
  openingTime: "07:00",
  closingTime: "23:00",
  status: "Open Now",
};

export default function OwnerProfile() {
  const [profile, setProfile] = useState(defaultProfile);
  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, value: string) => {
    setProfile(p => ({ ...p, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => setSaved(true);

  const fields = [
    { label: "Full Name",                key: "fullName",    icon: User,      half: true },
    { label: "Phone",                    key: "phone",       icon: Phone,     half: true },
    { label: "Gym Name",                 key: "gymName",     icon: Building2, half: true },
    { label: "Gym City",                 key: "gymCity",     icon: MapPin,    half: true, type: "select" },
    { label: "Gym Address",              key: "gymAddress",  icon: MapPin,    half: true },
    { label: "Google Maps Location Link",key: "mapsLink",    icon: Link,      half: true },
    { label: "Latitude",                 key: "latitude",    icon: MapPin,    half: true },
    { label: "Longitude",                key: "longitude",   icon: MapPin,    half: true },
    { label: "Opening Time",             key: "openingTime", icon: Clock,     half: true, type: "time" },
    { label: "Closing Time",             key: "closingTime", icon: Clock,     half: true, type: "time" },
  ];

  return (
    <OwnerLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gym Profile</h1>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-3">
              R
            </div>
            <span className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full" /> {profile.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {fields.map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-gray-600 mb-1">{f.label}</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 focus-within:border-blue-400 transition">
                  <f.icon size={14} className="text-gray-400 shrink-0" />
                  {f.type === "select" ? (
                    <select value={profile[f.key as keyof typeof profile]}
                      onChange={e => handleChange(f.key, e.target.value)}
                      className="flex-1 text-sm outline-none bg-transparent text-gray-700">
                      <option>Select City</option>
                      {["Mumbai","Delhi","Pune","Bangalore","Chennai","Hyderabad","Jaipur","Kochi"].map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  ) : (
                    <input type={f.type || "text"}
                      value={profile[f.key as keyof typeof profile]}
                      onChange={e => handleChange(f.key, e.target.value)}
                      className="flex-1 text-sm outline-none bg-transparent text-gray-700" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
              Save Changes
            </button>
            {saved && <span className="text-green-600 text-sm flex items-center">✓ Saved successfully</span>}
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
