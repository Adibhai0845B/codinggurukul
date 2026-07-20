import { create } from "zustand";

const CONTEST_ADMIN_USERNAME = "contest12";
const CONTEST_ADMIN_PASSWORD = "pass12";
const SESSION_KEY = "coding-gurukul-contest-admin";

type ContestAdminAuth = {
  isContestAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

export const useContestAdminAuth = create<ContestAdminAuth>((set) => ({
  isContestAdmin: sessionStorage.getItem(SESSION_KEY) === "authenticated",
  login: (username, password) => {
    const isValid = username === CONTEST_ADMIN_USERNAME && password === CONTEST_ADMIN_PASSWORD;
    if (isValid) {
      sessionStorage.setItem(SESSION_KEY, "authenticated");
      set({ isContestAdmin: true });
    }
    return isValid;
  },
  logout: () => {
    sessionStorage.removeItem(SESSION_KEY);
    set({ isContestAdmin: false });
  },
}));
