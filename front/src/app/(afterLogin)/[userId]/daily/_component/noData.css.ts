import { global } from "@/app/globalTheme.css";
import { style } from "@vanilla-extract/css";

export const noData = style({
	width: "100%",
	padding: "12rem",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	fontSize: "4rem",
	backgroundColor: global.itemBackground.color,
});
