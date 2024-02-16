import { style } from "@vanilla-extract/css";
const commonRow = {
	padding: 8,
	display: "grid",
	alignItems: "center",
	gridTemplateColumns: "1fr 1fr 1fr 2fr 4fr 1fr",
	border: "1px solid black",
	borderBottom: "none",
};
export const row = style({
	...commonRow,
	textAlign: "center",
});
export const header = style({
	...commonRow,
	fontWeight: "bold",
	textAlign: "center",
});
export const deficit = style({
	color: "red",
});
export const surplus = style({
	color: "blue",
});
