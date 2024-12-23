"use client";

import Navbar from "@/components/homeComp/Navbar";
import Footer from "@/components/homeComp/Footer";
import FAQ from "@/components/homeComp/FAQ"; // Reusable FAQ component
import { faqs } from "@/lib/homeData";

const FaqPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <section className="py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Pass all FAQs to the reusable FAQ component */}
          <FAQ faqs={faqs} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FaqPage;
