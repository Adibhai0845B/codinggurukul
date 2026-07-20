import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react"; // Import the icon

interface User {
  _id: string;
  username: string;
  collegeName?: string; // Optional because registered users don't have it yet
  completedIds?: string[]; // Optional
  createdAt: string;
  status: 'enrolled' | 'registered'; // The tag we added in the backend
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalProblemsSolved: 0 });
  const [loading, setLoading] = useState(true);
  
  // Add User Form States
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { isAdminLoggedIn, adminToken, logoutAdmin } = useAdminAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAdminLoggedIn) {
      setLocation("/admin/login");
    }
  }, [isAdminLoggedIn, setLocation]);

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

  // NEW: Handle adding a user
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("https://coding-gurukul-backend.onrender.com/api/admin/users", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}` 
        },
        body: JSON.stringify({ username: newUsername, password: newPassword, collegeName: newName })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create user");

      // Success! Add user to the top of the table
      setUsers([data.user, ...users]);
      setStats(prev => ({ ...prev, totalUsers: prev.totalUsers + 1 }));
      
      // Reset and close form
      setNewUsername("");
      setNewPassword("");
      setNewName("");
      setShowAddForm(false);
      
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleUpgrade = async (username: string) => {
  try {
    const res = await fetch(`https://coding-gurukul-backend.onrender.com/api/admin/upgrade-user/${username}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (res.ok) {
      // Refresh the user list after upgrade
      const updatedUsers = await fetch("https://coding-gurukul-backend.onrender.com/api/admin/users", { 
        headers: { Authorization: `Bearer ${adminToken}` } 
      }).then(r => r.json());
      setUsers(updatedUsers);
    }
  } catch (err) {
    console.error("Upgrade failed", err);
  }
};
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

        {/* Action Bar */}
        <div className="flex justify-end">
          <Button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <UserPlus size={18} />
            {showAddForm ? "Cancel Registration" : "Add New Student"}
          </Button>
        </div>

        {/* Add User Form - Slides in when button is clicked */}
        {showAddForm && (
          <Card className="bg-zinc-900 border-blue-500/50">
            <CardHeader>
              <CardTitle className="text-blue-400">Register New Student</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddUser} className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                <div className="space-y-2 flex-1 w-full">
                    <label className="text-sm text-zinc-400">College Name *</label>
                    <Input 
                        placeholder="e.g. IIIT Vadodara" 
                        required // Make it required since the Schema demands it!
                        value={newName} 
                        onChange={e => setNewName(e.target.value)}
                        className="bg-zinc-800 border-zinc-700 text-white"
                    />
                </div>
                <div className="space-y-2 flex-1 w-full">
                  <label className="text-sm text-zinc-400">Username *</label>
                  <Input 
                    placeholder="e.g. Abhishek_Pandey" 
                    required 
                    value={newUsername} 
                    onChange={e => setNewUsername(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <div className="space-y-2 flex-1 w-full">
                  <label className="text-sm text-zinc-400">Password *</label>
                  <Input 
                    type="password"
                    placeholder="e.g. kaisa_laga_ye_sir/maam?" 
                    required 
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 text-white md:w-auto w-full">
                  {isSubmitting ? "Creating..." : "Save User"}
                </Button>
              </form>
              {formError && <p className="text-red-500 mt-4 text-sm font-medium">{formError}</p>}
            </CardContent>
          </Card>
        )}

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader><CardTitle>User Management</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-zinc-400 uppercase bg-zinc-800/50">
                  <tr>
                    <th className="px-4 py-3">Username</th>
                    <th className="px-4 py-3">College Name</th>
                    <th className="px-4 py-3">Joined Date</th>
                    <th className="px-4 py-3">Problems Solved</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                    {users.map((user) => (
                        <tr key={user._id} className={user.status === 'registered' ? 'bg-yellow-900/10' : ''}>
                        <td className="px-4 py-3 font-medium text-white">{user.username}</td>
                        <td className="px-4 py-3 text-zinc-300">{user.collegeName || "N/A (Pending)"}</td>
                        <td className="px-4 py-3 text-zinc-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                            {user.status === 'enrolled' ? (
                            <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-bold">
                                {(user.completedIds || []).length}
                            </span>
                            ) : (
                            <span className="text-yellow-600 text-xs font-bold">AWAITING UPGRADE</span>
                            )}
                        </td>
                        <td className="px-4 py-3 text-right">
                            {user.status === 'registered' && (
                            <Button 
                                variant="outline" 
                                className="text-green-400 border-green-400 hover:bg-green-400/10 mr-2"
                                onClick={() => handleUpgrade(user.username)}
                            >
                                Upgrade
                            </Button>
                            )}
                            <Button 
                            variant="ghost" 
                            className="text-red-400 hover:text-red-300"
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
