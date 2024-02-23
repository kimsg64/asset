import { IDailyInput } from "@/interfaces/IDaily";
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

interface updateModalState {
	rec: IDailyInput | null;
	setRec(rec: IDailyInput | null): void;
	reset(): void;
}

export const useUpdateModalStore = create<updateModalState>((set) => ({
	rec: null,
	setRec(rec) {
		set({ rec });
	},
	reset() {
		set({ rec: null });
	},
}));
