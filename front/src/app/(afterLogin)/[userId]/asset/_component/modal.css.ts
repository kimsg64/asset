import { global } from "@/app/globalTheme.css";
import { style } from "@vanilla-extract/css";

export const modalBackdrop = style({
	width: "100dvw",
	height: "100dvh",
	background: "rgba(0, 0, 0, 0.3)",
	position: "fixed",
	zIndex: 10,
	top: 0,
	left: 0,
});
export const modalBody = style({
	width: 600,
	padding: 32,
	background: global.background.color,
	position: "relative",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
});

export const alert = style({
	marginBottom: 20,
	fontWeight: "bold",
});

export const selectBox = style({
	marginTop: 8,
	padding: "8px 12px",
});
export const textarea = style({
	fontFamily: "Malgun Gothic",
	width: "100%",
	minHeight: 100,
	marginTop: 24,
	marginBottom: 12,
});
export const buttonsZone = style({
	display: "flex",
	gap: 12,
});
