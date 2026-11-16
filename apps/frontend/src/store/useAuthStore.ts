import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const savedToken = localStorage.getItem('edumanage_token');
  const savedUser = localStorage.getItem('edumanage_user');

  return {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken || null,
    isAuthenticated: !!savedToken,
    isLoading: false,

    setAuth: (user, token) => {
      localStorage.setItem('edumanage_token', token);
      localStorage.setItem('edumanage_user', JSON.stringify(user));
      set({ user, token, isAuthenticated: true });
    },

    setUser: (user) => {
      localStorage.setItem('edumanage_user', JSON.stringify(user));
      set({ user });
    },

    logout: () => {
      localStorage.removeItem('edumanage_token');
      localStorage.removeItem('edumanage_user');
      set({ user: null, token: null, isAuthenticated: false });
    },
  };
});

