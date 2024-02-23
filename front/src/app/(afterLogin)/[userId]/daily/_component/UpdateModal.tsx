"use client";

// custom modules
import { useUpdateModalStore } from "@/store/modal";
import { IDailyInput } from "@/interfaces/IDaily";

import FormZone from "./FormZone";
import Backdrop from "@/app/(afterLogin)/[userId]/_component/Backdrop";

type Props = { dailyRecordId: string; userId: string };

export default function UpdateModal({ dailyRecordId, userId }: Props) {
	const updateModalStore = useUpdateModalStore();

	return (
		<Backdrop>
			<FormZone userId={userId} rec={updateModalStore.rec as IDailyInput} />
		</Backdrop>
	);
}
