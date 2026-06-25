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
};

export const courses: Course[] = [
  {
    id: "pro-batch",
    title: "Pro Batch",
    subtitle: "Placement Accelerator Program",
    desc: "For students who know basics and want to master DSA, CP and crack coding rounds.",
    price: "Rs. 3,499",
    originalPrice: "Rs. 15,000",
    amountPaise: 349900,
    duration: "45 Days",
    image: "/courses/pro-batch.svg",
    tag: "New Launch",
    features: [
      "Complete roadmap",
      "Dedicated sheet questions",
      "Live classes and doubt support",
      "Advanced DSA and CP practice",
      "Mock tests",
      "Company interview preparation",
      "Resume and profile building",
      "Certificate of completion",
    ],
  },
  {
    id: "foundation-batch",
    title: "Foundation Batch",
    subtitle: "Placement Accelerator Program",
    desc: "For beginners and students who want to build strong programming and DSA fundamentals.",
    price: "Rs. 2,799",
    originalPrice: "Rs. 10,000",
    amountPaise: 279900,
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
  },
];
