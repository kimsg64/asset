"use client";

import { useThemeStore } from "@/store/theme";

type Props = { children: React.ReactNode };

export default function ThemeProvider({ children }: Props) {
	const themeStore = useThemeStore();
	return <body className={themeStore.isDarkMode ? `dark` : `light`}>{children}</body>;
}
