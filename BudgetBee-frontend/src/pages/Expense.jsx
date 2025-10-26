import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";

const Expense = () => {
    useUser();
    
    return (
        <Dashboard activeMenu="Expense">
            This is Expense Page
        </Dashboard>
    )
}
export default Expense;