import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  notification: null,
  setNotification: (notification) => set({ notification }),
  clearNotification: () => set({ notification: null })
}))
