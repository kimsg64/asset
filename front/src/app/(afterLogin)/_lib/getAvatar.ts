export const getAvatar = async (email: string) => {
	if (!email) return;
	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/avatar/${email}`, {
		credentials: "include",
	});

	console.log("get avatar!!!", res);

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
};
