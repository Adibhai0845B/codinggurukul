export interface CPQuestion {
  id: string;
  title: string;
  rating: 800 | 900 | 1000 | 1100 | 1200;
  topic: string;
  tags: string[];
  codeforcesLink: string;
  note: string;
}

export const cpQuestions: CPQuestion[] = [
  // Rating 800 (15 problems)
  { id: "cp-001", title: "Watermelon", rating: 800, topic: "Implementation", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/4/A", note: "Check if even and > 2" },
  { id: "cp-002", title: "Bit++", rating: 800, topic: "Implementation", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/282/A", note: "Simple increment/decrement" },
  { id: "cp-003", title: "Way Too Long Words", rating: 800, topic: "Strings", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/71/A", note: "Abbreviate if len > 10" },
  { id: "cp-004", title: "Theatre Square", rating: 800, topic: "Maths", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1/A", note: "Ceil division" },
  { id: "cp-005", title: "Beautiful Matrix", rating: 800, topic: "Implementation", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/263/A", note: "Find 1, count moves to center" },
  { id: "cp-006", title: "Team", rating: 800, topic: "Brute Force", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/231/A", note: "Count problems where >= 2 agree" },
  { id: "cp-007", title: "George and Accommodation", rating: 800, topic: "Implementation", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/270/A", note: "Count rooms with >= 2 free" },
  { id: "cp-008", title: "Next Round", rating: 800, topic: "Implementation", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/158/A", note: "Count score >= k-th score (if positive)" },
  { id: "cp-009", title: "Domino Piling", rating: 800, topic: "Maths", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/50/A", note: "Floor(m*n/2)" },
  { id: "cp-010", title: "Petya and Strings", rating: 800, topic: "Strings", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/112/A", note: "Compare char by char with case ignore" },
  { id: "cp-011", title: "Helpful Maths", rating: 800, topic: "Sorting", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/339/A", note: "Extract digits, sort, rejoin" },
  { id: "cp-012", title: "Codehorses with Drinks", rating: 800, topic: "Implementation", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/828/A", note: "Check if B appears in A" },
  { id: "cp-013", title: "Dubstep", rating: 800, topic: "Strings", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/588/A", note: "Remove WUB, trim, collapse spaces" },
  { id: "cp-014", title: "Vanya and Fence", rating: 800, topic: "Implementation", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/677/A", note: "Count costumes > height" },
  { id: "cp-015", title: "Bear and Prime 100", rating: 800, topic: "Number Theory", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/660/A", note: "Query primes; if composite, ask factor" },

  // Rating 900 (15 problems)
  { id: "cp-016", title: "Lucky Division", rating: 900, topic: "Number Theory", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/121/A", note: "Check divisibility by 2,3,5,7" },
  { id: "cp-017", title: "Soldier and Bananas", rating: 900, topic: "Maths", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/546/A", note: "Sum = k*(k+1)/2; diff from w" },
  { id: "cp-018", title: "Pangram", rating: 900, topic: "Strings", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/520/A", note: "Check all 26 letters present" },
  { id: "cp-019", title: "Sereja and Dima", rating: 900, topic: "Greedy", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/381/A", note: "Two pointers from ends greedily" },
  { id: "cp-020", title: "Sum in the tree", rating: 900, topic: "Greedy", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1099/A", note: "Even levels assigned min of parent" },
  { id: "cp-021", title: "Anton and Danik", rating: 900, topic: "Implementation", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/734/A", note: "Count A and D wins" },
  { id: "cp-022", title: "Spreadsheets", rating: 900, topic: "Maths", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1B", note: "Convert column notation RC↔ABC" },
  { id: "cp-023", title: "Stones on the Table", rating: 900, topic: "Implementation", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/266/B", note: "Count removals of adjacent duplicates" },
  { id: "cp-024", title: "Nearly Lucky Number", rating: 900, topic: "Implementation", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/122/A", note: "Count 4s and 7s; check if that count is lucky" },
  { id: "cp-025", title: "Fox and Number", rating: 900, topic: "Maths", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/389/A", note: "Each operation adds floor difference" },
  { id: "cp-026", title: "Queue at the School", rating: 900, topic: "Strings", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/266/A", note: "Simulate swapping boys past girls" },
  { id: "cp-027", title: "Loser", rating: 900, topic: "Constructive Algorithms", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/319/B", note: "Check if can distribute mod 2" },
  { id: "cp-028", title: "Petr and a Combination Lock", rating: 900, topic: "Constructive Algorithms", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/156/B", note: "Check rotations sum to 360" },
  { id: "cp-029", title: "Array with Odd Sum", rating: 900, topic: "Constructive Algorithms", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1296/B", note: "Odd count must be odd; can swap" },
  { id: "cp-030", title: "Squats", rating: 900, topic: "Constructive Algorithms", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1506/B", note: "Pair up activities" },

  // Rating 1000 (15 problems)
  { id: "cp-031", title: "Tricky Sum", rating: 1000, topic: "Maths", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/598/B", note: "Use formula for sum 1..n, adjust for powers of 2" },
  { id: "cp-032", title: "Kevin and Permutation", rating: 1000, topic: "Constructive Algorithms", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1699/B", note: "Build greedy permutation" },
  { id: "cp-033", title: "Points on Line", rating: 1000, topic: "Two Pointer", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/251/B", note: "Sort; for each right, find leftmost valid" },
  { id: "cp-034", title: "Codeforces Round 679 B", rating: 1000, topic: "Maths", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1442/A", note: "Find median condition" },
  { id: "cp-035", title: "Vasya and Beautiful Arrays", rating: 1000, topic: "Prefix Sum", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1073/A", note: "Prefix sum for range queries" },
  { id: "cp-036", title: "Maximum Increase", rating: 1000, topic: "Greedy", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/702/B", note: "Count longest increasing run" },
  { id: "cp-037", title: "Lucky Mask", rating: 1000, topic: "Strings", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/121/B", note: "Sum digits; check lucky" },
  { id: "cp-038", title: "Boy or Girl", rating: 1000, topic: "Strings", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/236/A", note: "Count distinct chars; odd = girl" },
  { id: "cp-039", title: "Fractal", rating: 1000, topic: "Constructive Algorithms", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/656/C", note: "Build fractal expansion" },
  { id: "cp-040", title: "Gregor and Two Painters", rating: 1000, topic: "Maths", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1548/A", note: "Count valid positions" },
  { id: "cp-041", title: "Counting Rhymes", rating: 1000, topic: "Strings", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/46/B", note: "Group by suffix" },
  { id: "cp-042", title: "Codeforces 1B", rating: 1000, topic: "Maths", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1B", note: "Spreadsheet column conversion" },
  { id: "cp-043", title: "Splitting into Digits", rating: 1000, topic: "Constructive Algorithms", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1005A", note: "Split number into n ones" },
  { id: "cp-044", title: "Election", rating: 1000, topic: "Greedy", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1567A", note: "Check if leader stays ahead" },
  { id: "cp-045", title: "Minimum Adjacent Swaps", rating: 1000, topic: "Greedy", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1367A", note: "Rearrange to alternating greedily" },

  // Rating 1100 (15 problems)
  { id: "cp-046", title: "Doremy's IQ", rating: 1100, topic: "Binary Search", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1764/C", note: "Binary search on switch point" },
  { id: "cp-047", title: "Increasing Sequence", rating: 1100, topic: "Greedy", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/264/B", note: "Replace if not greater than previous" },
  { id: "cp-048", title: "Password", rating: 1100, topic: "Strings", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/126/E", note: "Use KMP failure function" },
  { id: "cp-049", title: "Modular Arithmetic", rating: 1100, topic: "Number Theory", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1748/B", note: "Apply congruences" },
  { id: "cp-050", title: "Sort the Array", rating: 1100, topic: "Sorting", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/451/B", note: "Find one bad segment; check if reversing helps" },
  { id: "cp-051", title: "Vasya and Socks", rating: 1100, topic: "Greedy", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/460/B", note: "Simulate sock consumption" },
  { id: "cp-052", title: "Longest Palindrome", rating: 1100, topic: "Greedy", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/9/E", note: "Count pairs; one odd in center" },
  { id: "cp-053", title: "Ilya and Diplomas", rating: 1100, topic: "Constructive Algorithms", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/269/B", note: "Distribute within range constraints" },
  { id: "cp-054", title: "Fence", rating: 1100, topic: "Constructive Algorithms", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/191/A", note: "Check if can split planks" },
  { id: "cp-055", title: "Rounding", rating: 1100, topic: "Maths", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1255A", note: "Round each to nearest 10" },
  { id: "cp-056", title: "Mex after Queries", rating: 1100, topic: "Two Pointer", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1739B", note: "Track mex after each range fill" },
  { id: "cp-057", title: "Three Strings", rating: 1100, topic: "Strings", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1702B", note: "Check interleave validity" },
  { id: "cp-058", title: "Infinite Sequence", rating: 1100, topic: "Number Theory", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1B", note: "Cycle detection in sequence" },
  { id: "cp-059", title: "Permutation Product", rating: 1100, topic: "Constructive Algorithms", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1698B", note: "Build permutation with given signs" },
  { id: "cp-060", title: "Strange Beauty", rating: 1100, topic: "Sorting", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1264B", note: "Divide by smallest prime; LIS variant" },

  // Rating 1200 (15 problems)
  { id: "cp-061", title: "Shawarma Machine", rating: 1200, topic: "Binary Search", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1705B", note: "Check if profit feasible" },
  { id: "cp-062", title: "Nezzar and Lucky Number", rating: 1200, topic: "Constructive Algorithms", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1478B", note: "Subtract 4s/7s from d" },
  { id: "cp-063", title: "Tokitsukaze and Dice", rating: 1200, topic: "Combinatorics", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1363A", note: "Count matching faces" },
  { id: "cp-064", title: "Mike and Strings", rating: 1200, topic: "Strings", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/798B", note: "Shift all strings same amount; check match" },
  { id: "cp-065", title: "Maximum Distance", rating: 1200, topic: "Greedy", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1B", note: "Binary search on answer" },
  { id: "cp-066", title: "Ternary XOR", rating: 1200, topic: "Constructive Algorithms", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1328B", note: "Build strings greedily" },
  { id: "cp-067", title: "Prefix Function", rating: 1200, topic: "Strings", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1B", note: "KMP prefix function applications" },
  { id: "cp-068", title: "Grid Coloring", rating: 1200, topic: "Constructive Algorithms", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1715B", note: "Fill row by row with valid color" },
  { id: "cp-069", title: "Integral Madness", rating: 1200, topic: "Maths", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1748C", note: "Track divisibility" },
  { id: "cp-070", title: "Count of Triangles", rating: 1200, topic: "Two Pointer", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1B", note: "Sort and count valid triplets" },
  { id: "cp-071", title: "The Unique Digit", rating: 1200, topic: "Constructive Algorithms", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1300A", note: "Build smallest number with condition" },
  { id: "cp-072", title: "String Compression", rating: 1200, topic: "Strings", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1282B", note: "Use KMP period" },
  { id: "cp-073", title: "Balance the Array", rating: 1200, topic: "Greedy", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1B", note: "Swap pairs greedily" },
  { id: "cp-074", title: "Beautiful Table", rating: 1200, topic: "Constructive Algorithms", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1276A", note: "Fill so no equal adjacent in row" },
  { id: "cp-075", title: "Partial Sums", rating: 1200, topic: "Prefix Sum", tags: [], codeforcesLink: "https://codeforces.com/problemset/problem/1B", note: "Repeated application of prefix sum" },
];
