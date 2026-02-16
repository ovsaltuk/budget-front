import { useForm } from "react-hook-form";
import { singInSchema, SingInValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import "./styles.scss";
import { InputField } from "../common/InputField/InputField";
import { Button } from "../common/Button/Button";
import { useAuthStore } from "../../stores/useAuthStore/useAuthStore";

interface ISingInFormProps {
    toggleForm?: () => void;
}

const SingInForm = ({toggleForm}: ISingInFormProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SingInValues>({
        resolver: zodResolver(singInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const login = useAuthStore((state) => state.login);

    const onSubmit = async (data: SingInValues) => {
        const success = await login({ email: data.email, password: data.password });
        if (success) {
            console.log("✅ Логин через Zustand!");
        } else {
            alert('ошибка авторизации');
        }
    };

    return (<div className="form-container">
        <h3 className="title">Вход</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <InputField register={register} name="email" label="Email" type="email" error={errors.email?.message} />
            <InputField register={register} name="password" label="Password" type="password" error={errors.password?.message} />
            <div className="button-container">
                <Button text="Вход" disabled={isSubmitting} type="submit" />
                <span onClick={toggleForm}>Регистрация</span>
            </div>
        </form>
    </div>)
}

export default SingInForm;