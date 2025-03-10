import RequestBorrow from "@/pages/Instructor/RequestBorrow";
import YourRequests from "@/pages/Instructor/YourRequests";
import { Outlet, Route, Routes } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Inventory from "../pages/Admin/Inventory";
import ManageAccounts from "../pages/Admin/ManageAccounts";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/Dashboards/AdminDashboard";
import InstructorDashboard from "../pages/Dashboards/InstructorDashboard";
import InstructorLogin from "../pages/InstructorLogin";
import Landing from "../pages/Landing";
import ProtectedRoute from "./ProtectedRoute";

const WithSidebar = () => (
    <div className="flex">
        <Sidebar />
        <div className="ml-64 w-full p-3 overflow-auto">
            <Outlet />
        </div>
    </div>
);

const AppRoute = () => {
    return (
        <Routes>
            {/* Super Admin Routes */}
            <Route
                element={
                    <ProtectedRoute requiredRole="Super Admin">
                        <WithSidebar />
                    </ProtectedRoute>
                }
            >
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-accounts" element={<ManageAccounts />} /> {/* Only Super Admin */}
                <Route path="/inventory" element={<Inventory />} />
            </Route>

            {/* Admin Routes (No Admin Accounts) */}
            <Route
                element={
                    <ProtectedRoute requiredRole="Admin">
                        <WithSidebar />
                    </ProtectedRoute>
                }
            >
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/inventory" element={<Inventory />} />
            </Route>

            {/* Faculty Routes */}
            <Route
                element={
                    <ProtectedRoute requiredRole="Instructor">
                        <WithSidebar />
                    </ProtectedRoute>
                }
            >
                <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
                <Route path="/request-borrow" element={<RequestBorrow />} />
                <Route path="/your-requests" element={<YourRequests />}/>
            </Route>

            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/instructor" element={<InstructorLogin />} />
        </Routes>
    );
};

export default AppRoute;
