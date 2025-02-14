import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../api/ApiService";
import LoginForm from "../components/forms/LoginForm";
import { AuthContext } from "../context/AuthContext";

export const SuperAdminLogin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the API to get the JWT token
            const data = await loginApi(username, password);
            // Update the AuthContext with the token
            login(data.token);
            // Redirect to the protected dashboard
            navigate("/inventory");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen text-center w-full">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Super Admin Login</h1>
                <p className="text-gray-600 mb-5">Sign in to access your Super Admin Dashboard</p>
                <LoginForm handleSubmit={handleSubmit} setUser={setUsername} setPassword={setPassword}/>
                <p className="my-3">Switch to:</p>
                <Link
                    to="/admin-login"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 block mt-2"
                >
                    <span>Admin Login</span>
                </Link>
            </div>
        </div>
    );
};

export default SuperAdminLogin;
