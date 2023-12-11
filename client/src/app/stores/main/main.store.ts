import { create } from "zustand";

type AvailableThemes = "dark" | "light" | "bumblebee" | "dracula";

export type Store = {
  theme: AvailableThemes;
};

export type Action = {
  changeTheme: (theme: AvailableThemes) => void;
};

export const useMainStore = create<Store & Action>()((set) => ({
  theme: "dracula",
  changeTheme: (theme: AvailableThemes) => set({ theme: theme }),
}));
