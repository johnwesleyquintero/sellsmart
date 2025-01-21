import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - in a real app, this would validate against a backend
    if (email && password) {
      localStorage.setItem("isAuthenticated", "true");
      
      // Mock admin check - in a real app, this would be handled by your backend
      if (email === "admin@example.com") {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else {
        localStorage.setItem("isAdmin", "false");
        navigate("/dashboard");
      }
      
      toast.success("Successfully logged in!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-spotify-darker via-[#1a2c1a] to-spotify-darker p-4">
      <Card className="w-full max-w-md p-8 bg-black/40 border-0">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-0 text-white placeholder:text-gray-400"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 border-0 text-white placeholder:text-gray-400"
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="/register" className="text-white hover:underline">
              Register
            </a>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;