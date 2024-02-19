import Link from "next/link";

import { auth } from "@/auth";

import UserIcon from "./UserIcon";
import ColorModeIcon from "./ColorModeIcon";
import * as styles from "./afterLogin.css";

export default async function Header() {
	const session = await auth();

	return (
		<header className={styles.header}>
			<UserIcon />
			<Link href={`/home`}>
				<h2>Learning Next.js</h2>
			</Link>
			<nav>
				<Link className={styles.navItem} href={`/${session?.user?.email}/asset`}>
					자산
				</Link>
				<Link className={styles.navItem} href={`/${session?.user?.email}/daily`}>
					일간
				</Link>
				<ColorModeIcon />
			</nav>
		</header>
	);
}
