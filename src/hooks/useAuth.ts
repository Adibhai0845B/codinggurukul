import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  username?: string;
  token?: string; 
  userRole?: 'registered' | 'enrolled'; // Add this
  login: (username: string, token: string, role: 'registered' | 'enrolled') => void; // Update this
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      username: undefined,
      token: undefined,
      userRole: undefined, // Add this
      
      login: (username: string, token: string, role: 'registered' | 'enrolled') => {
        set({ isLoggedIn: true, username, token, userRole: role });
      },
      
      logout: () => {
        set({ isLoggedIn: false, username: undefined, token: undefined, userRole: undefined });
        localStorage.removeItem("coding-gurukul-progress-storage");
        localStorage.removeItem("coding-gurukul-auth");
      },
    }),
    {
      name: "coding-gurukul-auth",
    }
  )
);

export default useAuth; 