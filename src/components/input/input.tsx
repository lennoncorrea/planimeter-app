import { OutlinedInput } from "@mui/material";
import { ChangeEvent } from "react";

export default function Input(props: InputProps) {

    return (
        <OutlinedInput 
            className="input"
            placeholder={props.placeholder}
            onInput={props.onInput} 
            disabled={props.disabled}
            type="number" 
            inputProps={{ step: "0.01" }}
            style={{ marginBottom: '2rem' }} />
    )
}

interface InputProps {
    placeholder: string;
    disabled?: boolean;
    onInput: (e: ChangeEvent<HTMLInputElement>) => void;
}