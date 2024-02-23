import { global } from "@/app/globalTheme.css";
import { style } from "@vanilla-extract/css";

export const modalBody = style({
	width: 600,
	padding: 32,
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
	"::placeholder": {
		color: global.font.color.base,
	},
});
export const buttonsZone = style({
	display: "flex",
	gap: 12,
});
