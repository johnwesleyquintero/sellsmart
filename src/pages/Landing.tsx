import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-spotify-darker text-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold hover:text-spotify-green transition-colors">
            SellSmart Analytics
          </div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:text-spotify-green transition-colors">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-spotify-green hover:bg-spotify-green/90 text-black font-bold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-spotify-green bg-clip-text text-transparent">
            Transform Your Amazon Ads Data
          </h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Powerful analytics dashboard for monitoring and optimizing your Amazon advertising performance.
            Get started today and unlock the potential of your data.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-spotify-green hover:bg-spotify-green/90 text-black font-bold px-8 py-6 text-lg">
              Start Free Trial <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-spotify-light p-8 rounded-xl hover:bg-opacity-80 transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="text-xl font-bold text-spotify-green mb-4">Real-time Analytics</h3>
            <p className="text-gray-400">Monitor your Amazon advertising performance metrics in real-time with our intuitive dashboard.</p>
          </div>
          <div className="bg-spotify-light p-8 rounded-xl hover:bg-opacity-80 transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="text-xl font-bold text-spotify-green mb-4">Custom Reports</h3>
            <p className="text-gray-400">Generate detailed reports and export them in multiple formats for deeper insights.</p>
          </div>
          <div className="bg-spotify-light p-8 rounded-xl hover:bg-opacity-80 transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="text-xl font-bold text-spotify-green mb-4">Data Integration</h3>
            <p className="text-gray-400">Seamlessly integrate with your Amazon Ads data sources for comprehensive analysis.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;