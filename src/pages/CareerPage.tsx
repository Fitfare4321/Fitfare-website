import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import Career from "@/components/Career";

const CareerPage = () => {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0f172a', color: '#f1f5f9', minHeight: '100vh' }}>
            <Navbar />
            <main className="flex-1">
                <Career />
            </main>
            <FooterSection />
        </div>
    );
};

export default CareerPage;
