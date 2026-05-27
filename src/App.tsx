import { Switch, Route, Router as WouterRouter } from "wouter";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import DSASheet from "@/pages/DSASheet";
import CPSheet from "@/pages/CPSheet";
import Contests from "@/pages/Contests";
import Progress from "@/pages/Progress";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dsa" component={DSASheet} />
        <Route path="/cp" component={CPSheet} />
        <Route path="/contests" component={Contests} />
        <Route path="/progress" component={Progress} />
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
