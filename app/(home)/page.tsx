"use client";

import { useRouter } from "next/navigation";
import Footer from "@/components/homeComp/Footer";
import Navbar from "@/components/homeComp/Navbar";
import EventCalendar2 from "@/components/EventCalendar2";
import Features from "@/components/homeComp/Features";
import FAQ from "@/components/homeComp/FAQ";
import Testimonials from "@/components/homeComp/Testimonials";
import { features, faqs, testimonials } from "@/lib/homeData";

// Utility function to shuffle an array
const shuffleArray = (array: any[]) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/sign-in"); // Replace "/sign-in" with the correct path for your sign-in page
  };

  // Shuffle and slice the data arrays
  const limitedFaqs = shuffleArray(faqs).slice(0, 5); // Random 5 FAQs
  const limitedTestimonials = shuffleArray(testimonials).slice(0, 3); // Random 3 testimonials

  return (
    <div className="bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="flex items-center justify-center h-screen bg-red-600 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">Join Us in Saving Lives</h1>
          <p className="mt-4 text-lg">Become a blood donor today and help those in need.</p>
          <button
            onClick={handleButtonClick}
            className="mt-6 inline-block rounded-lg bg-white text-red-600 px-6 py-3 font-semibold transition duration-300 hover:bg-gray-200"
          >
            Get Involved
          </button>
        </div>
      </section>

      {/* Features Section */}
      <Features features={features} />

      {/* Campaigns Section */}
      <section id="campaigns" className="py-16 bg-gray-50">
        <EventCalendar2 />
      </section>

      {/* FAQ Section */}
      <FAQ faqs={limitedFaqs} />

      {/* Testimonial Section */}
      <Testimonials testimonials={limitedTestimonials} />

      <Footer />
    </div>
  );
};

export default HomePage;
