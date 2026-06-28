import { DSAQuestion, dsaQuestions } from "@/data/dsaQuestions";

export interface RoadmapNode {
  id: string;
  label: string;
  total: number;
  completed: number;
  position: { x: number; y: number };
}

export const getRoadmapGraphData = (completedIds: string[]) => {
  const allTopics: RoadmapNode[] = [
    { id: "Arrays", label: "Arrays & Two Pointer", total: 15, completed: 0, position: { x: 400, y: 0 } },
    { id: "Strings", label: "Strings", total: 10, completed: 0, position: { x: 200, y: 150 } },
    { id: "Hashing", label: "Hashing", total: 8, completed: 0, position: { x: 600, y: 150 } },
    { id: "Searching", label: "Searching & Sorting", total: 10, completed: 0, position: { x: 100, y: 300 } },
    { id: "BinarySearch", label: "Binary Search", total: 10, completed: 0, position: { x: 300, y: 300 } },
    { id: "Recursion", label: "Recursion & Backtracking", total: 12, completed: 0, position: { x: 500, y: 300 } },
    { id: "LinkedList", label: "Linked List", total: 10, completed: 0, position: { x: 700, y: 300 } },
    { id: "Stack", label: "Stack & Queue", total: 12, completed: 0, position: { x: 200, y: 450 } },
    { id: "SlidingWindow", label: "Sliding Window", total: 10, completed: 0, position: { x: 400, y: 450 } },
    { id: "Tree", label: "Tree & BST", total: 15, completed: 0, position: { x: 600, y: 450 } },
    { id: "Heap", label: "Heap & Priority Queue", total: 8, completed: 0, position: { x: 150, y: 600 } },
    { id: "Graph", label: "Graph", total: 15, completed: 0, position: { x: 350, y: 600 } },
    { id: "DP", label: "Dynamic Programming", total: 15, completed: 0, position: { x: 550, y: 600 } },
    { id: "Greedy", label: "Greedy", total: 8, completed: 0, position: { x: 750, y: 600 } },
    { id: "Trie", label: "Trie & Bit Manipulation", total: 7, completed: 0, position: { x: 250, y: 750 } },
    { id: "Advanced", label: "Segment Tree / Advanced", total: 5, completed: 0, position: { x: 450, y: 750 } },
  ];

  // Logic to inject dynamic progress
  return allTopics.map(node => {
      const topicQuestions = dsaQuestions.filter(q => q.topic === node.label || q.topic === node.id);
      const completed = topicQuestions.filter(q => completedIds.includes(q.id)).length;
      return { ...node, completed };
  });
};

export const roadmapEdges = [
  // Level 1: Root
  { id: "e1", source: "Arrays", target: "Strings" },
  { id: "e2", source: "Arrays", target: "Hashing" },

  // Level 2: Branching from Strings/Hashing
  { id: "e3", source: "Strings", target: "Searching" },
  { id: "e4", source: "Strings", target: "BinarySearch" },
  { id: "e5", source: "Hashing", target: "Recursion" },
  { id: "e6", source: "Hashing", target: "LinkedList" },

  // Level 3: Connecting to core data structures
  { id: "e7", source: "Searching", target: "Stack" },
  { id: "e8", source: "BinarySearch", target: "Stack" },
  { id: "e9", source: "Recursion", target: "SlidingWindow" },
  { id: "e10", source: "Recursion", target: "Tree" },
  { id: "e11", source: "LinkedList", target: "Tree" },

  // Level 4: Advanced structures
  { id: "e12", source: "Stack", target: "Heap" },
  { id: "e13", source: "Stack", target: "Graph" },
  { id: "e14", source: "SlidingWindow", target: "Graph" },
  { id: "e15", source: "Tree", target: "DP" },
  { id: "e16", source: "Tree", target: "Greedy" },

  // Level 5: Final topics
  { id: "e17", source: "Heap", target: "Trie" },
  { id: "e18", source: "Graph", target: "Trie" },
  { id: "e19", source: "DP", target: "Advanced" },
  { id: "e20", source: "Greedy", target: "Advanced" }
  
];