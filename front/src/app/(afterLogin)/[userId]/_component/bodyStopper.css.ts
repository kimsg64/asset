import { style } from "@vanilla-extract/css";

export const normal = style({
	// width: "80dvw",
	padding: 20,
});
export const hidden = style({
	// width: "80dvw",
	height: "calc(100dvh - 60px)",
	padding: 20,
	overflowY: "hidden",
});
