"use client";
import { createContext, useState } from "react";

export const DailyContext = createContext({
    assetTypeId: "",
    setAssetTypeId: (value: string) => {},
});

type Props = { children: React.ReactNode };

export default function DailyProvider({ children }: Props) {
    const [assetTypeId, setAssetTypeId] = useState("");

    return <DailyContext.Provider value={{ assetTypeId, setAssetTypeId }}>{children}</DailyContext.Provider>;
}
