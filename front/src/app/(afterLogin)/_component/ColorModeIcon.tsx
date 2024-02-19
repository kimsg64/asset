"use client";

import { useColorModeStore } from "@/store/colorMode";
import * as styles from "./afterLogin.css";

export default function ColorModeIcon() {
	const colorModeStore = useColorModeStore();
	const onClickLightMode = () => colorModeStore.setIsDarkMode(false);
	const onClickDarkMode = () => colorModeStore.setIsDarkMode(true);

	return (
		<>
			{colorModeStore.isDarkMode ? (
				<button onClick={onClickLightMode} className={styles.icon}>
					☀️
				</button>
			) : (
				<button onClick={onClickDarkMode} className={styles.icon}>
					🌙
				</button>
			)}
		</>
	);
}
