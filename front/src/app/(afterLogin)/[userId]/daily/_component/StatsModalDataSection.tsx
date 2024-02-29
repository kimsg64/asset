import { ArcElement, Chart, ChartOptions, ChartData, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
Chart.register(ArcElement, Legend, Tooltip);

import NoData from "./NoData";
import TableRow from "./TableRow";
import * as styles from "./statsModal.css";
import { smallHeader } from "./tableRow.css";
import { IDailyInput } from "@/interfaces/IDaily";
import { fontBlueColor, fontRedColor } from "@/app/globalTheme.css";

type ChartDataSet = { totalIncomeAmount: number; totalSpendingAmount: number; hasData: boolean };
type Props = { dailyRecords: IDailyInput[]; chartDataset: ChartDataSet; userId: string };
export default function StatsModalDataSection({ dailyRecords, chartDataset, userId }: Props) {
	const totalAmount = chartDataset.totalIncomeAmount + chartDataset.totalSpendingAmount;
	const chartData: ChartData<"pie", number[], string> = {
		labels: [`수입(${Math.round((chartDataset.totalIncomeAmount / totalAmount) * 100)}%)`, `지출(${Math.round((chartDataset.totalSpendingAmount / totalAmount) * 100)}%)`],
		datasets: [
			{
				data: [chartDataset.totalIncomeAmount, chartDataset.totalSpendingAmount],
				backgroundColor: [fontBlueColor, fontRedColor],
			},
		],
	};
	const chartOptions: ChartOptions<"pie"> = {
		responsive: true,
		// tooltips: {},
	};

	return chartDataset?.hasData ? (
		<section className={styles.dataSection}>
			<div className={styles.tableWrapper}>
				<div className={smallHeader}>
					<div>구분</div>
					<div>자산명</div>
					<div>발생일</div>
					<div>금액</div>
					<div>메모</div>
				</div>
				{dailyRecords?.map((rec) => (
					<TableRow key={rec._id} userId={userId} record={rec} readonly />
				))}
			</div>
			<div className={styles.chartWrapper}>
				<Pie data={chartData} options={chartOptions} />
			</div>
		</section>
	) : (
		<NoData />
	);
}
