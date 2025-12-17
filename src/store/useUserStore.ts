import type { UserState } from "@template/interface/store.interface";
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
