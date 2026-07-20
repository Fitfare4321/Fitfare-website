import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import Event from "@/components/Event";

const EventPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-slate-100">
      <Navbar />

      <main className="flex-1">
        <Event />
      </main>



      <FooterSection />
    </div>
  );
};

export default EventPage;