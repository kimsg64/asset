"use client";
// react, next
import { useFormState, useFormStatus } from "react-dom";

import signup from "./_lib/signup";
import * as style from "@/app/(beforeLogin)/beforeLogin.css";

function showMessage(messageCode: string) {
    if (messageCode === "already_exist") return "이미 가입된 계정입니다.";
    if (messageCode === "no_id") return "아이디를 입력하세요.";
    if (messageCode === "no_password") return "비밀번호를 입력하세요.";
    if (messageCode === "no_passwordChecker") return "비밀번호를 확인하세요.";
    if (messageCode === "password_not_matched") return "비밀번호가 일치하지 않습니다.";
    if (messageCode === "no_name") return "이름을 입력하세요.";
    return "";
}

export default function Page() {
    const [state, formAction] = useFormState(signup, { message: "" });
    const { pending } = useFormStatus();

    // console.log(state.message);

    return (
        <form className={style.form} action={formAction}>
            <h2 className={style.formTitle}>Sign Up</h2>
            <div className={style.formInputWrapper}>
                <label htmlFor="name">NAME</label>
                <input id="name" name="name" type="text" placeholder="NAME" required />
            </div>
            <div className={style.formInputWrapper}>
                <label htmlFor="id">EMAIL</label>
                <input id="id" name="id" type="email" placeholder="EMAIL" required />
            </div>
            <div className={style.formInputWrapper}>
                <label htmlFor="password">PASSWORD</label>
                <input id="password" name="password" type="password" placeholder="PASSWORD" required />
            </div>
            <div className={style.formInputWrapper}>
                <label htmlFor="passwordChecker">PASSWORD CHECK</label>
                <input id="passwordChecker" name="passwordChecker" type="password" placeholder="PASSWORD CHECK" required />
            </div>
            <button type="submit" disabled={pending}>
                SIGN UP!
            </button>
            <div className={style.formMessage}>{showMessage(state?.message)}</div>
        </form>
    );
}
