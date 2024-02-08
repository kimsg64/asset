import { style } from "@vanilla-extract/css";

export const gridZone = style({
    width: "100%",
    padding: "40px 0",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 40,
});
export const itemBox = style({
    width: "100%",
    minHeight: "32dvh",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left",
    backgroundColor: "skyblue",
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
    fontSize: "2rem",
    fontWeight: "bold",
});
export const amountMinus = style({
    fontSize: "2rem",
    fontWeight: "bold",
    color: "red",
});
export const description = style({
    // marginTop: 4,
    fontSize: "0.8rem",
    color: "rgb(127, 127, 127)",
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
// export const updatingButtonsZone = style({
//     width: "100%",
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr 1fr 1fr",
//     gap: 12,
//     marginTop: 20,
// });

export const totalZone = style({
    width: "100%",
    padding: "0 20px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 40,
});
