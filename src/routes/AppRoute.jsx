import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Admin from "../pages/Admin";
import BorrowingForm from "../pages/BorrowingForm";
import ConditionReport from "../pages/ConditionReports";
import Dashboard from "../pages/Dashboard";
import InventoryManagement from "../pages/InventoryManagement";
import Landing from "../pages/Landing";
import Settings from "../pages/Settings";
import SuperAdmin from "../pages/SuperAdmin";
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
        <Outlet />
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
                <Route path="/inventory" element={<InventoryManagement />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/condition-reports" element={<ConditionReport />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
            <Route element={<WithNavbar />}>
                <Route path="/" element={<Landing />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/super-admin" element={<SuperAdmin  />} />
                <Route path="/borrower-form" element={<BorrowingForm />} />
            </Route>
        </Routes>
    );
};
export default AppRoute;
