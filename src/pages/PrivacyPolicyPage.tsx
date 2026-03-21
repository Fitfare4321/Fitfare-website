import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import PrivacyPolicy from "@/components/PrivacyPolicy";

const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0f172a', color: '#f1f5f9', minHeight: '100vh' }}>
            <Navbar />
            <main className="flex-1">
                <PrivacyPolicy />
            </main>
            <FooterSection />
        </div>
    );
};

export default PrivacyPolicyPage;
