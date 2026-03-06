import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import About from "@/components/About";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <About />
      </main>

      <FooterSection />
    </div>
  );
};

export default AboutPage;