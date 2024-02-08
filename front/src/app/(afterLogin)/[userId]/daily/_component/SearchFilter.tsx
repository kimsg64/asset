"use client";
// react, next
import { ChangeEventHandler, MouseEventHandler } from "react";
import { useQuery } from "@tanstack/react-query";

import { IAsset } from "@/interfaces/IAsset";
import { getAssets } from "../../_lib/getAssets";
import { useFilterStore } from "@/store/filter";
import { TransactionType } from "@/interfaces/IDaily";
import * as styles from "./searchFilter.css";

type Props = { userId: string };

export default function SearchFilter({ userId }: Props) {
    const filterStore = useFilterStore();
    const { data: assets } = useQuery<IAsset[], Object, IAsset[], [_1: string, string, _3: string]>({
        queryKey: ["users", userId, "assets"],
        queryFn: getAssets,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    const onChangeTransactionType: ChangeEventHandler<HTMLSelectElement> = (event) => filterStore.setTransactionType(event.target.value as TransactionType);
    const onChangeAssetTypeId: ChangeEventHandler<HTMLSelectElement> = (event) => filterStore.setAssetTypeId(event.target.value);
    const onChangeFrom: ChangeEventHandler<HTMLInputElement> = (event) => filterStore.setFrom(event.target.value);
    const onChangeTo: ChangeEventHandler<HTMLInputElement> = (event) => filterStore.setTo(event.target.value);
    const onChangeKeyword: ChangeEventHandler<HTMLInputElement> = (event) => filterStore.setKeyword(event.target.value);
    const onSubmitFilterConditions: MouseEventHandler = () => filterStore.setIsFiltered(true);

    return (
        <form className={styles.form}>
            <h3>검색</h3>
            <select className={styles.selectBox} id="transactionType" value={filterStore.transactionType} onChange={onChangeTransactionType}>
                <option value="spending">지출</option>
                <option value="income">수입</option>
            </select>
            <select className={styles.selectBox} id="assetType" value={filterStore.assetTypeId} onChange={onChangeAssetTypeId}>
                <option value="none">자산 선택</option>
                {assets?.map((asset) => (
                    <option key={asset._id} value={asset._id}>
                        {asset.name}
                    </option>
                ))}
            </select>
            <input className={styles.calendar} id="from" type="date" placeholder="From" value={filterStore.from} onChange={onChangeFrom} />
            <input className={styles.calendar} id="to" type="date" placeholder="To" value={filterStore.to} onChange={onChangeTo} />
            <input id="keyword" type="text" placeholder="검색" value={filterStore.keyword} onChange={onChangeKeyword} />
            <button type="button" className={styles.formButton} onClick={onSubmitFilterConditions}>
                Search
            </button>
            <button type="button" className={styles.formButton} onClick={filterStore.reset}>
                Reset
            </button>
        </form>
    );
}
