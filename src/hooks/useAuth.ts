import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  username?: string;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}
const VALID_USERNAME = "dsa_user";
const VALID_PASSWORD = "dsa_pass";

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      username: undefined,
      login: (username: string, password: string) => {
        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
          set({ isLoggedIn: true, username });
          return true;
        }
        return false;
      },
      logout: () => set({ isLoggedIn: false, username: undefined }),
    }),
    {
      name: "codeshala-auth",
    }
  )
);

export default useAuth;
