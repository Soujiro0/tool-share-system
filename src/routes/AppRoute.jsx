import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ActivityLogs from "../pages/Admin/ActivityLogs";
import Inventory from "../pages/Admin/Inventory";
import ManageAccounts from "../pages/Admin/ManageAccounts";
import Transactions from "../pages/Admin/Transactions";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/Dashboards/AdminDashboard";
import FacultyDashboard from "../pages/Dashboards/FacultyDashboard";
import ApprovalList from "../pages/Faculty/ApprovalList";
import BorrowItem from "../pages/Faculty/BorrowItem";
import History from "../pages/Faculty/History";
import FacultyLogin from "../pages/FacultyLogin";
import Landing from "../pages/Landing";
import Settings from "../pages/Settings";
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

const WithFacultySidebar = () => (
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
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/activity-logs" element={<ActivityLogs />} />
                <Route path="/settings" element={<Settings />} />
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
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/activity-logs" element={<ActivityLogs />} />
                <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Faculty Routes */}
            <Route
                element={
                    <ProtectedRoute requiredRole="Faculty">
                        <WithFacultySidebar />
                    </ProtectedRoute>
                }
            >
                <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
                <Route path="/approval-list" element={<ApprovalList />} />
                <Route path="/history" element={<History />} />
                <Route path="borrow-item" element={<BorrowItem />} />
            </Route>

            {/* Public Routes */}
            <Route element={<WithNavbar />}>
                <Route path="/" element={<Landing />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/faculty" element={<FacultyLogin />} />
            </Route>
        </Routes>
    );
};

export default AppRoute;
