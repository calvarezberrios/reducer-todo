import { useState } from "react";

export default function useForm(initialValue) {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue({...value, [e.target.name]: e.target.type !== "text" ? !e.target.checked : e.target.value});
    }

    return [value, handleChange];
}