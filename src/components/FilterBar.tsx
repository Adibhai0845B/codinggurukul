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
  hideCompany?: boolean;
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
  hideTopic = false,
  hideCompany = false
}: FilterBarProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-y bg-white/60 py-4 dark:border-white/10 dark:bg-white/[.015] lg:flex-row" data-testid="filter-bar">
      <div className="flex-1">
        <Input 
          placeholder="Search questions..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 w-full bg-white focus-visible:ring-blue-500 dark:border-white/10 dark:bg-[#080d18]"
          data-testid="input-search"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap [&_button]:h-11 [&_button]:w-full [&_button]:bg-white dark:[&_button]:border-white/10 dark:[&_button]:bg-[#080d18] sm:[&_button]:w-auto">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-[140px]" data-testid="select-status">
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
          <SelectTrigger className="w-full sm:w-[140px]" data-testid="select-difficulty">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Difficulties</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        {!hideCompany && <Select value={company} onValueChange={setCompany}>
          <SelectTrigger className="w-full sm:w-[140px]" data-testid="select-company">
            <SelectValue placeholder="Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Companies</SelectItem>
            {companies.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>}

        {!hideTopic && topics && setTopic && (
          <Select value={topic || "All"} onValueChange={setTopic}>
            <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-topic">
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
