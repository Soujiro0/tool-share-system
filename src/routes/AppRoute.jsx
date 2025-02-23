import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ActivityLogs from "../pages/ActivityLogs";
import Admin from "../pages/Admin";
import ConditionReport from "../pages/ConditionReports";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import Landing from "../pages/Landing";
import ManageAccounts from "../pages/ManageAccounts";
import Settings from "../pages/Settings";
import Transactions from "../pages/Transactions";
import ProtectedRoute from "./ProtectedRoute";


const WithNavbar = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);

const WithSidebar = () => (
    <div className="flex">
        <Sidebar />
        <div className="ml-64 w-full p-5 overflow-auto">
            <Outlet />
        </div>
    </div>
);

export const AppRoute = () => {
    return (
        <Routes>
            {/* Protect the entire sidebar layout */}
            <Route
                element={
                    <ProtectedRoute>
                        <WithSidebar />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/condition-reports" element={<ConditionReport />} />
                <Route path="/activity-logs" element={<ActivityLogs />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
            {/* Admin Accounts route available only for super_admin */}
            <Route
                element={
                    <ProtectedRoute requiredRole="super_admin">
                        <WithSidebar />
                    </ProtectedRoute>
                }
            >
                <Route path="/admin-accounts" element={<ManageAccounts />} />
            </Route>
            <Route element={<WithNavbar />}>
                <Route path="/" element={<Landing />} />
                <Route path="/admin" element={<Admin />} />
            </Route>
        </Routes>
    );
};
export default AppRoute;
