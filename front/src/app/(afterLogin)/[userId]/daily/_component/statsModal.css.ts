import { global } from "@/app/globalTheme.css";
import { style } from "@vanilla-extract/css";

export const modalBody = style({
	width: "92dvw",
	height: "92dvh",
	padding: 80,
});
export const filterContainer = style({
	width: "100%",
	marginBottom: "2rem",
	paddingTop: "2rem",
	borderTop: `1px solid ${global.foreground.color}`,
	display: "flex",
	gap: 8,
	alignItems: "center",
});
export const filterName = style({
	flexBasis: "12%",
	textAlign: "center",
});
export const calendar = style({
	width: 200,
	fontFamily: "Malgun Gothic",
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
export const rightSection = style({ flexGrow: 1, textAlign: "right" });
export const assetsContainer = style({
	...itemContainer,
	flexWrap: "wrap",
});
const button = {
	width: "fit-content",
	height: "2.4rem",
	margin: 0,
};
export const periodButton = style({
	...button,
	padding: "8px 20px",
	backgroundColor: global.itemBackground.color,
});
export const relativeLabel = style({
	width: "fit-content",
	position: "relative",
});
export const hiddenCheckbox = style({
	width: "100%",
	height: "100%",
	opacity: 0,
	cursor: "pointer",
	position: "absolute",
	zIndex: 10,
	left: 0,
	top: 0,
});
export const assetButton = style({
	...button,
});
