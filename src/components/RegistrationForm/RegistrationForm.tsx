import { useForm } from "react-hook-form"
import { Button } from "../common/Button/Button"
import { InputField } from "../common/InputField/InputField"
import { registrationSchema, RegistrationValues } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"


export const RegistrationForm = () => {
    const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<RegistrationValues>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }

    })

    return (<div className="form-container">
        <h3 className="title">Регистрация</h3>

        <form onSubmit={handleSubmit(()=>{})} className="form">
            <InputField register={register} name="email" label="Email" type="email" error={errors.email?.message} />
            <InputField register={register} name="password" label="Password" type="password" error={errors.password?.message} />
            <InputField register={register} name="confirmPassword" label="Password" type="password" error={errors.password?.message} />
            <Button text="Войти" disabled={isSubmitting} type="submit" />
        </form>
    </div>)
}