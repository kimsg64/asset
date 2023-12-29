import React from "react";
import InputStyle from "@/app/_component/Input.module.css";

type Props = {
    id: string;
    type: "text" | "password" | "date" | "number";
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    isError?: boolean;
    maxLength?: number;
};

export default function Component({ id, type, value, onChange, placeholder, isError, maxLength }: Props) {
    return (
        <label htmlFor={id}>
            <input
                id={id}
                className={isError ? InputStyle.error : InputStyle.default}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                autoComplete="off"
            />
        </label>
    );
}
