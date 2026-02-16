import { Button } from "../../components/common/Button/Button";
import { useAuthStore } from "../../stores/useAuthStore/useAuthStore";
import "./styles.scss";

export const DashboardPage = () => {
    const authStore = useAuthStore();
    return <div className="dashboard-page">
        <Button text={"logout"} onClick={authStore.logout}/>
        <Button text={"all users"} onClick={authStore.getAllUsers}/>
    </div>
}