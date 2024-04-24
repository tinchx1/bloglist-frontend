import { create } from 'zustand'

export const useUsersStore = create((set) => ({
  user: 'pee',
  setUser: (user) => set({ user })
}))
