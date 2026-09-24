import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Career from "@/components/Career";

const CareerPage = () => {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0f172a', color: '#f1f5f9', minHeight: '100vh' }}>
            <Navbar />
            <main className="flex-1">
                <Career />
            </main>
            <Footer />
        </div>
    );
};

export default CareerPage;
