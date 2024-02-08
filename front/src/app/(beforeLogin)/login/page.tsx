"use client";
// react, next
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

// libs
import { useSession, signOut, signIn } from "next-auth/react";

// custom styles
import * as style from "@/app/(beforeLogin)/beforeLogin.css";
import Link from "next/link";

export default function Page() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();
    const { data: session } = useSession();

    if (session) {
        router.replace("/home");
    }

    const onChangeId: ChangeEventHandler<HTMLInputElement> = (event) => setId(event.target.value);
    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (event) => setPassword(event.target.value);
    const onSubmitForm: FormEventHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await signIn("credentials", {
                username: id,
                password,
                redirect: false,
            });
            if (response?.ok) {
                router.replace("/home");
            } else {
                setMessage("아이디와 비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            console.log(error);
            setMessage("아이디와 비밀번호가 일치하지 않습니다.");
        }
    };

    return (
        <form className={style.form} onSubmit={onSubmitForm}>
            <h2 className={style.formTitle}>Sign In</h2>
            <div className={style.formInputWrapper}>
                <label htmlFor="id">ID</label>
                <input id="id" type="email" placeholder="ID" value={id} onChange={onChangeId} />
            </div>
            <div className={style.formInputWrapper}>
                <label htmlFor="password">PASSWORD</label>
                <input id="password" type="password" placeholder="PASSWORD" value={password} onChange={onChangePassword} />
            </div>
            <div className={style.formMessage}>{message}</div>
            <button type="submit">LOGIN!</button>
            <Link href={`/signup`}>
                <button type="button">SIGN UP!</button>
            </Link>
        </form>
    );
}
