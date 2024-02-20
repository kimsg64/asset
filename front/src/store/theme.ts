import { create } from "zustand";

interface themeState {
	isDarkMode: boolean;
	setIsDarkMode(isDarkMode: boolean): void;
}

console.log("isDarkMode", window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
export const useThemeStore = create<themeState>((set) => ({
	isDarkMode: window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches,
	setIsDarkMode(isDarkMode: boolean) {
		set({ isDarkMode });
	},
}));
