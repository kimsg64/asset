import { global } from "@/app/globalTheme.css";
import { style } from "@vanilla-extract/css";

export const form = style({
	width: "100%",
	marginBottom: 40,
	display: "flex",
	justifyContent: "flex-end",
	alignItems: "center",
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
export const formButton = style({
	maxWidth: 120,
	margin: 0,
	backgroundColor: global.foreground.color,
});
export const coloredInput = style({
	"::placeholder": {
		color: global.font.color.base,
	},
});
