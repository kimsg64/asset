import UpdateModal from "@/app/(afterLogin)/[userId]/daily/_component/UpdateModal";

type Props = {
	params: { dailyRecordId: string; userId: string };
};

export default function Page({ params }: Props) {
	console.log("no you never know", params);
	return <UpdateModal dailyRecordId={params.dailyRecordId} userId={params.userId} />;
}
