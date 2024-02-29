export type TransactionType = "spending" | "income" | "all";

export type SearchConditions = {
	transactionType?: TransactionType;
	assetTypeId?: string;
	from?: string;
	to?: string;
	keyword?: string;
};

export interface IDailyInput {
	transactionType: TransactionType;
	amount: number;
	assetTypeId: string;
	registeredDate: Date;
	memo: string;
	ownerId: string;
	_id: string;
	transferTo?: string;
	isFirstInput: boolean;
}
