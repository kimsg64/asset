// react, next
import { MouseEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { IDailyInput } from "@/interfaces/IDaily";
import { IAsset } from "@/interfaces/IAsset";
import { getSingleAsset } from "@/app/(afterLogin)/[userId]/_lib/getSingleAsset";
import * as styles from "./tableRow.css";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

type Props = { userId: string; record: IDailyInput };

export default function TableRow({ userId, record }: Props) {
	const { data: asset } = useQuery<IAsset, Object, IAsset, [_1: string, string, _3: string, string]>({
		queryKey: ["users", userId, "assets", record.assetTypeId],
		queryFn: getSingleAsset,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});
	const queryClient = useQueryClient();

	const deleteRow = useMutation({
		mutationFn: async (_event: MouseEvent) => {
			console.log("is first?", record.isFirstInput);
			if (record.isFirstInput) throw new Error("히히못지워");

			return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/daily/delete`, {
				method: "DELETE",
				credentials: "include",
				headers: { "Content-Type": "application/json; charset=UTF-8" },
				body: JSON.stringify({ _id: record._id }),
			});
		},
		onMutate() {
			queryClient.invalidateQueries({
				queryKey: ["users", userId, "daily"],
			});
			queryClient.invalidateQueries({
				queryKey: ["users", userId, "assets"],
			});
		},
		onError() {
			alert("히히못지워!");
		},
	});

	return (
		<ul className={styles.row}>
			<li>{record.transactionType === "income" ? <span className={styles.surplus}>수입</span> : record.transactionType === "spending" ? <span className={styles.deficit}>지출</span> : <span>이체</span>}</li>
			<li>{asset?.name}</li>
			<li>{dayjs(record.registeredDate).format("YYYY-MM-DD HH:mm")}</li>
			<li>{record.amount.toLocaleString()}</li>
			<li>{record.memo}</li>
			<button type="button" onClick={deleteRow.mutate}>
				DELETE!
			</button>
		</ul>
	);
}
