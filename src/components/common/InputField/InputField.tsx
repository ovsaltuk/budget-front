import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import "./styles.scss";
import { HTMLInputTypeAttribute } from "react";

interface IInputFieldProps<TFieldValues extends FieldValues = FieldValues> {
    name: Path<TFieldValues>;
    register: UseFormRegister<TFieldValues>;
    type: HTMLInputTypeAttribute; 
    label?: string; 
    error?: string;
}

export const InputField = <TFieldValues extends FieldValues = FieldValues>({
    name,
    register,
    type,
    label,
    error
}: IInputFieldProps<TFieldValues>) => {
    return (
        <label className="input-label">
            <input 
                className="input" 
                type={type} 
                placeholder=" "
                {...register(name)} 
            />
            <span className="input-title">{label}</span>
            {error && <span className="input-error">*{error}</span>}
        </label>
    );
};
