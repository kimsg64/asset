"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async (prevState: any, formData: FormData) => {
	// validation
	let shouldRedirect = false;
	if (!formData.get("id") || !(formData.get("id") as string).trim()) {
		return { message: "no_id" };
	}
	if (!formData.get("password") || !(formData.get("password") as string).trim()) {
		return { message: "no_password" };
	}
	if (!formData.get("passwordChecker") || !(formData.get("passwordChecker") as string).trim()) {
		return { message: "no_passwordChecker" };
	}
	if (formData.get("password") !== formData.get("passwordChecker")) {
		return { message: "password_not_matched" };
	}
	if (!formData.get("name") || !(formData.get("name") as string).trim()) {
		return { message: "no_name" };
	}
	// if (!formData.get("avatar")) {
	// 	return { message: "no_avatar" };
	// }

	try {
		// sign up

		// headers의 'Content-Type'은 default가 'multipart/form-data'이므로 이미지 업로드를 위해 생략
		const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: formData.get("id"),
				password: formData.get("password"),
				name: formData.get("name"),
				avatar: formData.get("avatar"),
			}),
			// body: formData,
			credentials: "include",
		});

		// duplication
		if (response.status === 500) {
			return { message: "already_exist" };
		}
		shouldRedirect = true;

		// login
		console.log("response!!!", await response.json());
		const result = await signIn("credentials", {
			username: formData.get("id"),
			password: formData.get("password"),
			redirect: false,
		});
	} catch (error) {
		console.log("signup error", error);
		return { message: "" };
	}

	// redirect to home
	if (shouldRedirect) {
		redirect("/home");
	}

	return { message: "" };
};
