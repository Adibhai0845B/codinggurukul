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
  idealFor: string;
  outcome: string;
  prerequisites: string;
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
    image: "/courses/bootcamp-batch.png",
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
    idealFor: "Students starting DSA or restarting placement preparation",
    outcome: "A clear DSA foundation and a practical next-step study plan",
    prerequisites: "Basic familiarity with any programming language",
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
    image: "/courses/pro-batch.svg",
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
    idealFor: "Students comfortable with programming basics who want stronger coding-round performance",
    outcome: "Advanced problem-solving ability, contest discipline and interview-ready explanations",
    prerequisites: "Programming fundamentals and familiarity with basic DSA",
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
    level: "Beginner",
    format: "Live online classes",
    idealFor: "Beginners who need a structured path from programming fundamentals to placement DSA",
    outcome: "Strong fundamentals, consistent practice habits and placement-focused preparation",
    prerequisites: "No prior DSA experience required",
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
    level: "All levels",
    format: "Self-paced practice",
    idealFor: "Independent learners preparing for online assessments and technical interviews",
    outcome: "A focused, repeatable practice system for DSA and competitive programming",
    prerequisites: "Ability to write basic programs in any language",
  },
];
