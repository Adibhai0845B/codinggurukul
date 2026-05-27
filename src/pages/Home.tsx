import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code2, Trophy, LineChart, Target, FileText, Bookmark } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { dsaQuestions } from "@/data/dsaQuestions";
import { cpQuestions } from "@/data/cpQuestions";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  const { completedIds } = useProgress();
  
  const dsaCompleted = dsaQuestions.filter(q => completedIds.includes(q.id)).length;
  const cpCompleted = cpQuestions.filter(q => completedIds.includes(q.id)).length;

  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto pt-10">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
          The ultimate preparation tracker
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Master DSA & CP with a <span className="text-primary">Structured Practice Sheet</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          A premium, dark-themed cockpit for college students and competitive programmers. 
          Track your progress, take notes, and conquer the coding interviews.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button size="lg" className="h-12 px-8 text-base" asChild>
            <Link href="/dsa" data-testid="link-start-dsa">
              Start DSA Sheet <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent border-primary/20 hover:bg-primary/10 text-foreground" asChild>
            <Link href="/cp" data-testid="link-start-cp">
              Start CP Sheet
            </Link>
          </Button>
        </div>
      </section>

      {/* Progress Preview */}
      {(dsaCompleted > 0 || cpCompleted > 0) && (
        <section className="w-full max-w-3xl mx-auto">
          <Card className="bg-card/50 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Your Progress</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">DSA Problems</span>
                    <span className="text-primary font-mono">{dsaCompleted} / {dsaQuestions.length}</span>
                  </div>
                  <ProgressBar completed={dsaCompleted} total={dsaQuestions.length} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">CP Problems</span>
                    <span className="text-primary font-mono">{cpCompleted} / {cpQuestions.length}</span>
                  </div>
                  <ProgressBar completed={cpCompleted} total={cpQuestions.length} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Stats Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <Card className="bg-card">
          <CardContent className="p-6 text-center space-y-2">
            <h3 className="text-3xl font-bold text-primary font-mono">150+</h3>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">DSA Problems</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-6 text-center space-y-2">
            <h3 className="text-3xl font-bold text-primary font-mono">75</h3>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">CP Problems</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-6 text-center space-y-2">
            <h3 className="text-3xl font-bold text-primary font-mono">5</h3>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Rating Buckets</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-6 text-center space-y-2">
            <h3 className="text-3xl font-bold text-primary font-mono">100%</h3>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Local Storage</p>
          </CardContent>
        </Card>
      </section>

      {/* Features */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Code2 className="h-6 w-6" />}
          title="Standard DSA Problems"
          description="Curated list of 150 top DSA questions covering Arrays, DP, Graphs, and more."
        />
        <FeatureCard 
          icon={<Trophy className="h-6 w-6" />}
          title="Codeforces CP Problems"
          description="Progressive rating-wise practice from 800 to 1200 for competitive programming."
        />
        <FeatureCard 
          icon={<LineChart className="h-6 w-6" />}
          title="Progress Tracking"
          description="Visual progress bars and completion stats saved automatically in your browser."
        />
        <FeatureCard 
          icon={<Target className="h-6 w-6" />}
          title="Topic-wise Roadmap"
          description="Structured learning path to ensure you master fundamentals before advanced topics."
        />
        <FeatureCard 
          icon={<Bookmark className="h-6 w-6" />}
          title="Notes & Bookmarks"
          description="Save specific questions for revision and attach personal notes or approaches."
        />
        <FeatureCard 
          icon={<FileText className="h-6 w-6" />}
          title="Contest Practice"
          description="Links to all major contest platforms to put your skills to the test."
        />
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-card/50 border-border/50 hover:bg-card hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <div className="p-3 bg-primary/10 w-fit rounded-lg text-primary mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
