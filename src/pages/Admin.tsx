import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Edit2, Trash2, UserX, UserCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

// Mock data - in a real app, this would come from your backend
const users = [
  { id: 1, email: "user1@example.com", plan: "Pro", status: "Active" },
  { id: 2, email: "user2@example.com", plan: "Basic", status: "Active" },
  { id: 3, email: "user3@example.com", plan: "Pro", status: "Inactive" },
  // Add more mock users for pagination testing
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 4,
    email: `user${i + 4}@example.com`,
    plan: i % 2 === 0 ? "Pro" : "Basic",
    status: i % 3 === 0 ? "Inactive" : "Active",
  })),
];

const subscriptionPlans = [
  { id: 1, name: "Basic", price: "$9.99/mo", features: ["Basic Analytics", "Limited Reports"] },
  { id: 2, name: "Pro", price: "$29.99/mo", features: ["Advanced Analytics", "Unlimited Reports", "Priority Support"] },
];

const ITEMS_PER_PAGE = 5;

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesPlan = planFilter === "all" || user.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleUserAction = (action: string, userId: number) => {
    switch (action) {
      case "edit":
        toast({
          title: "Edit User",
          description: `Editing user ${userId}`,
        });
        break;
      case "delete":
        toast({
          title: "Delete User",
          description: `Deleting user ${userId}`,
          variant: "destructive",
        });
        break;
      case "toggle-status":
        toast({
          title: "Status Updated",
          description: `User ${userId} status toggled`,
        });
        break;
    }
  };

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
                <div key={plan.id} className="p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <h3 className="font-medium">{plan.name}</h3>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to view plan details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">User Management</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 bg-black/20 border-0 text-white placeholder:text-gray-400"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[120px] bg-black/20 border-0">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-[120px] bg-black/20 border-0">
                    <SelectValue placeholder="Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Plan</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-black/20">
                    <TableCell className="text-gray-300">{user.email}</TableCell>
                    <TableCell className="text-gray-300">{user.plan}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleUserAction("edit", user.id)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit user</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleUserAction("toggle-status", user.id)}
                              >
                                {user.status === "Active" ? (
                                  <UserX className="h-4 w-4" />
                                ) : (
                                  <UserCheck className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{user.status === "Active" ? "Deactivate" : "Activate"} user</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleUserAction("delete", user.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-400" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete user</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;