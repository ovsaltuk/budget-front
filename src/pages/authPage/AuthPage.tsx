import { useState } from "react";
import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm";
import SingInForm from "../../components/SingInForm/SingInForm";
import "./styles.scss";

const AuthPage = () => {
    const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');

    return (<div className="auth-page">
        {
            activeForm === "login" ? <SingInForm toggleForm={() => setActiveForm('register')} /> : <RegistrationForm toggleForm={() => setActiveForm('login')} />
        }
    </div>)
}

export default AuthPage;