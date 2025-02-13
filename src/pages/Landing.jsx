import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to ToolShare</h1>
            <p className="text-gray-700 max-w-2xl mb-6">
                ToolShare is a system designed to help manage borrowing and tracking of tools efficiently. Whether you are an admin managing inventory
                or a borrower requesting tools, we&aposve got you covered.
            </p>
            <div className="space-x-4">
                <Link to="/borrower-form" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
                    Borrow an Item
                </Link>
                <Link to="/admin-login" className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition">
                    Admin Login
                </Link>
            </div>
        </div>
    );
};

export default Landing;
