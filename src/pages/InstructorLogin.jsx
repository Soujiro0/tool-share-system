import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../api/ApiService";
import LoginForm from "../components/forms-old/LoginForm";
import { AuthContext } from "../context/AuthContext";

const InstructorLogin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await ApiService.LoginService.loginApi(username, password);
            login(data.token);

            navigate("/instructor-dashboard");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen text-center w-full">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Instructor Login</h1>
                <p className="text-gray-600 mb-5">Sign in to access your Instructor Dashboard</p>
                <LoginForm handleSubmit={handleSubmit} setUser={setUsername} setPassword={setPassword}/>
            </div>
        </div>
    );
};

export default InstructorLogin;
