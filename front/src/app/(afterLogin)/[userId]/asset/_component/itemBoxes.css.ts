import { global } from "@/app/globalTheme.css";
import { style } from "@vanilla-extract/css";
const commonAmount = {
	fontSize: "2rem",
	fontWeight: "bold",
};
const commonBox = {
	width: "100%",
	height: "32dvh",
};

export const gridZone = style({
	width: "80dvw",
	padding: "40px 0",
	display: "grid",
	gridTemplateColumns: "1fr 1fr 1fr",
	gap: 40,
});
export const chartWrapper = style({
	...commonBox,
});
export const itemBox = style({
	...commonBox,
	padding: 20,
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	alignItems: "center",
	textAlign: "left",
	backgroundColor: global.itemBackground.color,
	borderRadius: 12,
});
export const infoZone = style({
	width: "100%",
	position: "relative",
});
export const assetName = style({
	fontSize: "1.2rem",
	fontWeight: 700,
});
export const amount = style({
	...commonAmount,
});
export const amountMinus = style({
	...commonAmount,
	color: global.font.color.red,
});
export const amountPlus = style({
	...commonAmount,
	color: global.font.color.blue,
});
export const description = style({
	fontSize: "0.8rem",
	color: global.font.color.gray,
});
export const closeButton = style({
	width: 24,
	height: 24,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	position: "absolute",
	top: 0,
	right: 0,
	":hover": {
		cursor: "pointer",
		backgroundColor: "rgba(15, 20, 25, 0.1)",
	},
});
export const closeButtonInner = style({
	width: 20,
	height: 20,
});
export const itemBoxInput = style({
	width: "100%",
	backgroundColor: global.background.color,
});
export const buttonsZone = style({
	width: "100%",
	display: "flex",
	gap: 12,
	marginTop: 20,
});
export const button = style({
	flexGrow: 1,
});

export const totalZone = style({
	width: "100%",
	padding: "0 20px",
	display: "flex",
	justifyContent: "flex-end",
	alignItems: "center",
	gap: 40,
});
