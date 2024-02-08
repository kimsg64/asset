import Link from "next/link";

import { auth } from "@/auth";
import { faker } from "@faker-js/faker";

import * as styles from "./afterLogin.css";

export default async function Header() {
    const session = await auth();

    return (
        <header className={styles.header}>
            <div className={styles.user}>
                <img className={styles.thumbnail} src={faker.image.avatar()} alt={session?.user?.email as string} />
                <div className={styles.username}>{session?.user?.name} 님</div>
            </div>
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
            </nav>
        </header>
    );
}
