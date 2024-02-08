"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { IDailyInput } from "@/interfaces/IDaily";
import { getDailyRecords } from "../_lib/getDailyRecords";

import TableRow from "./TableRow";
import TableRowStyle from "./TableRow.module.css";
import { useFilterStore } from "@/store/filter";

type Props = { userId: string };
export default function DailyRecordsZone({ userId }: Props) {
	const [displayedTotalAmount, setDisplayedTotalAmount] = useState(0);
	const filterStore = useFilterStore();
	// filterStore.isFiltered 값에 따라 mutation 수행 여부 결정
	const filter = useMutation({
		mutationFn: async () => {
			console.log("check filtered values", filterStore.transactionType, filterStore.assetTypeId, filterStore.from, filterStore.to, filterStore.keyword);
			const filterConditions = { transactionType: filterStore.transactionType, assetTypeId: filterStore.assetTypeId, from: filterStore.from, to: filterStore.to, keyword: filterStore.keyword };

			return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/daily/${userId}`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json; charset=UTF-8" },
				body: JSON.stringify(filterConditions),
			});
		},
		onSuccess(data, variables, context) {
			console.log("filtered!!", data);
		},
		onError(error, variables, context) {
			console.log(error);
		},
	});
	const { data } = useQuery({
		queryKey: ["users", userId, "daily"],
		queryFn: getDailyRecords,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});

	const dailyRecords: IDailyInput[] = data.pages;
	console.log("records!!!", dailyRecords);

	// useEffect(() => {
	//     // form을 제출하지 않을 때(필터링 등)에도 보이는 합계 값은 업데이트 되어야 하므로 onSubmitForm이 아닌 useEffect에서 계산
	//     const total = dailyRecords.reduce((accumulator, currentRecord) => {
	//         return currentRecord.transactionType === "spending" ? accumulator - currentRecord.amount : currentRecord.transactionType === "income" ? accumulator + currentRecord.amount : accumulator;
	//     }, 0);
	//     setDisplayedTotalAmount(total);
	// }, [dailyRecords]);
	return (
		<>
			<div className={TableRowStyle.header}>
				<div>구분</div>
				<div>자산명</div>
				<div>발생일</div>
				<div>금액</div>
				<div>메모</div>
			</div>
			<div className={displayedTotalAmount < 0 ? "text-red-600" : displayedTotalAmount > 0 ? "text-blue-600" : ""}>합계 {displayedTotalAmount.toLocaleString()}</div>
			{dailyRecords?.flat().map((rec) => (
				<TableRow key={rec._id} {...rec} />
			))}
		</>
	);
}
