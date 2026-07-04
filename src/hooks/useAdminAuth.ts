import { create } from 'zustand';

interface AdminAuthState {
  isAdminLoggedIn: boolean;
  adminToken: string | null;
  loginAdmin: (token: string) => void;
  logoutAdmin: () => void;
}

export const useAdminAuth = create<AdminAuthState>((set) => ({
  isAdminLoggedIn: !!localStorage.getItem('adminToken'),
  adminToken: localStorage.getItem('adminToken'),
  
  loginAdmin: (token: string) => {
    localStorage.setItem('adminToken', token);
    set({ isAdminLoggedIn: true, adminToken: token });
  },
  
  logoutAdmin: () => {
    localStorage.removeItem('adminToken');
    set({ isAdminLoggedIn: false, adminToken: null });
  },
}));