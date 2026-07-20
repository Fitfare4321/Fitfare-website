import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import Services from "@/components/Services";


const ServicesPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Services />
            </main>
            <FooterSection />
        </div>
    );
};

export default ServicesPage;
