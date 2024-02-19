"use client";

import { useEffect } from "react";
import { DefaultError, InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useTotalAssetStore } from "@/store/totalAsset";

import dayjs from "dayjs";

import { IDailyInput, SearchConditions } from "@/interfaces/IDaily";
import { getDailyRecords } from "../_lib/getDailyRecords";

import TableRow from "./TableRow";
import * as styles from "./tableRow.css";
import { useSearchParams } from "next/navigation";

type Props = { userId: string; isFiltered: boolean; searchConditions: SearchConditions };
const RECORDS_PER_PAGE = 10;

export default function RecordsZone({ userId, isFiltered, searchConditions }: Props) {
	const totalAssetStore = useTotalAssetStore();
	const {
		data: dailyRecords,
		hasNextPage,
		fetchNextPage,
		isFetching,
	} = useInfiniteQuery<IDailyInput[], DefaultError, InfiniteData<IDailyInput[]>, [_1: string, string, _3: string], number>({
		queryKey: ["users", userId, "daily"],
		queryFn: getDailyRecords,
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			// console.log("allPages: ", allPages);
			// console.log("lastPage: ", lastPage);
			const currentLast = lastPage.at(-1);
			if (!currentLast) return allPages.length; // currentLast가 undefined인 경우 === 다음 페이지가 없는 경우이므로 마지막 페이지 전달

			const allItems = allPages.flat();
			const currentLastIdx = allItems.findIndex((item) => item._id === currentLast._id);
			// console.log(`next page: ${Math.floor(currentLastIdx / RECORDS_PER_PAGE) + 1}`);
			return Math.floor(currentLastIdx / RECORDS_PER_PAGE) + 1;
		},
	});

	const searchParams = useSearchParams();
	const passedAssetTypeId = searchParams.get("asset");

	const { ref, inView } = useInView({
		threshold: 0,
		delay: 1,
	});
	useEffect(() => {
		if (inView) {
			// console.log(`isFetching: ${isFetching}, hasNextPage: ${hasNextPage}, dailyRecords?.pages.at(-1)?.length: ${dailyRecords?.pages.at(-1)?.length}`);
			!isFetching && hasNextPage && dailyRecords?.pages.at(-1)?.length !== 0 && fetchNextPage();
		}
	}, [inView, isFetching, hasNextPage, dailyRecords, fetchNextPage]);

	console.log(`transactionType: ${searchConditions.transactionType}, assetTypeId: ${searchConditions.assetTypeId}, from: ${searchConditions.from}, to: ${searchConditions.to}, keyword: ${searchConditions.keyword}, isFiltered: ${isFiltered}`);
	// console.log("records!!!", dailyRecords);

	return (
		<>
			<div className={styles.header}>
				<div>구분</div>
				<div>자산명</div>
				<div>발생일</div>
				<div>금액</div>
				<div>메모</div>
				<div className={totalAssetStore.totalAsset < 0 ? styles.deficit : totalAssetStore.totalAsset > 0 ? styles.surplus : ""}>합계 {totalAssetStore.totalAsset.toLocaleString()}</div>
			</div>
			{dailyRecords?.pages?.map((page) =>
				page
					.filter((rec) => {
						if (!!passedAssetTypeId && !isFiltered) return rec.assetTypeId === passedAssetTypeId; // 검색 안하고 상세로 들어왔을 때
						if (isFiltered) {
							// 검색할 때
							let conditions = rec.transactionType === searchConditions.transactionType;
							if (!!searchConditions.keyword) conditions = conditions && rec.memo.includes(searchConditions.keyword);
							if (!!searchConditions.assetTypeId && searchConditions.assetTypeId !== "none") conditions = conditions && rec.assetTypeId === searchConditions.assetTypeId;

							if (!!searchConditions.from) conditions = conditions && dayjs(rec.registeredDate).isAfter(dayjs(searchConditions.from).startOf("day"));
							if (!!searchConditions.to) conditions = conditions && dayjs(rec.registeredDate).isBefore(dayjs(searchConditions.to).endOf("day"));

							return conditions;
						}
						return rec; // default
					})
					.map((rec) => <TableRow key={rec._id} userId={userId} record={rec} />)
			)}
			<div ref={ref} style={{ height: 50 }}></div>
		</>
	);
}
