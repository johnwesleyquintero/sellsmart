import { Link } from "react-router-dom";
import { Button } from "../components/ui/button.tsx";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  console.log("Landing page rendered");
  return (
    <div className="min-h-screen bg-[var(--void-core)] text-[var(--text-color)] animate-fade-in-up relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--background-gradient)] opacity-20 z-0"></div>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between animate-fade-in-up">
          <div className="text-2xl font-bold hover:text-[var(--quantum-teal)] transition-colors">
            SellSmart Analytics
          </div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="shadow-none hover:shadow-none nebula-button">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-[var(--quantum-teal)] hover:bg-[var(--quantum-teal)]/90 text-[var(--void-core)] font-bold shadow-md hover:shadow-lg nebula-button">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20 animate-fade-in-up">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-6xl font-semibold mb-6 bg-[var(--gradient-text)] text-transparent bg-clip-text">
            Transform Your Amazon Ads Data.
          </h1>
          <p className="text-xl text-[var(--text-color)] mb-8 leading-relaxed">
            Powerful analytics dashboard for monitoring and optimizing your Amazon advertising performance.
            Get started today and unlock the potential of your data.
          </p>
          <Link to="/register">
            <Button size="lg" variant="nebula" className="bg-[var(--quantum-teal)] hover:bg-[var(--quantum-teal)]/90 text-[var(--void-core)] font-bold px-8 py-6 text-lg shadow-md hover:shadow-lg">
              Start Free Trial <ArrowRight className="ml-2 w-6 h-6" />.
            </Button>
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up relative z-10">
          <div className="bg-[var(--singularity-purple)] p-8 rounded-xl nebula-border transition-colors duration-300">
            <h3 className="text-xl font-bold text-[var(--quantum-teal)] mb-4">Real-time Analytics</h3>
            <p className="text-[var(--text-color)]">Monitor your Amazon advertising performance metrics in real-time with our intuitive dashboard.</p>
          </div>
          <div className="bg-[var(--singularity-purple)] p-8 rounded-xl nebula-border transition-colors duration-300">
            <h3 className="text-xl font-bold text-[var(--quantum-teal)] mb-4">Custom Reports</h3>
            <p className="text-[var(--text-color)]">Generate detailed reports and export them in multiple formats for deeper insights.</p>
          </div>
          <div className="bg-[var(--singularity-purple)] p-8 rounded-xl nebula-border transition-colors duration-300">
            <h3 className="text-xl font-bold text-[var(--quantum-teal)] mb-4">Data Integration</h3>
            <p className="text-[var(--text-color)]">Seamlessly integrate with your Amazon Ads data sources for comprehensive analysis.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
