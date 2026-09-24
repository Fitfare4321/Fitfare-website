import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TermsAndConditions from "@/components/TermsAndConditions";

const TermsAndConditionsPage = () => {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0f172a', color: '#f1f5f9', minHeight: '100vh' }}>
            <Navbar />
            <main className="flex-1">
                <TermsAndConditions />
            </main>
            <Footer />
        </div>
    );
};

export default TermsAndConditionsPage;
