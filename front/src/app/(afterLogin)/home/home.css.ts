import { global } from "@/app/globalTheme.css";
import { style } from "@vanilla-extract/css";

export const title = style({
	textAlign: "center",
	marginBottom: 40,
});
export const part = style({
	margin: "1.2rem 0",
	padding: "1rem 2rem",
	display: "grid",
	gap: "1.5rem",
	border: `1px solid ${global.foreground.color}`,
	borderRadius: 4,
});
export const subtitle = style({
	fontWeight: "bold",
	color: global.foreground.color,
});
export const list = style({
	margin: "0.8rem 0",
	padding: "0 0.8rem",
});
export const listTitle = style({
	marginBottom: 4,
});
export const listItem = style({
	padding: "0 0.8rem",
	"::before": {
		content: "✔️",
		display: "inline-block",
		marginRight: 4,
	},
	marginBottom: 2,
});
export const description = style({
	fontSize: "0.8rem",
	marginLeft: 40,
});
export const todo = style({
	color: global.font.color.red,
});
export const done = style({
	textDecoration: "line-through",
});
