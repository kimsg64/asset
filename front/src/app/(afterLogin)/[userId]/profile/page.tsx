"use client";
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useFormStatus } from "react-dom";

import { showMessage } from "@/app/(beforeLogin)/signup/_lib/shouMessage";
import * as styles from "@/app/(beforeLogin)/beforeLogin.css";
import ImagePreviewer from "@/app/(beforeLogin)/_component/ImagePreviewer";

type Props = { params: { userId: string } };
export default function Page({ params }: Props) {
	const { data: session, update, status } = useSession();
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordChecker, setPasswordChecker] = useState("");
	const [message, setMessage] = useState("");
	const { pending } = useFormStatus();

	useEffect(() => {
		console.log("session status", status);
	}, []);

	useEffect(() => {
		if (!!session?.user?.name) {
			setName(session?.user?.name);
		}
	}, [session]);

	if (!session) return null;

	// console.log(state.message);
	const onChangeName: ChangeEventHandler<HTMLInputElement> = (event) => setName(event.target.value);
	const onChangePassword: ChangeEventHandler<HTMLInputElement> = (event) => setPassword(event.target.value);
	const onChangePasswordChecker: ChangeEventHandler<HTMLInputElement> = (event) => setPasswordChecker(event.target.value);
	const onSubmitForm: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		if (!name || !name.trim()) {
			setMessage("no_name");
		}
		if (!password || !password.trim()) {
			setMessage("no_password");
		}
		if (!passwordChecker || !passwordChecker.trim()) {
			setMessage("no_passwordChecker");
		}
		if (password !== passwordChecker) {
			setMessage("password_not_matched");
		}
		// if (!formData.get("avatar")) {
		// 	return { message: "no_avatar" };
		// }

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update`, {
				method: "put",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: params.userId,
					name,
					password,
				}),
				credentials: "include",
			});

			update({
				...session,
				name,
				password,
			});
			console.log("response", response);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<form className={styles.form} onSubmit={onSubmitForm}>
			<h2 className={styles.formTitle}>Profile Update</h2>
			<div className={styles.formInputWrapper}>
				<label htmlFor="name">NAME</label>
				<span className={styles.readonly}>{name}</span>
				{/* <input id="name" name="name" type="text" value={name} placeholder="NAME" required onChange={onChangeName} /> */}
			</div>
			<div className={styles.formInputWrapper}>
				<label htmlFor="email">EMAIL</label>
				<span className={styles.readonly}>{session?.user?.email}</span>
			</div>
			<div className={styles.formInputWrapper}>
				<label htmlFor="password">PASSWORD</label>
				<input id="password" name="password" value={password} type="password" placeholder="PASSWORD" required onChange={onChangePassword} />
			</div>
			<div className={styles.formInputWrapper}>
				<label htmlFor="passwordChecker">PASSWORD CHECK</label>
				<input id="passwordChecker" name="passwordChecker" value={passwordChecker} type="password" placeholder="PASSWORD CHECK" required onChange={onChangePasswordChecker} />
			</div>
			{/* <ImagePreviewer /> */}
			{/* <button type="submit" className={styles.button} disabled={pending}>
				UPDATE
			</button> */}
			<div className={styles.formMessage}>{showMessage(message)}</div>
		</form>
	);
}
