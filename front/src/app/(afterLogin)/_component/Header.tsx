import Link from "next/link";

import { auth } from "@/auth";

import * as styles from "./afterLogin.css";
import UserIcon from "./UserIcon";
// import ThemeIcon from "./ThemeIcon";
// import { getAvatar } from "../_lib/getAvatar";
import LogoutButton from "./LogoutButton";

export default async function Header() {
	const session = await auth();
	console.log("this is user!", session?.user);
	// const response = await getAvatar(session?.user?.email as string);
	// console.log("response", response);
	// const avatar = response.avatar;
	// const src = `data:${avatar.contentType};base64,${avatar.data?.data.toString("base64")}`;
	const src = "";

	return (
		<header className={styles.header}>
			<UserIcon src={src} />
			<Link href={`/home`}>
				<h2>Learning Next.js</h2>
			</Link>
			<nav className={styles.navContainer}>
				<Link className={styles.navItem} href={`/${session?.user?.email}/asset`}>
					자산
				</Link>
				<Link className={styles.navItem} href={`/${session?.user?.email}/daily`}>
					일간
				</Link>
				<LogoutButton />
				{/* <ThemeIcon /> */}
			</nav>
		</header>
	);
}
