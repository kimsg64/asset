"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import { DefaultError, useQuery, useQueryClient } from "@tanstack/react-query";
import { IDailyInput } from "@/interfaces/IDaily";
import { IAsset } from "@/interfaces/IAsset";
import { getFilteredRecords } from "@/app/(afterLogin)/[userId]/daily/_lib/getFilteredRecords";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import * as styles from "./statsModal.css";
import Backdrop from "@/app/(afterLogin)/[userId]/_component/Backdrop";
import StatsModalDataSection from "./StatsModalDataSection";

type Props = { userId: string };
type PeriodTypes = "day" | "week" | "month" | "year";
type ChartDataSet = { totalIncomeAmount: number; totalSpendingAmount: number; hasData: boolean };

export default function StatsModal({ userId }: Props) {
	const [periodUnit, setPeriodUnit] = useState<PeriodTypes>("month");
	const [isPrev, setIsPrev] = useState(false);
	const [from, setFrom] = useState(dayjs().startOf("month").format("YYYY-MM-DD"));
	const [to, setTo] = useState(dayjs().format("YYYY-MM-DD"));
	const [assets, setAssets] = useState<IAsset[]>([]);
	const [selectedAsset, setSelectedAsset] = useState("");
	const [chartDataset, setChartDataset] = useState<ChartDataSet>({ totalIncomeAmount: 0, totalSpendingAmount: 0, hasData: false });

	const { data: dailyRecords, isFetching } = useQuery<IDailyInput[], DefaultError, IDailyInput[], [_1: string, string, _3: string, { from: string; to: string; assetTypeId?: string; transactionType?: string; memo?: string }]>({
		queryKey: ["users", userId, "daily", { from: dayjs(from).startOf("day").format("YYYY-MM-DD HH:mm"), to: dayjs(to).endOf("day").format("YYYY-MM-DD HH:mm"), assetTypeId: selectedAsset }],
		queryFn: getFilteredRecords,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});
	const queryClient = useQueryClient();
	const queryKeys = queryClient
		.getQueryCache()
		.getAll()
		.map((cache) => cache.queryKey);
	useEffect(() => {
		queryKeys.forEach((queryKey) => {
			if (queryKey.includes("assets") && queryKey.length === 3) {
				const assets = queryClient.getQueryData(queryKey) as IAsset[];
				setAssets(assets);
			}
		});
	}, [queryClient, queryKeys]);

	console.log("dailyRecords", dailyRecords);

	useEffect(() => {
		const incomes = dailyRecords?.filter((rec) => rec.transactionType === "income");
		const totalIncomeAmount = !!incomes && incomes.length > 0 ? incomes.reduce((accumulator, currentRec) => accumulator + currentRec.amount, 0) : 0;
		const spendings = dailyRecords?.filter((rec) => rec.transactionType === "spending");
		const totalSpendingAmount = !!spendings && spendings.length > 0 ? spendings.reduce((accumulator, currentRec) => accumulator + currentRec.amount, 0) : 0;
		setChartDataset({ totalIncomeAmount, totalSpendingAmount, hasData: totalIncomeAmount !== 0 || totalSpendingAmount !== 0 });
	}, [dailyRecords]);

	const setDefaultPeriod = (passedPeriod = periodUnit) => {
		if (passedPeriod === "day") {
			setFrom(dayjs().format("YYYY-MM-DD"));
		} else {
			setFrom(dayjs().startOf(passedPeriod).format("YYYY-MM-DD"));
		}
		setTo(dayjs().format("YYYY-MM-DD"));
		setIsPrev(false);
	};
	const onChangePeriodUnit: ChangeEventHandler<HTMLSelectElement> = (event) => {
		const periodUnit = event.target.value as PeriodTypes;
		setPeriodUnit(periodUnit);
		setDefaultPeriod(periodUnit);
	};
	const onClickPrev = () => {
		if (periodUnit === "day") {
			setFrom(dayjs().subtract(1, periodUnit).format("YYYY-MM-DD"));
			setTo(dayjs().subtract(1, periodUnit).format("YYYY-MM-DD"));
		} else {
			setFrom(dayjs().subtract(1, periodUnit).startOf(periodUnit).format("YYYY-MM-DD"));
			setTo(dayjs().subtract(1, periodUnit).endOf(periodUnit).format("YYYY-MM-DD"));
		}
		setIsPrev(true);
	};
	const onClickThis = () => setDefaultPeriod();
	const onChangeFrom: ChangeEventHandler<HTMLInputElement> = (event) => setFrom(event.target.value);
	const onChangeTo: ChangeEventHandler<HTMLInputElement> = (event) => setTo(event.target.value);

	const onChangeAsset: ChangeEventHandler<HTMLInputElement> = (event) => setSelectedAsset(event.target.value);
	const onSubmitSelectedAsset = () => queryClient.invalidateQueries({ queryKey: ["users", userId, "daily", { from, to, assetTypeId: selectedAsset }] });

	return (
		<Backdrop>
			<div className={styles.modalBody}>
				<section>
					<div className={styles.filterContainer}>
						<div className={styles.filterName}>기간</div>
						<div className={styles.periodContainer}>
							<select onChange={onChangePeriodUnit}>
								<option value="day">일간</option>
								<option value="week">주간</option>
								<option value="month" selected>
									월간
								</option>
								<option value="year">연간</option>
							</select>

							<button className={isPrev ? [styles.periodButton, styles.checked].join(" ") : styles.periodButton} onClick={onClickPrev}>
								PREV {periodUnit.toUpperCase()}
							</button>
							<button className={isPrev ? styles.periodButton : [styles.periodButton, styles.checked].join(" ")} onClick={onClickThis}>
								THIS {periodUnit.toUpperCase()}
							</button>

							<span className={styles.rightSection}>기간 선택</span>
							<input id="from" className={styles.calendar} type="date" placeholder="From" value={from} onChange={onChangeFrom} />
							<input id="to" className={styles.calendar} type="date" placeholder="To" value={to} onChange={onChangeTo} />
						</div>
					</div>
					<div className={styles.filterContainer}>
						<div className={styles.filterName}>자산</div>
						<form className={styles.assetsContainer} onSubmit={onSubmitSelectedAsset}>
							<label htmlFor="all" className={selectedAsset === "" ? [styles.assetLabel, styles.checked].join(" ") : styles.assetLabel}>
								<span>전체</span>
								<input type="radio" id="all" className={styles.assetRadio} name="asset" value="" onChange={onChangeAsset} checked={selectedAsset === ""} />
							</label>
							{assets?.map((asset) => (
								<label htmlFor={asset._id} key={asset._id} className={selectedAsset === asset._id ? [styles.assetLabel, styles.checked].join(" ") : styles.assetLabel}>
									<span>{asset.name}</span>
									<input type="radio" id={asset._id} className={styles.assetRadio} name="asset" value={asset._id} onChange={onChangeAsset} checked={selectedAsset === asset._id} />
								</label>
							))}
						</form>
					</div>
				</section>
				{!isFetching && dailyRecords && <StatsModalDataSection chartDataset={chartDataset} dailyRecords={dailyRecords} userId={userId} />}
			</div>
		</Backdrop>
	);
}
