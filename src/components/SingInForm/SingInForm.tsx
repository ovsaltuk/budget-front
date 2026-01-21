import { useForm } from "react-hook-form";
import { singInSchema, SingInValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import "./styles.scss";

const SingInForm = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SingInValues>({
        resolver: zodResolver(singInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const onSubmit = (data: SingInValues) => {
        console.log("form data:", data);
    };

    return (<div className="form-container">
        <h3 className="title">Вход</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <label className="input-label">
                <input className="input" type="email" {...register("email")} />
                <span className="input-title">Email</span>
            </label>

            <label className="input-label">
                <input className="input" type="password" {...register("password")} />
                <span className="input-title">Password</span>
            </label>

            <button type="submit" disabled={isSubmitting} className="button">
                Войти
            </button>
        </form>

    </div>)
}

export default SingInForm;