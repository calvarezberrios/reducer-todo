import { useState } from "react";

export default function useForm(initialValue) {
    const [values, setValues] = useState(initialValue);

    const handleChanges = e => {
        setValues({
            ...values,
            [e.target.name]:
                e.target.type === "checkbox" || e.target.type === "radio" ?
                    e.target.checked : e.target.value
        });
    }

    return [values, handleChanges];
}