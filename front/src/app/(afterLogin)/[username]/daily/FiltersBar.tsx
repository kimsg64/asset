// react, next
import React from "react";

// custom modules
import { IAsset } from "@/interfaces/IFcAsset";

// custom styles
import Button from "@/app/_component/Button.module.css";
import Input from "@/app/_component/Input";

type Props = {
    assets: IAsset[];
    filteredTransactionType: string;
    onChanedgeFilteredTransactionType: (event: React.FormEvent<HTMLSelectElement>) => void;
    filteredAssetTypeId: string;
    onChangeFilteredAssetTypeId: (event: React.FormEvent<HTMLSelectElement>) => void;
    from: string;
    onChangeFrom: (event: React.ChangeEvent<HTMLInputElement>) => void;
    to: string;
    onChangeTo: (event: React.ChangeEvent<HTMLInputElement>) => void;
    keyword: string;
    onChangeKeyword: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitConditionsForm: (event: React.FormEvent) => void;
    onResetConditions: () => void;
};

export default function Component({
    assets,
    filteredTransactionType,
    onChanedgeFilteredTransactionType,
    filteredAssetTypeId,
    onChangeFilteredAssetTypeId,
    from,
    onChangeFrom,
    to,
    onChangeTo,
    keyword,
    onChangeKeyword,
    onSubmitConditionsForm,
    onResetConditions,
}: Props) {
    return (
        <form className="my-4 flex gap-2" onSubmit={onSubmitConditionsForm}>
            검색 ㄱㄱ
            <label htmlFor="filteredTransactionType">
                <select id="filteredTransactionType" value={filteredTransactionType} onChange={onChanedgeFilteredTransactionType}>
                    <option defaultValue="none">전체</option>
                    <option value="spending">지출</option>
                    <option value="income">수입</option>
                </select>
            </label>
            <label htmlFor="filteredAssetTypeId">
                <select id="filteredAssetTypeId" value={filteredAssetTypeId} onChange={onChangeFilteredAssetTypeId}>
                    <option value="none">자산 전체</option>
                    {!!assets &&
                        assets.map((asset) => (
                            <option key={asset._id} value={asset._id}>
                                {asset.name}
                            </option>
                        ))}
                </select>
            </label>
            <Input id="from" type="date" placeholder="From" value={from} onChange={onChangeFrom} />
            <Input id="to" type="date" placeholder="To" value={to} onChange={onChangeTo} />
            <Input id="keyword" type="text" placeholder="검색" value={keyword} onChange={onChangeKeyword} />
            <button className={Button.small} type="submit">
                Search
            </button>
            <button className={Button.small} type="button" onClick={onResetConditions}>
                Reset
            </button>
        </form>
    );
}
