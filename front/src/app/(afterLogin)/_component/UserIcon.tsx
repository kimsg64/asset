"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { faker } from "@faker-js/faker";

import * as styles from "./afterLogin.css";

export default function UserIcon() {
	const { data: session } = useSession();
	const router = useRouter();

	const onClickUserThumbnail = () => {
		signOut({ redirect: false });
		router.replace("/login");
	};

	return (
		<div className={styles.user} onClick={onClickUserThumbnail}>
			<img className={styles.thumbnail} src={faker.image.avatar()} alt={session?.user?.email as string} />
			<div className={styles.username}>{session?.user?.name} 님</div>
		</div>
	);
}
