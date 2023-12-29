export type TransactionType = "spending" | "income" | "transfer";

export interface IDailyInput {
    transactionType: TransactionType;
    amount: number;
    assetTypeId: string;
    registeredDate: Date;
    memo: string;
    owner: string;
    _id: string;
    transferTo?: string;
}

export interface IDailyInputReq {
    transactionType: TransactionType;
    amount: number;
    assetTypeId: string;
    registeredDate: Date;
    memo: string;
}
