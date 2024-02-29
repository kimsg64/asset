import { style } from "@vanilla-extract/css";
import { global } from "../globalTheme.css";

export const form = style({
	width: "40%",
	display: "flex",
	marginTop: "20vh",
	flexDirection: "column",
	justifyContent: "center",
});
export const formTitle = style({
	fontSize: "2rem",
	marginBottom: "4rem",
});
export const formInputWrapper = style({
	marginBottom: 20,
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	gap: 20,
});
export const readonly = style({
	padding: "8px 12px",
});
export const inputContainer = style({
	position: "relative",
	flexGrow: 1,
});
export const fileUploadInput = style({
	width: "100%",
	height: "6rem",
});
export const previewContainer = style({
	width: "3.2rem",
	height: "3.2rem",
	borderRadius: "50%",
	overflow: "hidden",
	position: "absolute",
	left: "50%",
	top: "50%",
	transform: "translate(-50%, -20%)",
	backgroundPosition: "center",
});
export const cropperContainer = style({
	minHeight: "6rem",
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-end",
	gap: 12,
});
export const cropTargetContainer = style({});
export const smallButtonsContainer = style({
	display: "flex",
	gap: 12,
});
export const smallButton = style({
	margin: 0,
	backgroundColor: global.itemBackground.color,
});
export const button = style({
	padding: 12,
	backgroundColor: global.foreground.color,
});
export const formMessage = style({
	color: global.font.color.red,
	fontWeight: "bold",
});
