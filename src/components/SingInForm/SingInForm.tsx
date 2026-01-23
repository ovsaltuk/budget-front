import { useForm } from "react-hook-form";
import { singInSchema, SingInValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import "./styles.scss";
import { InputField } from "../common/InputField/InputField";
import { Button } from "../common/Button/Button";

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
            <InputField register={register} name="email" label="Email" type="email" error={errors.email?.message}/>
            <InputField register={register} name="password" label="Password" type="password" error={errors.password?.message}/>
            <Button text="Войти" disabled={isSubmitting} type="submit"/>
        </form>

    </div>)
}

export default SingInForm;