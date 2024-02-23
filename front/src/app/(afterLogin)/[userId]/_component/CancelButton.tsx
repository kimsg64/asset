"use client";
// react, next
import { useRouter } from "next/navigation";
import * as styles from "./cancelButton.css";
import { useModalStore, useUpdateModalStore } from "@/store/modal";

export default function CancelButton() {
	const router = useRouter();
	const modalStore = useModalStore();
	const updateModalStore = useUpdateModalStore();

	const onClickCancel = () => {
		modalStore.setIsOverflowHidden(false);
		updateModalStore.setRec(null);
		router.back();
	};
	return (
		<button className={styles.cancelButton} onClick={onClickCancel}>
			✖
		</button>
	);
}
