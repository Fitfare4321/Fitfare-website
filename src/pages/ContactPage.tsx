import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0f1c] text-black dark:text-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>Contact Us</h1>
        <p className="text-gray-500 mb-8">We'd love to hear from you. Get in touch with the FitFare team.</p>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-4">Email</h3>
            <p className="text-[#305CDE] font-medium">info@fitfare.in</p>
            
            <h3 className="text-xl font-bold mt-8 mb-4">Phone</h3>
            <p className="text-gray-600 dark:text-gray-400">+91 7666400518</p>
            
            <h3 className="text-xl font-bold mt-8 mb-4">Address</h3>
            <p className="text-gray-600 dark:text-gray-400">
                WeWork Atrium Place, 6th Floor, Tower 3<br />
                Vanijya Nikunj, Phase V, Udyog Vihar<br />
                Gurugram, Haryana 122006, India
            </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
