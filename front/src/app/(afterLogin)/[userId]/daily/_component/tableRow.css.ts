import { global } from "@/app/globalTheme.css";
import { style } from "@vanilla-extract/css";
const commonRow = {
	padding: 8,
	display: "grid",
	alignItems: "center",
	gridTemplateColumns: "1fr 1fr 1fr 2fr 4fr 1fr",
	backgroundColor: global.itemBackground.color,
	borderBottom: `1px solid #ffffff`,
};
export const row = style({
	...commonRow,
	textAlign: "center",
});
export const header = style({
	...commonRow,
	fontWeight: "bold",
	textAlign: "center",
	backgroundColor: global.foreground.color,
	borderTopLeftRadius: 4,
	borderTopRightRadius: 4,
});
export const deficit = style({
	color: global.font.color.red,
});
export const surplus = style({
	color: global.font.color.blue,
});
export const smallButton = style({
	width: "80%",
});
