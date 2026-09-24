import { useState, useRef } from "react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Building2,
  Dumbbell,
  Coins,
  Settings,
  CheckCircle2,
  Wallet,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { calculatePricing } from "@/lib/pricing";

const WebappDemo = () => {
  const { theme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme || theme) === "dark";
  const navigate = useNavigate();

  const [gymName, setGymName] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [monthlyFee, setMonthlyFee] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("150");
  const [showAllDays, setShowAllDays] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const [customPrice, setCustomPrice] = useState("");

  const price = Math.max(0, Number(pricePerDay) || 0);
  const monthly = Math.max(0, Number(monthlyFee) || 0);

  const buffer = monthly * 0.1;
  const MAX_ALLOWED = monthly > 0 ? Math.max(0, monthly - buffer) : Infinity;

  let maxAllowedDays = 0;

  if (price > 0 && monthly > 0) {
    for (let i = 1; i <= 25; i++) {
      const temp = calculatePricing(price, i);
      if (temp.finalPrice <= MAX_ALLOWED) {
        maxAllowedDays = i;
      } else break;
    }
  }

  const dayWiseData = [];
  for (let i = 1; i <= maxAllowedDays; i++) {
    const data = calculatePricing(price, i);
    const base = price * i;
    const ownerBonus = Math.round(data.commissionAmount * 0.4);

    dayWiseData.push({
      day: i,
      user: data.finalPrice,
      base,
      ownerBonus,
      ownerTotal: base + ownerBonus,
    });
  }

  let cumulative = 0;
  dayWiseData.forEach((item) => {
    cumulative += item.ownerTotal;
    item.cumulative = cumulative;
  });

  const handleDownload = async () => {
    const element = captureRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: isDark ? "#0f172a" : "#f8fafc",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("FitFare-Pricing-Demo.pdf");
  };

  const chartData = dayWiseData.map((item, i) => {
    const full = calculatePricing(price, i + 1);
    return {
      name: `Day ${i + 1}`,
      UserPays: full.finalPrice,
      OwnerEarnings: full.ownerGets,
      Commission: full.commissionAmount,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`p-4 rounded-xl shadow-2xl border backdrop-blur-md ${isDark ? "bg-slate-900/90 border-slate-700/50" : "bg-white/90 border-slate-200/50"}`}
        >
          <p
            className={`font-semibold mb-2 ${isDark ? "text-slate-200" : "text-slate-800"}`}
          >
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              className="text-sm flex items-center gap-2 mb-1"
              style={{ color: entry.color }}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}: <span className="font-bold">₹{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 pb-20 ${
        isDark ? "bg-[#0B0F19] text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-30 blur-[120px] mix-blend-screen ${isDark ? "bg-blue-600/30" : "bg-blue-300/40"}`}
        />
        <div
          className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-30 blur-[120px] mix-blend-screen ${isDark ? "bg-indigo-600/30" : "bg-indigo-300/40"}`}
        />
      </div>

      <div
        ref={captureRef}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6"
      >
        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between py-6 mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className={`p-2.5 rounded-full transition-all duration-300 flex items-center justify-center border ${
              isDark
                ? "bg-slate-800/50 border-slate-700 hover:bg-slate-700 text-slate-300"
                : "bg-white border-slate-200 hover:bg-slate-100 text-slate-600"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
              FitFare
            </h1>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-full shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </motion.header>

        {/* MAIN CONFIGURATION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* LEFT: INPUTS CARD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-4 rounded-3xl p-6 border shadow-2xl backdrop-blur-xl ${
              isDark
                ? "bg-slate-800/40 border-slate-700/50 shadow-black/40"
                : "bg-white/80 border-white/60 shadow-slate-200/50"
            }`}
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" />
              Configuration
            </h2>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label
                  className={`text-xs uppercase tracking-wider font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  Business Details
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Building2
                      className={`w-4.5 h-4.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    />
                  </div>
                  <input
                    placeholder="Enter Gym Name"
                    value={gymName}
                    onChange={(e) => setGymName(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500/50 outline-none transition-all ${
                      isDark
                        ? "bg-slate-900/50 border-slate-700/60 text-white placeholder:text-slate-600"
                        : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                    }`}
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Dumbbell
                    className={`w-4.5 h-4.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                  />
                </div>
                <input
                  placeholder="Service (e.g., Weight Training)"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500/50 outline-none transition-all ${
                    isDark
                      ? "bg-slate-900/50 border-slate-700/60 text-white placeholder:text-slate-600"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                  }`}
                />
              </div>

              <div className="pt-2 space-y-2">
                <label
                  className={`text-xs uppercase tracking-wider font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  Monthly Price
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Coins
                      className={`w-4.5 h-4.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    />
                  </div>
                  <input
                    type="number"
                    placeholder="e.g. 3000"
                    value={monthlyFee}
                    onChange={(e) =>
                      setMonthlyFee(
                        Math.max(0, Number(e.target.value)).toString(),
                      )
                    }
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border font-medium focus:ring-2 focus:ring-blue-500/50 outline-none transition-all ${
                      isDark
                        ? "bg-slate-900/50 border-slate-700/60 text-white"
                        : "bg-slate-50 border-slate-200 text-slate-900"
                    }`}
                  />
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-between">
                  <label
                    className={`text-xs uppercase tracking-wider font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Pay-As-You-Go Base
                  </label>
                  <span
                    className={`text-xs font-bold ${price > 0 ? "text-blue-500" : isDark ? "text-slate-500" : "text-slate-400"}`}
                  >
                    ₹{price || "0"}/day
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[100, 150, 200, 300, 500].map((p) => {
                    const isSelected = selectedPlan === String(p);
                    return (
                      <button
                        key={p}
                        onClick={() => {
                          setSelectedPlan(String(p));
                          setPricePerDay(String(p));
                        }}
                        className={`relative py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 border overflow-hidden ${
                          isSelected
                            ? "border-blue-500 text-white shadow-md shadow-blue-500/20"
                            : isDark
                              ? "border-slate-700 text-slate-300 hover:bg-slate-700/50"
                              : "border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 -z-10" />
                        )}
                        ₹{p}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => {
                      setSelectedPlan("other");
                      setPricePerDay(customPrice);
                    }}
                    className={`relative py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 border overflow-hidden ${
                      selectedPlan === "other"
                        ? "border-indigo-500 text-white shadow-md shadow-indigo-500/20"
                        : isDark
                          ? "border-slate-700 text-slate-300 hover:bg-slate-700/50"
                          : "border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {selectedPlan === "other" && (
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-600 -z-10" />
                    )}
                    Custom
                  </button>
                </div>

                <AnimatePresence>
                  {selectedPlan === "other" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <input
                        type="number"
                        placeholder="Enter custom rate..."
                        value={customPrice}
                        onChange={(e) => {
                          const val = Math.max(0, Number(e.target.value));
                          setCustomPrice(val.toString());
                          setPricePerDay(val.toString());
                        }}
                        className={`w-full px-4 py-3 rounded-xl border-2 border-indigo-500/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all ${
                          isDark
                            ? "bg-slate-900/50 text-white"
                            : "bg-white text-slate-900"
                        }`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: CHART CARD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-8 rounded-3xl p-6 border shadow-2xl backdrop-blur-xl flex flex-col ${
              isDark
                ? "bg-slate-800/40 border-slate-700/50 shadow-black/40"
                : "bg-white/80 border-white/60 shadow-slate-200/50"
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-indigo-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                  Revenue Projection
                </h2>
                {monthly > 0 && maxAllowedDays > 0 ? (
                  <p
                    className={`text-sm mt-1 px-3 py-1 inline-flex items-center gap-1.5 rounded-full ${isDark ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-green-50 text-green-600 border border-green-200"}`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Optimal Booking
                    Limit: <b>{maxAllowedDays} days</b>
                  </p>
                ) : (
                  <p
                    className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Enter monthly price to see the optimal day limit threshold.
                  </p>
                )}
              </div>
            </div>
            <div
              className={`flex-1 min-h-[300px] w-full rounded-2xl p-4 border ${isDark ? "bg-slate-900/50 border-slate-700/50" : "bg-slate-50 border-slate-200"}`}
            >
              {dayWiseData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorUser"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorOwner"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#22c55e"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#22c55e"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? "#334155" : "#cbd5e1"}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      stroke={isDark ? "#64748b" : "#94a3b8"}
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke={isDark ? "#64748b" : "#94a3b8"}
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{ paddingTop: "20px", fontSize: "12px" }}
                    />
                    <Line
                      name="User Final Cost"
                      type="monotone"
                      dataKey="UserPays"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    <Line
                      name="Owner"
                      type="monotone"
                      dataKey="OwnerEarnings"
                      stroke="#22c55e"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    <Line
                      name="Commission"
                      type="monotone"
                      dataKey="Commission"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div
                    className={`p-4 rounded-full ${isDark ? "bg-slate-800" : "bg-white"} shadow-lg mb-2`}
                  >
                    <Dumbbell
                      className={`w-8 h-8 ${isDark ? "text-slate-600" : "text-slate-300"}`}
                    />
                  </div>
                  <h3
                    className={`font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}
                  >
                    Awaiting Configuration
                  </h3>
                  <p
                    className={`text-sm max-w-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
                  >
                    Enter a valid Monthly Price and Plan to generate
                    predictions.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        {dayWiseData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Wallet className="w-6 h-6 text-emerald-500" />
                Day-by-Day Breakdown
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(showAllDays ? dayWiseData : dayWiseData.slice(0, 6)).map(
                (item, index) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.day}
                    className={`relative p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 group overflow-hidden ${
                      isDark
                        ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/60 hover:border-slate-600 hover:shadow-lg hover:shadow-black/50"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50"
                    }`}
                  >
                    <div
                      className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110 ${isDark ? "bg-slate-800/80" : "bg-slate-50"}`}
                    />

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className={`text-sm font-black tracking-widest uppercase ${isDark ? "text-slate-500" : "text-slate-400"}`}
                        >
                          Day {item.day} Price
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-[10px] uppercase font-bold tracking-wider mb-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                          >
                            Owner Takes
                          </div>
                          <div className="text-lg font-bold text-emerald-500">
                            ₹{item.ownerTotal}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`h-px w-full mb-4 ${isDark ? "bg-slate-700/50" : "bg-slate-100"}`}
                      />

                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span
                            className={
                              isDark ? "text-slate-400" : "text-slate-500"
                            }
                          >
                            Base Price
                          </span>
                          <span
                            className={`font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}
                          >
                            ₹{item.base}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span
                            className={
                              isDark ? "text-slate-400" : "text-slate-500"
                            }
                          >
                           Bonus
                          </span>
                          <span className="font-semibold text-orange-400">
                            +₹{item.ownerBonus}
                          </span>
                        </div>
                      
                      </div>
                    </div>
                  </motion.div>
                ),
              )}
            </div>
            {dayWiseData.length > 6 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowAllDays(!showAllDays)}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 border shadow-sm ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                      : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {showAllDays
                    ? "Collapse Details"
                    : `View Remaining ${dayWiseData.length - 6} Days`}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WebappDemo;
