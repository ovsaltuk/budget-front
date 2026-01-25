import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm";
import SingInForm from "../../components/SingInForm/SingInForm";
import "./styles.scss";

const AuthPage = () => {
    return (<div className="auth-page">
        <SingInForm />
        <RegistrationForm />
    </div>)
}

export default AuthPage;