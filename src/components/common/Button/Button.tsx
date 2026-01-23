import { ButtonHTMLAttributes } from "react";
import "./styles.scss";


interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    variant?: 'primary' | 'secondary'
}

export const Button = ({
    text,
    variant = "primary",
    ...props
}: IButtonProps) => {
    return (<button className="button" {...props}>{text}</button>)
}