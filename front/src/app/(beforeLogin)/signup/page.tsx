"use client";
// react, next
import { useFormState, useFormStatus } from "react-dom";

import signup from "./_lib/signup";
import { showMessage } from "./_lib/shouMessage";

import * as styles from "@/app/(beforeLogin)/beforeLogin.css";
import Link from "next/link";
import ImagePreviewer from "../_component/ImagePreviewer";

export default function Page() {
	const [state, formAction] = useFormState(signup, { message: "" });
	const { pending } = useFormStatus();

	// console.log(state.message);

	return (
		<form className={styles.form} action={formAction}>
			<h2 className={styles.formTitle}>Sign Up</h2>
			<div className={styles.formInputWrapper}>
				<label htmlFor="name">NAME</label>
				<input id="name" name="name" type="text" placeholder="NAME" required />
			</div>
			<div className={styles.formInputWrapper}>
				<label htmlFor="id">EMAIL</label>
				<input id="id" name="id" type="email" placeholder="EMAIL" required />
			</div>
			<div className={styles.formInputWrapper}>
				<label htmlFor="password">PASSWORD</label>
				<input id="password" name="password" type="password" placeholder="PASSWORD" required />
			</div>
			<div className={styles.formInputWrapper}>
				<label htmlFor="passwordChecker">PASSWORD CHECK</label>
				<input id="passwordChecker" name="passwordChecker" type="password" placeholder="PASSWORD CHECK" required />
			</div>
			{/* <ImagePreviewer /> */}
			{/* <div className={styles.formInputWrapper}>
				<label htmlFor="avatar">IMAGE</label>
				<input id="avatar" className={styles.fileUploadInput} name="avatar" type="file" accept="image/*" required />
			</div> */}
			<button type="submit" className={styles.button} disabled={pending}>
				SIGN UP
			</button>
			<Link href={`/login`}>
				<button type="button" className={styles.button}>
					TO LOGIN PAGE
				</button>
			</Link>
			<div className={styles.formMessage}>{showMessage(state?.message)}</div>
		</form>
	);
}
