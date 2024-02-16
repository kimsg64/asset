import { create } from "zustand";

interface totalAssetState {
	totalAsset: number;
	setTotalAsset(totalAsset: number): void;
	isTotalAssetUpdated: boolean;
	setIsTotalAssetUpdated(isTotalAssetUpdated: boolean): void;
}

export const useTotalAssetStore = create<totalAssetState>((set) => ({
	totalAsset: 0,
	setTotalAsset(totalAsset: number) {
		set({ totalAsset });
	},
	isTotalAssetUpdated: true,
	setIsTotalAssetUpdated(isTotalAssetUpdated: boolean) {
		set({ isTotalAssetUpdated });
	},
}));
