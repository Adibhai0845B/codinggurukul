import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  username?: string;
  token?: string; // We need to store the JWT for future requests
  login: (username: string, token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      username: undefined,
      token: undefined,
      
      // Called by Login.tsx after a successful backend API request
      login: (username: string, token: string) => {
        set({ isLoggedIn: true, username, token });
      },
      
      logout: () => {
        set({ isLoggedIn: false, username: undefined, token: undefined });
        // Clear progress from local storage so the next student doesn't see it!
        localStorage.removeItem("coding-gurukul-progress-storage");
        localStorage.removeItem("coding-gurukul-auth");// Clear auth state from local storage
      },
    }),
    {
      name: "coding-gurukul-auth", // Updated to the new brand name
    }
  )
);

export default useAuth;