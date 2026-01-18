import { ChangeEvent, FormEvent, useState } from "react"
import {userApi} from "../api/userApi"

const UserForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: ''
    });


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formData)
            userApi.createUser({ name: formData.name, username: formData.username })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    } 


    return (<form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={handleChange} />
        <input type="text" name="username" onChange={handleChange} />
        <button type="submit">submit</button>
    </form>)
}


export default UserForm;