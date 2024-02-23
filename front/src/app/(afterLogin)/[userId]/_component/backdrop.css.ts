import { global } from "@/app/globalTheme.css";
import { style } from "@vanilla-extract/css";

export const modalBackdrop = style({
	background: "rgba(0, 0, 0, 0.3)",
	position: "fixed",
	zIndex: 10,
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
});
export const modalBodyWrapper = style({
	width: "fit-content",
	padding: 32,
	background: global.background.color,
	position: "relative",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
});
