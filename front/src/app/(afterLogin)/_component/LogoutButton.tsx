"use client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import * as styles from "./afterLogin.css";

export default function LogoutButton() {
	const router = useRouter();
	const queryClient = useQueryClient();

	const onClickLogout = async () => {
		queryClient.invalidateQueries({ queryKey: ["users"] });
		await signOut({ redirect: false });
		await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/logout`, {
			method: "post",
			credentials: "include",
		});
		router.refresh();
		router.replace("/");
	};
	return (
		<span className={styles.navItem} onClick={onClickLogout}>
			로그아웃
		</span>
	);
}
