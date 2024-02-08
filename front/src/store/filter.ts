import { create } from "zustand";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { TransactionType } from "@/interfaces/IDaily";

interface FilterState {
    transactionType: TransactionType;
    setTransactionType(transactionType: TransactionType): void;
    assetTypeId: string;
    setAssetTypeId(assetTypeId: string): void;
    from: string;
    setFrom(from: string): void;
    to: string;
    setTo(to: string): void;
    keyword: string;
    setKeyword(keyword: string): void;
    isFiltered: boolean;
    setIsFiltered(isFiltered: boolean): void;
    reset(): void;
}

export const useFilterStore = create<FilterState>((set) => ({
    transactionType: "spending",
    setTransactionType(transactionType) {
        set({ transactionType });
    },
    assetTypeId: "",
    setAssetTypeId(assetTypeId) {
        set({ assetTypeId });
    },
    from: dayjs(new Date()).format("YYYY-MM-DD"),
    setFrom(from) {
        set({ from });
    },
    to: dayjs(new Date()).format("YYYY-MM-DD"),
    setTo(to) {
        set({ to });
    },
    keyword: "",
    setKeyword(keyword) {
        set({ keyword });
    },
    isFiltered: false,
    setIsFiltered(isFiltered) {
        set({ isFiltered });
    },
    reset() {
        set({ transactionType: "spending", assetTypeId: "", from: dayjs(new Date()).format("YYYY-MM-DD"), to: dayjs(new Date()).format("YYYY-MM-DD"), keyword: "", isFiltered: false });
    },
}));
