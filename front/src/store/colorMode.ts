import { create } from "zustand";

interface colorModeState {
	isDarkMode: boolean;
	setIsDarkMode(isDarkMode: boolean): void;
}

export const useColorModeStore = create<colorModeState>((set) => ({
	isDarkMode: false,
	setIsDarkMode(isDarkMode: boolean) {
		set({ isDarkMode });
	},
}));
