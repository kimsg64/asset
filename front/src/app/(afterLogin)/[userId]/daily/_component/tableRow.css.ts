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
export const formRow = style({
	padding: 8,
	backgroundColor: global.itemBackground.color,
	borderBottom: `1px solid #ffffff`,
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
export const flexCell = style({
	display: "flex",
	gap: 4,
});
export const buttonInCell = style({
	flexGrow: 1,
	margin: 0,
});
export const noData = style({
	textAlign: "center",
	padding: "12rem",
	fontSize: "4rem",
	backgroundColor: global.itemBackground.color,
});
export const reverseButton = style({
	backgroundColor: global.itemBackground.color,
});
