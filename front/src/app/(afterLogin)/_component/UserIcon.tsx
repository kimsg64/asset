import { faker } from "@faker-js/faker";

import * as styles from "./afterLogin.css";
import Link from "next/link";
import { auth } from "@/auth";

export default async function UserIcon({ src }: { src: string }) {
	const session = await auth();

	if (!session) return null;

	return (
		<>
			<Link className={styles.user} href={`/${session?.user?.email}/profile`}>
				{/* <span className={styles.user}> */}
				<img className={styles.thumbnail} src={!!src ? src : faker.image.avatar()} alt={session?.user?.email as string} />
				<div className={styles.username}>{session?.user?.name} 님</div>
				{/* </span> */}
			</Link>
		</>
	);
}
