import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-10">ToolShare</h1>
            <div className="flex flex-col p-2 gap-2">
                <Link to="/faculty" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
                    Faculty Login
                </Link>
                <Link to="/admin" className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition">
                    Admin Login
                </Link>
            </div>
        </div>
    );
};

export default Landing;
