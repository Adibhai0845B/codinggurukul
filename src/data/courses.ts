export type Course = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  price: string;
  originalPrice?: string;
  amountPaise: number;
  duration: string;
  launchDate: string;
  image: string;
  tag: string;
  features: string[];
};

export const courses: Course[] = [
  {
    id: "pro-batch",
    title: "Pro Batch",
    subtitle: "Advanced DSA + CP Track",
    desc: "For students who already know programming basics and want advanced DSA, competitive programming, contest practice and high-volume problem solving for coding rounds.",
    price: "Rs. 2,999",
    originalPrice: "Rs. 15,000",
    amountPaise: 299900,
    duration: "45 Days",
    launchDate: "25th July",
    image: "/courses/pro-batch.svg",
    tag: "New Launch",
    features: [
      "Advanced DSA patterns",
      "Competitive programming up to rated problems",
      "Daily problem-solving drills",
      "Codeforces, CodeChef and LeetCode practice",
      "Timed contests and mock OAs",
      "Greedy, DP, graph and binary search mastery",
      "Debugging and optimization sessions",
      "Interview-level explanation practice",
      "Certificate of completion",
    ],
  },
  {
    id: "foundation-batch",
    title: "Foundation Batch",
    subtitle: "Placement Accelerator Program",
    desc: "For beginners and students who want to build strong programming and DSA fundamentals.",
    price: "Rs. 2,399",
    originalPrice: "Rs. 10,000",
    amountPaise: 239900,
    duration: "2 Months",
    launchDate: "25th July",
    image: "/courses/foundation-batch.svg",
    tag: "New Launch",
    features: [
      "Complete roadmap",
      "Dedicated sheet questions",
      "Live classes and doubt support",
      "DSA from basics",
      "Practice and assignments",
      "Weekly contests",
      "Interview preparation",
      "Certificate of completion",
    ],
  },
  {
    id: "dsa-cp-sheet",
    title: "Dedicated DSA & CP Sheet",
    subtitle: "Company Oriented",
    desc: "Perfect for students preparing for placements, coding rounds and interview practice.",
    price: "Rs. 299",
    amountPaise: 29900,
    duration: "Lifetime Access",
    launchDate: "25th July",
    image: "/courses/dsa-cp-sheet.svg",
    tag: "Affordable Access",
    features: [
      "Topic-wise DSA questions",
      "CP practice problems",
      "Company-oriented sheet",
      "Curated questions",
      "OA and interview focus",
      "Solutions and explanations",
    ],
  },
];
