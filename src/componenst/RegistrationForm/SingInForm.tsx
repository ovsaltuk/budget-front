import { useForm } from "react-hook-form";
import { singInSchema, SingInValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

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

    return (<>
        <h3>Вход</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <label>
                <span>Email</span>
                <input type="email" {...register("email")} />
            </label>

            <label>
                <span>Пароль</span>
                <input type="password" {...register("password")} />
            </label>

            <button type="submit" disabled={isSubmitting}>
                Войти
            </button>
        </form>

    </>)
}

export default SingInForm;