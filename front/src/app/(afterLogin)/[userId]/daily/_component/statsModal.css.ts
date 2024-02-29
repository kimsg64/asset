import { global } from "@/app/globalTheme.css";
import { style } from "@vanilla-extract/css";

export const modalBody = style({
	width: "92dvw",
	height: "92dvh",
	padding: 80,
});
export const filterContainer = style({
	width: "100%",
	padding: "2rem 0",
	borderTop: `1px solid ${global.foreground.color}`,
	display: "flex",
	gap: 8,
	alignItems: "center",
});
export const filterName = style({
	flexBasis: "12%",
	textAlign: "center",
});
const itemContainer = {
	flexGrow: 1,
	display: "flex",
	gap: 8,
	justifyContent: "flex-start",
	alignItems: "center",
};
export const periodContainer = style({
	...itemContainer,
});
const button = {
	width: "fit-content",
	height: "2.4rem",
	margin: 0,
	backgroundColor: global.itemBackground.color,
};
export const periodButton = style({
	...button,
	padding: "8px 20px",
});
export const rightSection = style({ flexGrow: 1, textAlign: "right" });
export const calendar = style({
	width: 200,
	fontFamily: "Malgun Gothic",
});

export const assetsContainer = style({
	...itemContainer,
	flexWrap: "wrap",
});
export const assetLabel = style({
	width: "fit-content",
	padding: "8px 20px",
	borderRadius: 4,
	backgroundColor: global.itemBackground.color,
	":hover": { cursor: "pointer" },
});
export const checked = style({
	backgroundColor: global.foreground.color,
});
export const assetRadio = style({
	display: "none",
});
export const dataSection = style({
	width: "100%",
	height: "60dvh",
	padding: "4rem",
	borderTop: `1px solid ${global.foreground.color}`,
	display: "flex",
	gap: 40,
});
export const tableWrapper = style({
	flexBasis: "50%",
	paddingRight: 2,
	overflowY: "auto",
});
export const chartWrapper = style({
	flexBasis: "50%",
	display: "flex",
	justifyContent: "center",
});
