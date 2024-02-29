"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { DefaultError, InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useModalStore } from "@/store/modal";
// import { useTotalAssetStore } from "@/store/totalAsset";

import dayjs from "dayjs";

import { IDailyInput, SearchConditions } from "@/interfaces/IDaily";
import { getDailyRecords } from "../_lib/getDailyRecords";

import TableRow from "./TableRow";
import * as styles from "./tableRow.css";
import NoData from "./NoData";

type Props = { userId: string; isFiltered: boolean; searchConditions: SearchConditions };
const RECORDS_PER_PAGE = 10;

export default function RecordsZone({ userId, isFiltered, searchConditions }: Props) {
	// const totalAssetStore = useTotalAssetStore();
	const [filteredRecrods, setFilteredRecords] = useState<IDailyInput[]>([]);
	const modalStore = useModalStore();
	const { data: session } = useSession();
	const router = useRouter();
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
	useEffect(() => {
		if (dailyRecords && dailyRecords?.pages.length > 0) {
			setFilteredRecords(
				dailyRecords?.pages?.flat().filter((rec) => {
					if (!!passedAssetTypeId && !isFiltered) {
						console.log(`passedAssetTypeId: ${passedAssetTypeId}, isFiltered: ${isFiltered}`);
						return rec.assetTypeId === passedAssetTypeId;
					}
					if (isFiltered) {
						let conditions = searchConditions.transactionType === "all" || rec.transactionType === searchConditions.transactionType;
						if (!!searchConditions.keyword) conditions = conditions && rec.memo.includes(searchConditions.keyword);
						if (!!searchConditions.assetTypeId && searchConditions.assetTypeId !== "none") conditions = conditions && rec.assetTypeId === searchConditions.assetTypeId;

						if (!!searchConditions.from) conditions = conditions && dayjs(rec.registeredDate).isAfter(dayjs(searchConditions.from).startOf("day"));
						if (!!searchConditions.to) conditions = conditions && dayjs(rec.registeredDate).isBefore(dayjs(searchConditions.to).endOf("day"));

						return conditions;
					}
					return rec;
				})
			);
		}
	}, [searchConditions, passedAssetTypeId, isFiltered, dailyRecords]);

	// console.log(`transactionType: ${searchConditions.transactionType}, assetTypeId: ${searchConditions.assetTypeId}, from: ${searchConditions.from}, to: ${searchConditions.to}, keyword: ${searchConditions.keyword}, isFiltered: ${isFiltered}`);
	// console.log("records!!!", dailyRecords?.pages.flat());
	const onClickStats = () => {
		modalStore.setIsOverflowHidden(true);
		router.push(`/${session?.user?.email}/daily/stats`);
	};

	return (
		<>
			<div className={styles.header}>
				<div>구분</div>
				<div>자산명</div>
				<div>발생일</div>
				<div>금액</div>
				<div>메모</div>
				<button className={[styles.buttonInCell, styles.reverseButton].join(" ")} onClick={onClickStats}>
					통계
				</button>
			</div>
			{isFiltered || !!passedAssetTypeId ? (
				filteredRecrods.length > 0 ? (
					filteredRecrods.map((rec) => <TableRow key={rec._id} userId={userId} record={rec} />)
				) : (
					<NoData />
				)
			) : (
				dailyRecords?.pages?.map((page, pageIdx) => {
					return page.map((rec) => <TableRow key={rec._id} userId={userId} record={rec} />);
				})
			)}
			<div ref={ref} style={{ height: 50 }}></div>
		</>
	);
}
