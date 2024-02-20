"use client";

import { ReactNode } from "react";
import { useThemeStore } from "@/store/theme";

type Props = { children: ReactNode };

export default function ThemeProvider({ children }: Props) {
	const themeStore = useThemeStore();
	return <body className={themeStore.isDarkMode ? `dark` : `light`}>{children}</body>;
}
