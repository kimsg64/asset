"use client";
import { useModalStore } from "@/store/modal";

import * as styles from "./background.css";

type Props = { children: React.ReactNode };

export default function Background({ children }: Props) {
    const modalStore = useModalStore();

    return <div className={modalStore.isOverflowHidden ? styles.hidden : styles.normal}>{children}</div>;
}
