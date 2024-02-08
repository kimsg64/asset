import { create } from "zustand";

interface ModalState {
    isOverflowHidden: boolean;
    setIsOverflowHidden(isOverflowHidden: boolean): void;
    reset(): void;
}

export const useModalStore = create<ModalState>((set) => ({
    isOverflowHidden: false,
    setIsOverflowHidden(isOverflowHidden) {
        set({ isOverflowHidden });
    },
    reset() {
        set({ isOverflowHidden: false });
    },
}));
