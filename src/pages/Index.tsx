
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import SignupForm from "@/components/SignupForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join FutureScope.AI</h2>
              <p className="text-lg text-gray-600">
                Create your account to start your personalized career journey
              </p>
            </div>
            <SignupForm />
          </div>
        </section>
        <StatsSection />
        <TestimonialsSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
