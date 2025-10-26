import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";

const Income = () => {
    useUser();
    
    return (
        <Dashboard activeMenu="Income">
            This is Income Page
        </Dashboard>
    )
}
export default Income;