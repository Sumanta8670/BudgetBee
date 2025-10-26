import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";

const Home = () => {
    useUser();
    return (
        <div>
            <Dashboard activeMenu="Dashboard">
                This is Home Page
            </Dashboard>
        </div>
    )
}

export default Home;