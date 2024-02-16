"use client";

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useModalStore } from "@/store/modal";
import * as styles from "./modal.css";

type Props = { assetTypeId: string; assetName: string; userId: string };

export default function DeleteModal({ assetTypeId, assetName, userId }: Props) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const modalStore = useModalStore();
	const deleteAsset = useMutation({
		mutationFn: async (_event: MouseEvent) => {
			return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/asset/delete`, {
				method: "DELETE",
				credentials: "include",
				headers: { "Content-Type": "application/json; charset=UTF-8" },
				body: JSON.stringify({ assetTypeId }),
			});
		},
		onSuccess(_data, _variables, _context) {
			queryClient.invalidateQueries({ queryKey: ["users", userId, "assets"] });
			destroyModal();
		},
		onError(error, _variables, _context) {
			console.log("error!", error);
		},
	});
	const destroyModal = () => {
		modalStore.setIsOverflowHidden(false);
		router.back();
	};

	return (
		<div className={styles.modalBackdrop}>
			<div className={styles.modalBody}>
				<div className={styles.alert}>&apos;{assetName}&apos;을 삭제하시겠습니까?</div>
				<div className={styles.buttonsZone}>
					<button onClick={deleteAsset.mutate}>확인</button>
					<button onClick={destroyModal}>취소</button>
				</div>
			</div>
		</div>
	);
}
