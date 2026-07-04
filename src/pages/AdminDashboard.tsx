import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  _id: string;
  username: string;
  name: string;
  completedIds: string[];
  createdAt: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalProblemsSolved: 0 });
  const [loading, setLoading] = useState(true);
  
  const { isAdminLoggedIn, adminToken, logoutAdmin } = useAdminAuth();
  const [, setLocation] = useLocation();

  // 1. Kick out unauthorized visitors
  useEffect(() => {
    if (!isAdminLoggedIn) {
      setLocation("/admin/login");
    }
  }, [isAdminLoggedIn, setLocation]);

  // 2. Fetch the Data from your backend
  useEffect(() => {
    if (!adminToken) return;

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${adminToken}` };
        
        const [usersRes, statsRes] = await Promise.all([
          fetch("https://coding-gurukul-backend.onrender.com/api/admin/users", { headers }),
          fetch("https://coding-gurukul-backend.onrender.com/api/admin/stats", { headers })
        ]);

        if (usersRes.ok && statsRes.ok) {
          const usersData = await usersRes.json();
          const statsData = await statsRes.json();
          setUsers(usersData);
          setStats(statsData);
        }
      } catch (error) {
        console.error("Failed to fetch admin data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [adminToken]);

  // 3. Delete User Function
  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`https://coding-gurukul-backend.onrender.com/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      if (res.ok) {
        setUsers(users.filter(u => u._id !== userId));
        setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
      }
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setLocation("/admin/login");
  };

  if (loading) return <div className="p-8 text-center text-white">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 w-full">
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-red-500">Admin Control Panel</h1>
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader><CardTitle className="text-zinc-400">Total Registered Users</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">{stats.totalUsers}</div></CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader><CardTitle className="text-zinc-400">Total Problems Solved</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">{stats.totalProblemsSolved}</div></CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader><CardTitle>User Management</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-zinc-400 uppercase bg-zinc-800/50">
                  <tr>
                    <th className="px-4 py-3">Username</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Joined Date</th>
                    <th className="px-4 py-3">Problems Solved</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-zinc-800/30">
                      <td className="px-4 py-3 font-medium text-white">{user.username}</td>
                      <td className="px-4 py-3 text-zinc-300">{user.name || "-"}</td>
                      <td className="px-4 py-3 text-zinc-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        {/* Defensive check just in case completedIds is missing */}
                        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-bold">
                          {(user.completedIds || []).length}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button 
                          variant="ghost" 
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}