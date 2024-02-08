import { style } from "@vanilla-extract/css";

export const normal = style({
    width: "80dvw",
    padding: 20,
});
export const hidden = style({
    width: "80dvw",
    height: "100dvh",
    padding: 20,
    overflowY: "hidden",
});
