import StatsModal from "@/app/(afterLogin)/[userId]/daily/_component/StatsModal";
type Props = { params: { userId: string } };

export default function Page({ params }: Props) {
	console.log("no you never know", params);
	return (
		<>
			<StatsModal userId={params.userId} />
		</>
	);
}
