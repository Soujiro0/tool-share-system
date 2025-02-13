import PropTypes from "prop-types";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import AdminLogin from "../pages/AdminLogin";
import BorrowingForm from "../pages/BorrowingForm";
import InventoryManagement from "../pages/InventoryManagement";
import Landing from "../pages/Landing";
import SuperAdminLogin from "../pages/SuperAdminLogin";
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
                <Route path="/inventory" element={<InventoryManagement />} />
            </Route>
            <Route element={<WithNavbar />}>
                <Route path="/" element={<Landing />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/super-admin-login" element={<SuperAdminLogin />} />
                <Route path="/borrower-form" element={<BorrowingForm />} />
            </Route>
        </Routes>
    );
};
export default AppRoute;

WithNavbar.propTypes = {
    children: PropTypes.any,
};
