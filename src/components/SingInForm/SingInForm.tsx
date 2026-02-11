import { useForm } from "react-hook-form";
import { singInSchema, SingInValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import "./styles.scss";
import { InputField } from "../common/InputField/InputField";
import { Button } from "../common/Button/Button";
import { userApi } from "../../api/userApi";

const SingInForm = () => {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<SingInValues>({
        resolver: zodResolver(singInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: SingInValues) => {
        try {
            const response = await userApi.login(data);
            const { token, user } = response.data; // Извлекаем token и user

            // ✅ Шаг 2: Сохраняем токен
            localStorage.setItem("token", token);

            console.log("✅ Токен сохранен:", token);
            console.log("✅ Пользователь:", user);

            // TODO: Переход на dashboard (позже)
            alert("Успешный вход! Токен сохранен.");
        } catch (error: any) {
            console.error("Ошибка логина:", error.response?.data?.error);
            setError("root", {
                message: error.response?.data?.error || "Ошибка входа"
            });
        }
    };

    return (<div className="form-container">
        <h3 className="title">Вход</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <InputField register={register} name="email" label="Email" type="email" error={errors.email?.message} />
            <InputField register={register} name="password" label="Password" type="password" error={errors.password?.message} />
            <Button text="Войти" disabled={isSubmitting} type="submit" />
        </form>

    </div>)
}

export default SingInForm;