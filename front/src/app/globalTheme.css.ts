import { assignVars, createGlobalTheme, createGlobalThemeContract, createTheme, createThemeContract, globalStyle, style } from "@vanilla-extract/css";

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

const themeStructure = {
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
};
export const global = createGlobalThemeContract({ ...themeStructure });
// export const theme = createThemeContract({ ...themeStructure });
const darkTheme = {
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
const lightTheme = {
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

// global theme: 브라우저의 모드를 체크하여 theme 전환
createGlobalTheme(":root", global, lightTheme);
globalStyle(":root", {
	"@media": {
		"(prefers-color-scheme: dark)": {
			vars: assignVars(global, darkTheme),
		},
	},
});
globalStyle("html", {
	"@media": {
		"(prefers-color-scheme: dark)": {
			colorScheme: "dark",
		},
	},
});

// local theme: JS로 theme을 제어
// createTheme(theme, lightTheme);
// createTheme(theme, darkTheme);

// theme 외의 공통 스타일
globalStyle("*", {
	boxSizing: "border-box",
	padding: 0,
	margin: 0,
	wordBreak: "keep-all",
	transition: "background-color 0.3s, color 0.3s",
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
const inputStyle = {
	padding: "8px 12px",
	outline: "none",
	border: "none",
	backgroundColor: global.itemBackground.color,
	borderRadius: 4,
};
globalStyle("input", { ...inputStyle });
globalStyle("textarea", { ...inputStyle });
globalStyle("select", { ...inputStyle });
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
