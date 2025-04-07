import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../api/ApiService";
import LoginForm from "../components/forms-old/LoginForm";
import { AuthContext } from "../context/AuthContext";

const Landing = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await ApiService.LoginService.loginApi(username, password);
            login(data.token);

            switch (data.role) {
                case "SUPER_ADMIN":
                    navigate("/admin-dashboard");
                    break;
                case "ADMIN":
                    navigate("/admin-dashboard");
                    break;
                case "INSTRUCTOR":
                    navigate("/instructor-dashboard");
                    break;
                default:
                    navigate("/");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-blue-100 flex items-center justify-center text-center p-6 gap-20">
            <div>
                <h1 className="text-4xl font-bold text-blue-600">ToolShare</h1>
                <p>Tools & Equipment Borrowing System</p>
            </div>
            <div>
                <LoginForm handleSubmit={handleSubmit} setUser={setUsername} setPassword={setPassword} />
            </div>
        </div>
    );
};

export default Landing;
