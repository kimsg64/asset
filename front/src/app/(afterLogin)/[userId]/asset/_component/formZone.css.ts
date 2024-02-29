import { global } from "@/app/globalTheme.css";
import { style } from "@vanilla-extract/css";

export const form = style({
	width: "80dvw",
	marginTop: 40,
	display: "flex",
	justifyContent: "flex-start",
	gap: 40,
});
export const formInputWrapper = style({
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
});
export const grownFormInputWrapper = style({
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	flexGrow: 1,
});
export const formInputLabel = style({
	width: "4rem",
});
export const coloredInput = style({
	"::placeholder": {
		color: global.font.color.base,
	},
});
export const grownFormInput = style({
	flexGrow: 1,
	"::placeholder": {
		color: global.font.color.base,
	},
});
export const formButton = style({
	maxWidth: 120,
	margin: 0,
	backgroundColor: global.foreground.color,
	":hover": {
		backgroundColor: global.itemBackground.color,
	},
	":active": {
		backgroundColor: global.foreground.color,
	},
});
export const navigateButton = style({
	width: "12rem",
	marginLeft: 12,
	padding: "4px 20px",
	fontWeight: "bold",
	textAlign: "center",
	cursor: "pointer",
	backgroundColor: global.background.color,
	transition: "background-color 0.2s",
	border: `2px solid ${global.foreground.color}`,
	borderRadius: 4,
	":hover": {
		backgroundColor: global.itemBackground.color,
	},
	":active": {
		backgroundColor: global.foreground.color,
	},
});
