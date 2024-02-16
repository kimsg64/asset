"use client";

import { useQuery } from "@tanstack/react-query";

import { IAsset } from "@/interfaces/IAsset";
import { getAssets } from "@/app/(afterLogin)/[userId]/_lib/getAssets";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
import { faker } from "@faker-js/faker";

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

	const moreThanTwo = !!assets && assets.length > 1;
	const totalAmount = assets?.reduce((accumulator, currentAsset) => accumulator + currentAsset.amount, 0) as number;
	const chartData = {
		labels: assets?.map((asset) => asset.name),
		datasets: [
			{
				data: assets?.map((asset) => asset.amount),
				backgroundColor: assets?.map((asset, idx) => faker.color.rgb({ casing: "upper" })),
			},
		],
	};
	console.log("chart", chartData);

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
							<div className={styles.emptyBox}></div>
							<div className={styles.emptyBox}></div>
							<div className={styles.emptyBox}>
								<Doughnut data={chartData} className={styles.emptyBox} />
							</div>
						</>
					) : assets?.length % 3 === 1 ? (
						<>
							<div className={styles.emptyBox}></div>
							<div className={styles.emptyBox}>
								<Doughnut data={chartData} className={styles.emptyBox} />
							</div>
						</>
					) : (
						<>
							<div className={styles.emptyBox}>
								<Doughnut data={chartData} className={styles.emptyBox} />
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
