import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

export const AdminLogin = () => {
    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen text-center w-full">
            <div>
                <img
                    alt="Admin icon"
                    className="mx-auto mb-4"
                    height="50"
                    src="https://storage.googleapis.com/a1aa/image/K1si6rzk0k7IXyq7N3xMxYpYVq50_eQXR93gZ1P_D0U.jpg"
                    width="50"
                />
                <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                <p className="text-gray-600 mb-5">Sign in to access your Admin Dashboard</p>
                <LoginForm />

                <p className="my-3">Switch to:</p>
                <Link
                    to="/super-admin-login"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 block mt-2"
                >
                    <span>Super Admin Login</span>
                </Link>
            </div>
        </div>
    );
};

export default AdminLogin;
