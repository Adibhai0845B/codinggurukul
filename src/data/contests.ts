export interface Contest {
  id: string;
  platform: string;
  description: string;
  link: string;
  schedule: string;
  difficulty: string;
}

export const contests: Contest[] = [
  {
    id: "contest-1",
    platform: "Codeforces",
    description: "Div 1/2/3/4 rounds, ICPC-style problems",
    link: "https://codeforces.com/contests",
    schedule: "Multiple rounds weekly",
    difficulty: "800–3500 rating"
  },
  {
    id: "contest-2",
    platform: "LeetCode Weekly",
    description: "Weekly and biweekly contests, 4 problems in 90 min",
    link: "https://leetcode.com/contest/",
    schedule: "Every Sunday",
    difficulty: "Easy–Hard"
  },
  {
    id: "contest-3",
    platform: "CodeChef",
    description: "Starters, Long Challenge, and Cook-Off formats",
    link: "https://www.codechef.com/contests",
    schedule: "Multiple per week",
    difficulty: "1–7 stars"
  },
  {
    id: "contest-4",
    platform: "AtCoder",
    description: "ABC (beginners), ARC (regular), AGC (grand)",
    link: "https://atcoder.jp/contests/",
    schedule: "Saturdays/Sundays",
    difficulty: "400–3200 rating"
  },
  {
    id: "contest-5",
    platform: "HackerEarth",
    description: "Code circuit, hiring challenges, practice contests",
    link: "https://www.hackerearth.com/challenges/",
    schedule: "Ongoing",
    difficulty: "Beginner–Expert"
  },
  {
    id: "contest-6",
    platform: "HackerRank",
    description: "Week of Code, Domain contests",
    link: "https://www.hackerrank.com/contests",
    schedule: "Regular",
    difficulty: "All levels"
  }
];
