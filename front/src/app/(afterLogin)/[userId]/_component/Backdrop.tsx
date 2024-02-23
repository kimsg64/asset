"use client";
import CancelButton from "./CancelButton";
import * as styles from "./backdrop.css";

type Props = { children: React.ReactNode };

export default function Backdrop({ children }: Props) {
	return (
		<div className={styles.modalBackdrop}>
			<div className={styles.modalBodyWrapper}>
				<CancelButton />
				{children}
			</div>
		</div>
	);
}
