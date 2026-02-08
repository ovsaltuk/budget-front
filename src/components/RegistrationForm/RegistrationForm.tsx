import { useForm } from "react-hook-form"
import { Button } from "../common/Button/Button"
import { InputField } from "../common/InputField/InputField"
import { registrationSchema, RegistrationValues } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { userApi } from "../../api/userApi"
import { ICreateUserRequest } from "../../types/IUser"


export const RegistrationForm = () => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm<RegistrationValues>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }

    })

    const createUser = async ({ email, password }: ICreateUserRequest) => {
        try {
            const response = await userApi.createUser({ email, password });
            console.log(response);
        } catch (error: any) {
            setError("root", { message: error.response?.data?.error || "Ошибка регистрации. Попробуйте позже." });
            alert(errors.root?.message);
        }
    }

    return (<div className="form-container">
        <h3 className="title">Регистрация</h3>

        <form onSubmit={handleSubmit(({ ...data }: ICreateUserRequest) => { createUser(data) })} className="form">
            <InputField register={register} name="email" label="Email" type="email" error={errors.email?.message} />
            <InputField register={register} name="password" label="Password" type="password" error={errors.password?.message} />
            <InputField register={register} name="confirmPassword" label="Confirm password" type="password" error={errors.confirmPassword?.message} />
            <Button text="Зарегистрироваться" disabled={isSubmitting} type="submit" />
        </form>
    </div>)
}