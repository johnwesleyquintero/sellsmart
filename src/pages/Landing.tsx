import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-spotify-darker">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-white text-xl font-bold">Analytics Dashboard</div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:text-spotify-green">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-spotify-green hover:bg-spotify-green/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">
            Transform Your Data Into Actionable Insights
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Powerful analytics dashboard for monitoring and optimizing your business performance.
            Get started today and unlock the potential of your data.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-spotify-green hover:bg-spotify-green/90">
              Start Free Trial <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-spotify-light p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-3">Real-time Analytics</h3>
            <p className="text-gray-400">Monitor your performance metrics in real-time with our intuitive dashboard.</p>
          </div>
          <div className="bg-spotify-light p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-3">Custom Reports</h3>
            <p className="text-gray-400">Generate detailed reports and export them in multiple formats.</p>
          </div>
          <div className="bg-spotify-light p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-3">Data Integration</h3>
            <p className="text-gray-400">Seamlessly integrate with your existing tools and data sources.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;