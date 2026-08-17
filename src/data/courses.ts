export type Course = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  price: string;
  originalPrice?: string;
  amountPaise: number;
  duration: string;
  image: string;
  tag: string;
  features: string[];
  level: string;
  format: string;
  mentor?: { name: string; role: string; image: string };
};
export const courses: Course[] = [
  {
    id: "bootcamp-batch",
    title: "Bootcamp Batch",
    subtitle: "10-Day DSA + Placement Certification Internship Program",
    desc: "A focused certification internship course to help you begin DSA with clarity, practise the right way and build a confident next-step roadmap.",
    price: "Rs. 299",
    originalPrice: "Rs. 799",
    amountPaise: 29900,
    duration: "10 Days",
    image: "/courses/bootcamp-batch-v2.jpg",
    tag: "New Launch",
    features: [
      "Certification internship course",
      "DSA roadmap",
      "Problem-solving approach",
      "Arrays and strings",
      "Two pointers and hashing",
      "Recursion basics",
      "Mini contest and career guidance",
    ],
    level: "Beginner",
    format: "Live online classes",
    mentor: { name: "Harsh Lakhra", role: "DSA Mentor", image: "/team/harsh-lakhra.png" },
  },
  {
    id: "pro-batch",
    title: "Pro Batch",
    subtitle: "Advanced DSA + CP Track",
    desc: "For students who already know programming basics and want advanced DSA, competitive programming, contest practice and high-volume problem solving for coding rounds.",
    price: "Rs. 2,999",
    originalPrice: "Rs. 15,000",
    amountPaise: 299900,
    duration: "45 Days",
    image: "/courses/pro-batch-v2.jpg",
    tag: "New Launch",
    features:[
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
    level: "Intermediate to advanced",
    format: "Live classes, contests and reviews",
    mentor: { name: "Shivam", role: "DSA and Competitive Programming Mentor", image: "/team/shivamt.png" },
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
    image: "/courses/foundation-batch-v2.jpg",
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
    level: "Beginner",
    format: "Live online classes",
    mentor: { name: "Aryan Tiwari", role: "DSA Mentor", image: "/team/aryan-tiwari.png" },
  },
  {
    id: "dsa-cp-sheet",
    title: "Dedicated DSA & CP Sheet",
    subtitle: "Company Oriented",
    desc: "Perfect for students preparing for placements, coding rounds and interview practice.",
    price: "Rs. 299",
    amountPaise: 29900,
    duration: "Lifetime Access",
    image: "/courses/dsa-cp-sheet-v2.jpg",
    tag: "Affordable Access",
    features: [
      "Topic-wise DSA questions",
      "CP practice problems",
      "Company-oriented sheet",
      "Curated questions",
      "OA and interview focus",
      "Solutions and explanations",
    ],
    level: "All levels",
    format: "Self-paced practice",
  },
];
