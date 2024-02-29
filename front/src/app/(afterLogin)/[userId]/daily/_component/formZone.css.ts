import { global } from "@/app/globalTheme.css";
import { style } from "@vanilla-extract/css";

export const form = style({
	width: "80dvw",
	margin: "40px 0",
	display: "flex",
	justifyContent: "flex-start",
	gap: 20,
	position: "relative",
});
export const selectBox = style({
	padding: "8px 12px",
});
export const calendar = style({
	width: 200,
	fontFamily: "Malgun Gothic",
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
});
export const error = style({
	position: "absolute",
	top: 44,
	left: "50%",
	transform: "translateX(-50%)",
	fontSize: "1.5rem",
	fontWeight: "bold",
	color: "red",
});
