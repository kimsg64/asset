import BodyStopper from "@/app/(afterLogin)/[userId]/_component/BodyStopper";
import FormZone from "./_component/FormZone";
import ItemBoxesZone from "./_component/ItemBoxesZone";

type Props = { params: { userId: string } };

export default function Page({ params }: Props) {
	const { userId } = params;
	console.log("userId!!", userId);
	return (
		<>
			<BodyStopper>
				<FormZone userId={userId} />
				<ItemBoxesZone userId={userId} />
			</BodyStopper>
		</>
	);
}
