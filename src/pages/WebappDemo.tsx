import { useState, useRef } from "react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";
import { calculatePricing } from "@/lib/pricing";

const WebappDemo = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();

    const [gymName, setGymName] = useState("");
    const [serviceName, setServiceName] = useState("");
    const [pricePerDay, setPricePerDay] = useState("");
    const [monthlyFee, setMonthlyFee] = useState("");
    const [selectedPlan, setSelectedPlan] = useState("150");
    const [showAllDays, setShowAllDays] = useState(false);
    const captureRef = useRef(null);
    const [customPrice, setCustomPrice] = useState("");

    const price = Math.max(0, Number(pricePerDay) || 0);
    const monthly = Math.max(0, Number(monthlyFee) || 0);

    // 🔥 LIMIT
    // const MAX_ALLOWED = monthly > 0 ? monthly - 500 : Infinity;
    const buffer = monthly * 0.1;
    const MAX_ALLOWED = monthly > 0 ? Math.max(0, monthly - buffer) : Infinity;

    // 🔥 MAX DAYS (LIMIT 25)
    let maxAllowedDays = 0;

    if (price > 0 && monthly > 0) {
        for (let i = 1; i <= 25; i++) {
            const temp = calculatePricing(price, i);
            if (temp.finalPrice <= MAX_ALLOWED) {
                maxAllowedDays = i;
            } else break;
        }
    }

    // 📊 DATA LIST (1 → maxDays)
    const dayWiseData = [];

    for (let i = 1; i <= maxAllowedDays; i++) {
        const data = calculatePricing(price, i);

        const base = price * i;
        const ownerBonus = Math.round(data.commissionAmount * 0.4); // OWNER%

        dayWiseData.push({
            day: i,
            user: data.finalPrice,
            base,
            ownerBonus,
            ownerTotal: base + ownerBonus,
        });
    }

    // 📸 DOWNLOAD
    const handleDownload = async () => {
        const element = captureRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 210; // A4 width
        const pageHeight = 297;

        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // 🔥 Add first page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // 🔥 Multi-page support
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save("fitfare-demo.pdf");
    };

    const chartData = dayWiseData.map((item, i) => {
        const full = calculatePricing(price, i + 1);

        return {
            day: i + 1,
            user: full.finalPrice,
            owner: full.ownerGets,
            commission: full.commissionAmount,
        };
    });
    return (
        <div
            ref={captureRef}
            className={`${isDark
                ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white"
                : "bg-white text-black"
                } min-h-screen`}
        >
            {/* HEADER */}
            <div className="flex justify-between p-4">
                <button onClick={() => navigate(-1)}>
                    <ArrowLeft />
                </button>

                <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-blue-600 rounded-lg"
                >
                    Download
                </button>
            </div>

            {/* TITLE */}
            <div className="text-center">
                <h1 className="text-2xl font-bold">FitFare Demo</h1>
                <p className="text-gray-400">
                    Smart pricing based on your budget
                </p>
            </div>

            {/* INPUTS */}
            <div className="max-w-4xl mx-auto p-4 space-y-4">

                <input
                    placeholder="Gym Name"
                    value={gymName}
                    onChange={(e) => setGymName(e.target.value)}
                    className="w-full p-3 rounded-xl border bg-transparent"
                />

                <input
                    placeholder="Service Name"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full p-3 rounded-xl border bg-transparent"
                />

                {/* PLAN */}
                <div className="grid grid-cols-3 gap-3">

                    {[100, 200, 300, 400, 500].map((p) => (
                        <div
                            key={p}
                            onClick={() => {
                                setSelectedPlan(String(p));
                                setPricePerDay(String(p));
                            }}
                            className={`p-3 rounded-xl text-center cursor-pointer border ${selectedPlan === String(p)
                                ? "bg-blue-600 text-white"
                                : ""
                                }`}
                        >
                            ₹{p}
                        </div>
                    ))}

                    {/* 🔥 OTHER BUTTON */}
                    <div
                        onClick={() => {
                            setSelectedPlan("other");
                            setPricePerDay("");
                        }}
                        className={`p-3 rounded-xl text-center cursor-pointer border ${selectedPlan === "other"
                            ? "bg-orange-500 text-white"
                            : ""
                            }`}
                    >
                        Other
                    </div>

                </div>
                {selectedPlan === "other" && (
                    <input
                        type="number"
                        placeholder="Enter custom price"
                        value={customPrice}
                        onChange={(e) => {
                            const val = Math.max(0, Number(e.target.value));
                            setCustomPrice(val.toString());
                            setPricePerDay(val.toString());
                        }}
                        className="w-full p-3 rounded-xl border border-orange-400 bg-transparent"
                    />
                )}

                <input
                    type="number"
                    placeholder="Monthly Gym Price"
                    value={monthlyFee}
                    onChange={(e) =>
                        setMonthlyFee(Math.max(0, Number(e.target.value)).toString())
                    }
                    className="w-full p-3 rounded-xl border bg-transparent"
                />

                {/* INFO */}
                {monthly > 0 && (
                    <p className="text-sm text-blue-400">
                        You can book up to <b>{maxAllowedDays}</b> days
                    </p>
                )}
            </div>

            {/* 🔥 BEAUTIFUL DAY LIST */}
            <div className="max-w-4xl mx-auto px-4 pb-10">

                <h2 className="text-lg font-semibold mb-4">
                    Day-wise Pricing
                </h2>

                <div className="space-y-4">

                    {(showAllDays ? dayWiseData : dayWiseData.slice(0, 5)).map((item, index) => (
                        <div
                            key={item.day}
                            className={`group relative flex justify-between items-center p-5 rounded-2xl 
    bg-gradient-to-r from-slate-800/70 to-slate-900/60 
    border border-slate-700 backdrop-blur-md
    hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300
    ${index % 2 !== 0 ? "ml-4" : ""}`}
                        >

                            {/* LEFT ACCENT */}
                            <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-blue-500 opacity-70 group-hover:opacity-100" />

                            {/* LEFT CONTENT */}
                            <div className="pl-3">
                                <p className="text-xs text-gray-400 mb-1">
                                    Day {item.day}
                                </p>

                                <p className="text-2xl font-bold text-blue-400 tracking-wide">
                                    ₹{item.ownerTotal}
                                </p>
                            </div>

                            {/* RIGHT CONTENT */}
                            <div className="text-right space-y-1">

                                <p className="text-sm text-green-400 font-medium">
                                    Base ₹{item.base}
                                </p>

                                <p className="text-xs text-orange-400">
                                    Bonus ₹{item.ownerBonus}
                                </p>

                            </div>

                        </div>

                    ))}
                    {dayWiseData.length > 5 && (
                        <div className="text-center mt-4">
                            <button
                                onClick={() => setShowAllDays(!showAllDays)}
                                className="px-5 py-2 text-sm rounded-lg border border-slate-600 
      hover:bg-slate-700 transition"
                            >
                                {showAllDays ? "Show Less" : "See All"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* 📊 GRAPH */}
            <div className="max-w-4xl mx-auto px-4 pb-10">

                <h2 className="text-lg font-semibold mb-4">
                    Pricing Trend
                </h2>

                <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>

                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />

                            <XAxis dataKey="day" stroke="#aaa" />
                            <YAxis stroke="#aaa" />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="user"
                                stroke="#3b82f6"
                                strokeWidth={2}
                            />

                            <Line
                                type="monotone"
                                dataKey="commission"
                                stroke="#f97316"
                                strokeWidth={2}
                            />

                            <Line
                                type="monotone"
                                dataKey="owner"
                                stroke="#22c55e"
                                strokeWidth={2}
                            />

                        </LineChart>
                    </ResponsiveContainer>

                </div>
            </div>
        </div>
    );
};

export default WebappDemo;