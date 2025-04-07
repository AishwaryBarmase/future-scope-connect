
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Discover Your Ideal Career Path?</h2>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
          Join thousands of professionals who have transformed their careers with personalized AI guidance.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" variant="secondary" className="text-primary hover:text-primary">
            Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
