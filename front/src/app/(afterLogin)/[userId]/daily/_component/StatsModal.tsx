"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import { DefaultError, InfiniteData, useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { IDailyInput } from "@/interfaces/IDaily";
import { IAsset } from "@/interfaces/IAsset";
import { getFilteredRecords } from "@/app/(afterLogin)/[userId]/daily/_lib/getFilteredRecords";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { ArcElement, Chart, ChartOptions, ChartData, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
Chart.register(ArcElement, Legend, Tooltip);
import { faker } from "@faker-js/faker";

import * as styles from "./statsModal.css";
import Backdrop from "@/app/(afterLogin)/[userId]/_component/Backdrop";

type Props = { userId: string };
type PeriodTypes = "day" | "week" | "month" | "year";
export default function StatsModal({ userId }: Props) {
	const [periodUnit, setPeriodUnit] = useState<PeriodTypes>("day");
	const [from, setFrom] = useState(dayjs().startOf("month").format("YYYY-MM-DD"));
	const [to, setTo] = useState(dayjs().format("YYYY-MM-DD"));
	const [assets, setAssets] = useState<IAsset[]>([]);
	// const [dailyInputs, setDailyInputs] = useState<IDailyInput[]>([]);
	const [selectedAsset, setSelectedAsset] = useState("");
	const [chartDataset, setChartDataset] = useState<number[]>([]);

	// TODO: 백엔드로 새로 요청을 보내야 함! (getFilteredRecords 생성) to /filter/:userId
	const { data: dailyRecords } = useQuery<IDailyInput[], DefaultError, IDailyInput[], [_1: string, string, _3: string, { from: string; to: string; assetTypeId: string }]>({
		queryKey: ["users", userId, "daily", { from, to, assetTypeId: selectedAsset }],
		queryFn: getFilteredRecords,
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

	// const totalAmount = dailyInputs?.reduce((accumulator, currentRec) => accumulator + currentRec.amount, 0);
	// const dataset = new Array(assets?.length).map((part, idx) => {
	// 	return dailyInputs.filter((rec) => rec.assetTypeId === assets[idx]._id).reduce((accumulator, currentRec) => accumulator + currentRec.amount, 0) / totalAmount;
	// });
	// const chartData: ChartData<"pie"> = {
	// 	labels: assets?.map((asset) => `${asset.name}(${Math.round((asset.amount / totalAmount) * 100)}%)`),
	// 	datasets: [
	// 		{
	// 			data: assets?.map((asset) => asset.amount)!,
	// 			backgroundColor: assets?.map((asset, idx) => faker.color.rgb({ casing: "upper" })),
	// 		},
	// 	],
	// };

	const onChangePeriodUnit: ChangeEventHandler<HTMLSelectElement> = (event) => setPeriodUnit(event.target.value as PeriodTypes);
	const onClickPrev = () => {
		if (periodUnit === "day") {
			setFrom(dayjs().subtract(1, periodUnit).format("YYYY-MM-DD"));
			setTo(dayjs().subtract(1, periodUnit).format("YYYY-MM-DD"));
		} else {
			setFrom(dayjs().subtract(1, periodUnit).startOf(periodUnit).format("YYYY-MM-DD"));
			setTo(dayjs().subtract(1, periodUnit).endOf(periodUnit).format("YYYY-MM-DD"));
		}
	};
	const onClickThis = () => {
		if (periodUnit === "day") {
			setFrom(dayjs().format("YYYY-MM-DD"));
		} else {
			setFrom(dayjs().startOf(periodUnit).format("YYYY-MM-DD"));
		}
		setTo(dayjs().format("YYYY-MM-DD"));
	};

	const onChangeFrom: ChangeEventHandler<HTMLInputElement> = (event) => setFrom(event.target.value);
	const onChangeTo: ChangeEventHandler<HTMLInputElement> = (event) => setTo(event.target.value);

	const onClickAsset = () => {
		setSelectedAsset("");
	};

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
								<option value="month">월간</option>
								<option value="year">연간</option>
							</select>

							<button className={styles.periodButton} onClick={onClickPrev}>
								PREV {periodUnit}
							</button>
							<button className={styles.periodButton} onClick={onClickThis}>
								THIS {periodUnit}
							</button>

							<span className={styles.rightSection}>기간 선택</span>
							<input id="from" className={styles.calendar} type="date" placeholder="From" value={from} onChange={onChangeFrom} />
							<input id="to" className={styles.calendar} type="date" placeholder="To" value={to} onChange={onChangeTo} />
						</div>
					</div>
					<div className={styles.filterContainer}>
						<div className={styles.filterName}>자산</div>
						<div className={styles.assetsContainer}>
							<button className={styles.assetButton} onClick={onClickAsset}>
								전체
							</button>
							{assets?.map((asset) => (
								<button className={styles.assetButton} key={asset._id} onClick={onClickAsset}>
									{asset.name}
								</button>
							))}
						</div>
					</div>
				</section>
				<section>
					1. 선택된 기간에 따른 수입/지출 내역 2. 선택된 기간에 따른 특정 자산의 수입/지출 내역
					{/* <Pie data={chartData} /> */}
				</section>
			</div>
		</Backdrop>
	);
}
