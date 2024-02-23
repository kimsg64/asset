"use client";

import { useQuery } from "@tanstack/react-query";

import { IAsset } from "@/interfaces/IAsset";
import { getAssets } from "@/app/(afterLogin)/[userId]/_lib/getAssets";
import { useRandomColors } from "@/app/(afterLogin)/[userId]/_lib/useRandomColors";

import { ArcElement, Chart, ChartOptions, ChartData, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
// import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ArcElement, Legend, Tooltip);

import * as styles from "./itemBoxes.css";
import ItemBox from "./ItemBox";

type Props = { userId: string };

export default function ItemBoxesZone({ userId }: Props) {
	const { data: assets } = useQuery<IAsset[], Object, IAsset[], [_1: string, userId: string, _3: string]>({
		queryKey: ["users", userId, "assets"],
		queryFn: getAssets,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});
	const colors = useRandomColors(assets?.length as number);

	const moreThanTwo = !!assets && assets.length > 1;
	const totalAmount = assets?.reduce((accumulator, currentAsset) => accumulator + currentAsset.amount, 0) as number;
	const chartData: ChartData<"doughnut"> = {
		labels: assets?.map((asset) => `${asset.name}(${Math.round((asset.amount / totalAmount) * 100)}%)`),
		datasets: [
			{
				data: assets?.map((asset) => asset.amount)!,
				backgroundColor: colors,
			},
		],
	};
	const chartOptions: ChartOptions<"doughnut"> = {
		maintainAspectRatio: false, // 종횡비를 유지하지 않음
		responsive: true,
	};

	return (
		<>
			<section className={styles.gridZone}>
				{assets?.map((asset) => (
					<ItemBox key={asset._id} asset={asset} userId={userId} isTransferable={moreThanTwo && asset.amount > 0} />
				))}
				{!!assets &&
					assets.length > 0 &&
					(assets?.length % 3 === 0 ? (
						<>
							<div className={styles.chartWrapper}></div>
							<div className={styles.chartWrapper}></div>
							<div className={styles.chartWrapper}>
								<Doughnut data={chartData} options={chartOptions} className={styles.chartWrapper} />
							</div>
						</>
					) : assets?.length % 3 === 1 ? (
						<>
							<div className={styles.chartWrapper}></div>
							<div className={styles.chartWrapper}>
								<Doughnut data={chartData} options={chartOptions} className={styles.chartWrapper} />
							</div>
						</>
					) : (
						<>
							<div className={styles.chartWrapper}>
								<Doughnut data={chartData} options={chartOptions} className={styles.chartWrapper} />
							</div>
						</>
					))}
			</section>
			<section className={styles.totalZone}>
				<h2>Total</h2>
				<div className={totalAmount >= 0 ? styles.amountPlus : styles.amountMinus}>{totalAmount?.toLocaleString()}</div>
			</section>
		</>
	);
}
