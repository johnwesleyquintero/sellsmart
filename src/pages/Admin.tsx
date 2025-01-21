import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Admin = () => {
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from your backend
  const users = [
    { id: 1, email: "user1@example.com", plan: "Pro", status: "Active" },
    { id: 2, email: "user2@example.com", plan: "Basic", status: "Active" },
    { id: 3, email: "user3@example.com", plan: "Pro", status: "Inactive" },
  ];

  const subscriptionPlans = [
    { id: 1, name: "Basic", price: "$9.99/mo", features: ["Basic Analytics", "Limited Reports"] },
    { id: 2, name: "Pro", price: "$29.99/mo", features: ["Advanced Analytics", "Unlimited Reports", "Priority Support"] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-spotify-darker via-[#1a2c1a] to-spotify-darker text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Subscription Plans */}
          <Card className="p-6 bg-black/40 border-0">
            <h2 className="text-xl font-semibold mb-4">Subscription Plans</h2>
            <div className="space-y-4">
              {subscriptionPlans.map((plan) => (
                <div key={plan.id} className="p-4 rounded-lg bg-black/20">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{plan.name}</h3>
                    <span className="text-green-400">{plan.price}</span>
                  </div>
                  <ul className="text-sm text-gray-300">
                    {plan.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          {/* User Management */}
          <Card className="p-6 bg-black/40 border-0">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Plan</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-gray-300">{user.email}</TableCell>
                    <TableCell className="text-gray-300">{user.plan}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;