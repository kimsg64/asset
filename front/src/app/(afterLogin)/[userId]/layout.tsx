import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getAssets } from "./_lib/getAssets";

type Props = { children: React.ReactNode; params: { userId: string } };

export default async function Layout({ children, params }: Props) {
	const { userId } = params;

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({ queryKey: ["users", userId, "assets"], queryFn: getAssets });
	const dehydratedState = dehydrate(queryClient);

	return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
}
