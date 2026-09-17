import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactSection from "@/components/ContactSection";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="pt-20">
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default ContactPage;
