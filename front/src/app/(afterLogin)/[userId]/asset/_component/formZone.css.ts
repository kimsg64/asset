import { style } from "@vanilla-extract/css";

export const form = style({
    marginTop: 40,
    display: "flex",
    justifyContent: "flex-start",
    gap: 40,
});
export const formInputWrapper = style({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
});
export const grownFormInputWrapper = style({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexGrow: 1,
});
export const formInputLabel = style({
    width: 80,
});
export const grownFormInput = style({
    flexGrow: 1,
});
export const formButton = style({
    maxWidth: 120,
});
