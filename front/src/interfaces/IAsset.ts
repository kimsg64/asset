export interface IAsset {
    owner: string;
    amount: number;
    name: string;
    _id: string;
    memo?: string;
}

export interface IAssetReq {
    name: string;
    amount: number;
    memo?: string;
}
