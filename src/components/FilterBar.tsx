import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface FilterBarProps {
  search: string;
  setSearch: (s: string) => void;
  difficulty: string;
  setDifficulty: (s: string) => void;
  company: string;
  setCompany: (s: string) => void;
  status: string;
  setStatus: (s: string) => void;
  topic?: string;
  setTopic?: (s: string) => void;
  companies: string[];
  topics?: string[];
  hideTopic?: boolean;
}

export default function FilterBar({
  search,
  setSearch,
  difficulty,
  setDifficulty,
  company,
  setCompany,
  status,
  setStatus,
  topic,
  setTopic,
  companies,
  topics,
  hideTopic = false
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6" data-testid="filter-bar">
      <div className="flex-1">
        <Input 
          placeholder="Search questions..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
          data-testid="input-search"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[140px]" data-testid="select-status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Bookmarked">Bookmarked</SelectItem>
          </SelectContent>
        </Select>

        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger className="w-[140px]" data-testid="select-difficulty">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Difficulties</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Select value={company} onValueChange={setCompany}>
          <SelectTrigger className="w-[140px]" data-testid="select-company">
            <SelectValue placeholder="Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Companies</SelectItem>
            {companies.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {!hideTopic && topics && setTopic && (
          <Select value={topic || "All"} onValueChange={setTopic}>
            <SelectTrigger className="w-[180px]" data-testid="select-topic">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Topics</SelectItem>
              {topics.map(t => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
