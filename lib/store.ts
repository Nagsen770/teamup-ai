"use client";

import { create } from "zustand";

type AppState = {
  commandOpen: boolean;
  role: "PLAYER" | "TURF_OWNER" | "ADMIN";
  setCommandOpen: (open: boolean) => void;
  setRole: (role: AppState["role"]) => void;
};

export const useAppStore = create<AppState>((set) => ({
  commandOpen: false,
  role: "PLAYER",
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  setRole: (role) => set({ role })
}));
