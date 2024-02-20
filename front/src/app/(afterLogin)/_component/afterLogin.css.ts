import { style } from "@vanilla-extract/css";
import { global } from "@/app/globalTheme.css";

export const header = style({
	width: "100dvw",
	height: 60,
	padding: "0 12px",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	backgroundColor: global.foreground.color,
	color: global.font.color.base,
});
export const user = style({
	height: "100%",
	display: "flex",
	alignItems: "baseline",
});
export const thumbnail = style({
	width: 48,
	height: 48,
	margin: 6,
	":hover": {
		cursor: "pointer",
	},
});
export const username = style({
	fontSize: "1.2rem",
	fontWeight: "bold",
});
export const navContainer = style({
	display: "flex",
	alignItems: "center",
	gap: 12,
});
export const navItem = style({
	height: "100%",
});
export const icon = style({
	width: 48,
	height: 48,
	margin: 0,
	fontSize: "1.2rem",
});
