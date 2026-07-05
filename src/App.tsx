import { Switch, Route, Router as WouterRouter } from "wouter";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import DSASheet from "@/pages/DSASheet";
import CPSheet from "@/pages/CPSheet";
import Contests from "@/pages/Contests";
import Progress from "@/pages/Progress";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster"; // Adjust path as needed
import RoadmapPage from "@/pages/RoadmapPage";


import Compiler from "@/pages/Compiler"; // compiler ke liye

import AdminLogin from "@/pages/AdminLogin";// Admin login page

import AdminDashboard from "@/pages/AdminDashboard";
import Register from "./pages/Register";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/courses" component={Courses} />
        <Route path="/roadmap" component={RoadmapPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} /> {/* Add your new Register page here */}
        
        {/* These are your Premium/Enrolled-only pages */}
        <Route path="/dsa" component={() => <ProtectedRoute component={DSASheet} requireEnrolled={true} />} />
        <Route path="/cp" component={() => <ProtectedRoute component={CPSheet} requireEnrolled={true} />} />
        <Route path="/compiler" component={() => <ProtectedRoute component={Compiler} requireEnrolled={true} />} />
        
        {/* These are standard protected pages (available to both registered and enrolled) */}
        <Route path="/contests" component={() => <ProtectedRoute component={Contests} />} />
        <Route path="/progress" component={() => <ProtectedRoute component={Progress} />} />
        
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard" component={() => <ProtectedRoute component={AdminDashboard} />} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <WouterRouter base={(import.meta as any).env.BASE_URL.replace(/\/$/, "")}>
      <Router /><Toaster />
    </WouterRouter>
  );
}
export default App;
