import { FormEvent, ReactNode } from "react";

export default function Form(props: FormProps) {
    return (
        <>
            <form onSubmit={props.onSubmit}>
                {props.children}
            </form>
        </>
    )
}

interface FormProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
}