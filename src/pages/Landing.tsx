import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-nebula-dark text-nebula-text animate-fade-in-up">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-nebula-text hover:text-nebula-teal transition-colors animate-fade-in-up">
            SellSmart Analytics
          </div>
          <div className="space-x-4 animate-fade-in-up">
            <Link to="/login">
              <Button variant="ghost" className="text-nebula-text hover:text-nebula-teal">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-nebula-teal hover:bg-nebula-teal/90 text-nebula-dark font-bold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-6xl font-semibold mb-6 text-nebula-teal bg-gradient-text text-transparent bg-clip-text">
            Transform Your Amazon Ads Data
          </h1>
          <p className="text-xl text-nebula-text mb-8 leading-relaxed">
            Powerful analytics dashboard for monitoring and optimizing your Amazon advertising performance.
            Get started today and unlock the potential of your data.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-nebula-teal hover:bg-nebula-teal/90 text-nebula-dark font-bold px-8 py-6 text-lg">
              Start Free Trial <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
          <div className="bg-nebula-purple p-8 rounded-xl hover:bg-nebula-glow transition-colors duration-300">
            <h3 className="text-xl font-bold text-nebula-teal mb-4">Real-time Analytics</h3>
            <p className="text-nebula-text">Monitor your Amazon advertising performance metrics in real-time with our intuitive dashboard.</p>
          </div>
          <div className="bg-nebula-purple p-8 rounded-xl hover:bg-nebula-glow transition-colors duration-300">
            <h3 className="text-xl font-bold text-nebula-teal mb-4">Custom Reports</h3>
            <p className="text-nebula-text">Generate detailed reports and export them in multiple formats for deeper insights.</p>
          </div>
          <div className="bg-nebula-purple p-8 rounded-xl hover:bg-nebula-glow transition-colors duration-300">
            <h3 className="text-xl font-bold text-nebula-teal mb-4">Data Integration</h3>
            <p className="text-nebula-text">Seamlessly integrate with your Amazon Ads data sources for comprehensive analysis.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
