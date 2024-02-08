import { style } from "@vanilla-extract/css";

export const form = style({
    width: "40%",
    display: "flex",
    marginTop: "8vh",
    flexDirection: "column",
    justifyContent: "center",
});
export const formTitle = style({
    marginBottom: 20,
});
export const formInputWrapper = style({
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});
export const formMessage = style({
    color: "red",
    fontWeight: "bold",
});
