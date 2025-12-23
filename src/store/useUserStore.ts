import type { UserState } from "@template/types/store.interface";
import { create } from "zustand";

export const useUserStore = create<UserState>((set) => ({
  userData: {},
  updation: (data) =>
    set((state) => ({
      userData: {
        ...state.userData,
        ...data,
      },
    })),
}));
