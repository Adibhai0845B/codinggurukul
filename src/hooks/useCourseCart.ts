import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Course } from "@/data/courses";

type CourseCartState = {
  items: Course[];
  addCourse: (course: Course) => boolean;
  hasCourse: (courseId: string) => boolean;
};

export const useCourseCart = create<CourseCartState>()(
  persist(
    (set, get) => ({
      items: [],
      addCourse: (course) => {
        if (get().items.some((item) => item.id === course.id)) {
          return false;
        }

        set((state) => ({
          items: [...state.items, course],
        }));
        return true;
      },
      hasCourse: (courseId) =>
        get().items.some((item) => item.id === courseId),
    }),
    {
      name: "coding-gurukul-course-cart",
    }
  )
);
