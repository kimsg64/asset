type Props = { queryKey: [_1: string, string, _3: string, { from: string; to: string; assetTypeId?: string; transactionType?: string; memo?: string }] };

export const getFilteredRecords = async ({ queryKey }: Props) => {
	const [_1, userId, _3, urlParams] = queryKey;
	const queryString = new URLSearchParams(urlParams).toString();
	console.log("queryString", queryString);
	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/daily/filter/${userId}?${queryString}`, {
		next: { tags: ["users", userId, "daily", "stats"] },
		cache: "no-store",
		credentials: "include",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
};
