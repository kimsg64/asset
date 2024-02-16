import { IDailyInput } from "@/interfaces/IDaily";

type Props = { queryKey: [_1: string, string, _3: string]; pageParam?: number };

// query key로 object를 넣고 userId + 검색 조건을 넣으면 될듯?
export const getDailyRecords = async ({ queryKey, pageParam }: Props) => {
	const [_1, userId, _3] = queryKey;
	console.log(`pageparam: ${pageParam}`);
	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/daily/${userId}?cursor=${pageParam}`, {
		next: { tags: ["users", userId, "daily"] },
		cache: "no-store",
		credentials: "include",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json() as Promise<IDailyInput[]>;
};
