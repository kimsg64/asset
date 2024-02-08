import { style } from "@vanilla-extract/css";

export const header = style({
    width: "100dvw",
    height: 60,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "red",
});
export const user = style({
    height: "100%",
    display: "flex",
    alignItems: "baseline",
});
export const thumbnail = style({
    width: 48,
    height: 48,
    margin: 6,
});
export const username = style({
    fontSize: "1.2rem",
    fontWeight: "bold",
});
export const navItem = style({
    height: "100%",
    display: "inline-block",
    marginLeft: 12,
});
