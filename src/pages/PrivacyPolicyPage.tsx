import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacyPolicy from "@/components/PrivacyPolicy";

const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0f172a', color: '#f1f5f9', minHeight: '100vh' }}>
            <Navbar />
            <main className="flex-1">
                <PrivacyPolicy />
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicyPage;
