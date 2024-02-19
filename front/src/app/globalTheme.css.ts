import { assignVars, createGlobalTheme, createGlobalThemeContract, globalStyle } from "@vanilla-extract/css";

const darkBaseColor = "#2c3e50";
const lightBaseColor = "#dee8f1";
const brandColor = "#f1c40f";

const lightItemBaseColor = "#f0f0f0";
const darkItemBaseColor = "#5a7086";

const lightFontBaseColor = darkBaseColor;
const darkFontBaseColor = "#fff9e0";
const fontBlueColor = "#9191ff";
const fontRedColor = "#ff7f7f";

const lightFontGrayColor = "#7f7f7f";
const darkFontGrayColor = darkBaseColor;

export const global = createGlobalThemeContract({
	background: {
		color: "bg-color",
	},
	foreground: {
		color: "fg-color",
	},
	itemBackground: {
		color: "item-bg-color",
	},
	font: {
		color: {
			base: "base",
			red: "red",
			blue: "blue",
			gray: "gray",
		},
	},
});
const darkGlobalTheme = {
	background: { color: darkBaseColor },
	foreground: { color: brandColor },
	itemBackground: { color: darkItemBaseColor },
	font: {
		color: {
			base: darkFontBaseColor,
			red: fontRedColor,
			blue: fontBlueColor,
			gray: darkFontGrayColor,
		},
	},
};
const lightGlobalTheme = {
	background: { color: lightBaseColor },
	foreground: { color: brandColor },
	itemBackground: { color: lightItemBaseColor },
	font: {
		color: {
			base: lightFontBaseColor,
			red: fontRedColor,
			blue: fontBlueColor,
			gray: lightFontGrayColor,
		},
	},
};
createGlobalTheme(":root", global, lightGlobalTheme);
globalStyle(":root", {
	"@media": {
		"(prefers-color-scheme: dark)": {
			vars: assignVars(global, darkGlobalTheme),
		},
	},
});
globalStyle("*", {
	boxSizing: "border-box",
	padding: 0,
	margin: 0,
	wordBreak: "keep-all",
});
globalStyle("html", {
	"@media": {
		"(prefers-color-scheme: dark)": {
			colorScheme: "dark",
		},
	},
});
globalStyle("html, body", {
	maxWidth: "100dvw",
	overflowX: "hidden",
});
globalStyle("body", {
	backgroundColor: global.background.color,
	color: global.font.color.base,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
});
globalStyle("a", {
	color: "inherit",
	textDecoration: "none",
});
const globalInputStyle = {
	padding: "8px 12px",
	outline: "none",
	border: "none",
	backgroundColor: global.itemBackground.color,
	borderRadius: 4,
};
globalStyle("input", { ...globalInputStyle });
globalStyle("textarea", { ...globalInputStyle });
globalStyle("select", { ...globalInputStyle });
globalStyle("label", {
	width: 120,
	display: "inline-block",
});
globalStyle("button", {
	width: "100%",
	marginBottom: 4,
	padding: "8px",
	fontWeight: "bold",
	cursor: "pointer",
	backgroundColor: global.foreground.color,
	border: "none",
	borderRadius: 4,
});
globalStyle("li", {
	listStyle: "none",
});
