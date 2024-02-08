import { assignVars, createGlobalTheme, createGlobalThemeContract, globalStyle } from "@vanilla-extract/css";

export const global = createGlobalThemeContract({
    background: {
        color: "bg-color",
    },
    foreground: {
        color: "fg-color",
    },
});
const darkGlobalTheme = {
    background: {
        color: "rgb(0, 0, 0)",
    },
    foreground: {
        color: "rgb(255, 255, 255)",
    },
};
const lightGlobalTheme = {
    background: {
        color: "rgb(255, 255, 255)",
    },
    foreground: {
        color: "rgb(0, 0, 0)",
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
    color: global.foreground.color,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
});
globalStyle("a", {
    color: "inherit",
    textDecoration: "none",
});
globalStyle("input", {
    padding: "8px 12px",
});
globalStyle("label", {
    width: 120,
    display: "inline-block",
});
globalStyle("button", {
    width: "100%",
    marginBottom: 4,
    padding: "8px",
    fontWeight: "bold",
});
