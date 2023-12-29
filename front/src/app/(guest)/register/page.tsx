"use client";
// react, next
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// libs
import { signIn } from "next-auth/react";
import axios from "axios";

// custom modules
import Apis from "@/app/api/api";
import { ICreateUserReq, IUser } from "@interfaces/IFcUser";

// custom components
import Input from "@/app/_component/Input";

// custom styles
import Form from "@/app/_component/Form.module.css";
import SubTitle from "@/app/_component/SubTitle.module.css";
import Button from "@/app/_component/Button.module.css";

export default function Page() {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordChecker, setPasswordChecker] = useState("");
    const [isPasswordAvailable, setIsPasswordAvailable] = useState(false);
    const [isSubmittable, setIsSubmittable] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        setIsPasswordAvailable(!!password && !!passwordChecker && password === passwordChecker);
    }, [password, passwordChecker]);
    useEffect(() => {
        setIsSubmittable(!!name && !!id && isPasswordAvailable);
    }, [name, id, isPasswordAvailable]);

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
    const onChangeId = (event: React.ChangeEvent<HTMLInputElement>) => setId(event.target.value);
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
    const onChangePasswordChecker = (event: React.ChangeEvent<HTMLInputElement>) => setPasswordChecker(event.target.value);
    const onSubmitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        const newUserReq: ICreateUserReq = { name, id, password };
        console.log("this will be a new user", newUserReq, isSubmittable);
        if (!isSubmittable) return;

        try {
            const createdUser: IUser = await Apis.post("/user/create", newUserReq);
            // router.push(`/login`);
            alert("created!");
            signIn();
            console.log("created!", createdUser);
        } catch (error) {
            if (axios.isAxiosError(error) && !!error.response) {
                setIsError(true);
                setError(error.response.data.message);
            }
        }
    };

    if (isError) {
        router.push(`/error?message=${error}`);
    }

    return (
        <main>
            <form className={Form.user} onSubmit={onSubmitForm}>
                <h3 className={SubTitle.default}>Sign Up</h3>
                <Input id="name" type="text" placeholder="NAME" value={name} onChange={onChangeName} />
                <Input id="id" type="text" placeholder="ID" value={id} onChange={onChangeId} />
                <Input id="password" type="password" placeholder="PASSWORD" value={password} onChange={onChangePassword} />
                <Input id="passwordChecker" type="text" placeholder="PASSWORD CHECK" value={passwordChecker} onChange={onChangePasswordChecker} />
                <button className={Button.default} type="submit">
                    CREATE!!!
                </button>
            </form>
        </main>
    );
}
