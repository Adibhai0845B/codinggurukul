import { Switch, Route, Router as WouterRouter } from "wouter";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import DSASheet from "@/pages/DSASheet";
import CPSheet from "@/pages/CPSheet";
import Contests from "@/pages/Contests";
import Progress from "@/pages/Progress";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import ProtectedRoute from "@/components/ProtectedRoute";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dsa" component={() => <ProtectedRoute component={DSASheet} />} />
        <Route path="/login" component={Login} />
        <Route path="/cp" component={() => <ProtectedRoute component={CPSheet} />} />
        <Route path="/contests" component={() => <ProtectedRoute component={Contests} />} />
        <Route path="/progress" component={() => <ProtectedRoute component={Progress} />} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}
export default App;
