import { Switch, Route, Router as WouterRouter } from "wouter";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import DSASheet from "@/pages/DSASheet";
import CPSheet from "@/pages/CPSheet";
import Start100Sheet from "@/pages/Start100Sheet";
import Contests from "@/pages/Contests";
import Progress from "@/pages/Progress";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster"; // Adjust path as needed
import RoadmapPage from "@/pages/RoadmapPage";
import LiveClasses from "@/pages/LiveClasses";
import LearningHub from "@/pages/LearningHub";
import PlacementReadiness from "@/pages/PlacementReadiness";


import Compiler from "@/pages/Compiler"; // compiler ke liye

import AdminLogin from "@/pages/AdminLogin";// Admin login page

import AdminDashboard from "@/pages/AdminDashboard";
import Register from "./pages/Register";
import ContestDetails from "@/pages/ContestDetails";
import ContestAdminLogin from "@/pages/ContestAdminLogin";
import MakeContest from "@/pages/MakeContest";
import ContestAdminRoute from "@/components/ContestAdminRoute";

import AdminProtectedRoute from "@/components/AdminProtectedRoute";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route 
          path="/admin/dashboard" 
          component={() => <AdminProtectedRoute component={AdminDashboard} />} 
        />
        <Route path="/" component={Home} />
        <Route path="/courses" component={Courses} />
        <Route path="/roadmap" component={() => <ProtectedRoute component={RoadmapPage} requireEnrolled={true} />} />
        <Route path="/live-classes" component={() => <ProtectedRoute component={LiveClasses} returnTo="/live-classes" />} />
        <Route path="/learn" component={() => <ProtectedRoute component={LearningHub} requireEnrolled={true} />} />
        <Route path="/placement-readiness" component={() => <ProtectedRoute component={PlacementReadiness} requireEnrolled={true} />} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} /> {/* Add your new Register page here */}
        <Route path="/make-contest/login" component={ContestAdminLogin} />
        <Route path="/make-contest" component={() => <ContestAdminRoute component={MakeContest} />} />
        
        {/* These are your Premium/Enrolled-only pages */}
        <Route path="/start-100" component={() => <ProtectedRoute component={Start100Sheet} requireEnrolled={true} />} />
        <Route path="/dsa" component={() => <ProtectedRoute component={DSASheet} requireEnrolled={true} />} />
        <Route path="/cp" component={() => <ProtectedRoute component={CPSheet} requireEnrolled={true} />} />
        {/* The compiler is available only after login. */}
        <Route path="/compiler" component={() => <ProtectedRoute component={Compiler} returnTo="/compiler" />} />
        
        {/* These are standard protected pages (available to both registered and enrolled) */}
        <Route path="/contests/:id" component={() => <ProtectedRoute component={ContestDetails} />} />
        <Route path="/contests" component={() => <ProtectedRoute component={Contests} />} />
        <Route path="/progress" component={() => <ProtectedRoute component={Progress} requireEnrolled={true} />} />
        
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
