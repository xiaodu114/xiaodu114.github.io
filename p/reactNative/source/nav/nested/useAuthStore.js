import { create } from 'zustand';

export const useAuthStore = create(set => ({
  isAuthenticated: false,
  token: null,

  // 登录成功
  login: token => set({ isAuthenticated: true, token }),

  // 退出登录
  logout: () => set({ isAuthenticated: false, token: null }),
}));
