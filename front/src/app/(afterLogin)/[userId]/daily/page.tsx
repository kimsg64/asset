// react, next
import { DefaultError, HydrationBoundary, InfiniteData, QueryClient, dehydrate } from "@tanstack/react-query";

import { getDailyRecords } from "./_lib/getDailyRecords";
import DataZone from "./_component/DataZone";
import FormZone from "./_component/FormZone";
import { IDailyInput } from "@/interfaces/IDaily";

type Props = { params: { userId: string } };

export default async function Page({ params }: Props) {
	const { userId } = params;
	const queryClient = new QueryClient();
	await queryClient.prefetchInfiniteQuery<IDailyInput[], DefaultError, InfiniteData<IDailyInput[]>, [_1: string, string, _3: string], number>({
		queryKey: ["users", userId, "daily"],
		queryFn: getDailyRecords,
		initialPageParam: 0,
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<FormZone userId={userId} />
			<DataZone userId={userId} />
		</HydrationBoundary>
	);
}
