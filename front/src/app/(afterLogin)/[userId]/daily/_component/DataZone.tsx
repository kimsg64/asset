"use client";

import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TransactionType } from "@/interfaces/IDaily";
import { IAsset } from "@/interfaces/IAsset";
import { getAssets } from "../../_lib/getAssets";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import * as wrapperStyle from "@/app/(afterLogin)/[userId]/daily/dailyPage.css";
import * as styles from "./dataZone.css";
import RecordsZone from "./RecordsZone";
import { useSearchParams } from "next/navigation";

type Props = { userId: string };

export default function DataZone({ userId }: Props) {
	const [transactionType, setTransactionType] = useState<TransactionType>("spending");
	const [assetTypeId, setAssetTypeId] = useState("");
	const [from, setFrom] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
	const [to, setTo] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
	const [keyword, setKeyword] = useState("");
	const [searchConditions, setSearchConditions] = useState({});
	const [isFiltered, setIsFiltered] = useState(false);
	const { data: assets } = useQuery<IAsset[], Object, IAsset[], [_1: string, string, _3: string]>({
		queryKey: ["users", userId, "assets"],
		queryFn: getAssets,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});
	const searchParams = useSearchParams();
	const passedAssetTypeId = searchParams.get("asset");

	useEffect(() => {
		if (passedAssetTypeId) {
			console.log("passedAssetTypeId", passedAssetTypeId);
			setAssetTypeId(passedAssetTypeId);
		}
	}, [passedAssetTypeId]);

	const onChangeTransactionType: ChangeEventHandler<HTMLSelectElement> = (event) => setTransactionType(event.target.value as TransactionType);
	const onChangeAssetTypeId: ChangeEventHandler<HTMLSelectElement> = (event) => setAssetTypeId(event.target.value);
	const onChangeFrom: ChangeEventHandler<HTMLInputElement> = (event) => setFrom(event.target.value);
	const onChangeTo: ChangeEventHandler<HTMLInputElement> = (event) => setTo(event.target.value);
	const onChangeKeyword: ChangeEventHandler<HTMLInputElement> = (event) => setKeyword(event.target.value);
	const onSubmitFilterConditions: FormEventHandler = (event) => {
		event.preventDefault();
		setIsFiltered(true);
		setSearchConditions({ transactionType, assetTypeId, from, to, keyword });
	};
	const reset: MouseEventHandler = () => {
		setTransactionType("spending");
		setAssetTypeId("");
		setFrom(dayjs(new Date()).format("YYYY-MM-DD"));
		setTo(dayjs(new Date()).format("YYYY-MM-DD"));
		setKeyword("");
		setIsFiltered(false);
	};

	return (
		<section className={wrapperStyle.wrapper}>
			<form className={styles.form} onSubmit={onSubmitFilterConditions}>
				<h3>검색</h3>
				<select className={styles.selectBox} id="transactionType" value={transactionType} onChange={onChangeTransactionType}>
					<option value="spending">지출</option>
					<option value="income">수입</option>
				</select>
				<select className={styles.selectBox} id="assetType" value={assetTypeId} onChange={onChangeAssetTypeId}>
					<option value="none">자산 선택</option>
					{assets?.map((asset) => (
						<option key={asset._id} value={asset._id}>
							{asset.name}
						</option>
					))}
				</select>
				<input className={styles.calendar} id="from" type="date" placeholder="From" value={from} onChange={onChangeFrom} />
				<input className={styles.calendar} id="to" type="date" placeholder="To" value={to} onChange={onChangeTo} />
				<input id="keyword" type="text" placeholder="검색" value={keyword} onChange={onChangeKeyword} />
				<button type="submit" className={styles.formButton}>
					Search
				</button>
				<button type="button" className={styles.formButton} onClick={reset}>
					Reset
				</button>
			</form>
			<RecordsZone userId={userId} isFiltered={isFiltered} searchConditions={searchConditions} />
		</section>
	);
}
