import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../ui/Modal";
library.add(fas);

export const Sidebar = () => {
    const { logout, auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const baseMenuItems = [
        { name: "Dashboard", icon: "chart-line", to: "/dashboard" },
        { name: "Inventory", icon: "boxes", to: "/inventory" },
        { name: "Transactions", icon: "sync-alt", to: "/transactions" },
        { name: "Condition Reports", icon: "file-alt", to: "/condition-reports" },
        { name: "Activity Logs", icon: "book", to: "/activity-logs" },
        { name: "Settings", icon: "cog", to: "/settings" },
    ];

    const menuItems = [...baseMenuItems];

    if (auth.user && auth.user.role === "super_admin") {
        menuItems.splice(1, 0, {
            name: "Admin Accounts",
            icon: "user-tie",
            to: "/admin-accounts",
        });
    }

    const openLogoutModal = () => setIsLogoutModalOpen(true);
    const closeLogoutModal = () => setIsLogoutModalOpen(false);

    const confirmLogout = () => {
        closeLogoutModal();
        logout();
        navigate("/");
    };

    return (
        <>
            <div className="fixed left-0 top-0 h-screen w-64 bg-gray-200 shadow-md flex flex-col">
                <div className="p-4">
                    <h1 className="text-xl font-bold mb-4">ToolShare</h1>
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `flex items-center gap-5 p-3 rounded transition-colors duration-200 ${
                                            isActive ? "text-blue-600 bg-blue-100 rounded-2xl" : "text-gray-700 hover:text-blue-600"
                                        }`
                                    }
                                >
                                    <FontAwesomeIcon icon={["fas", item.icon]} />
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-auto p-4">
                    <button
                        onClick={openLogoutModal}
                        className="flex items-center gap-5 p-2 rounded w-full text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                    >
                        <FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
                        Logout
                    </button>
                </div>
                <Modal
                    isOpen={isLogoutModalOpen}
                    onClose={closeLogoutModal}
                    buttonLayout="horizontal"
                    extraButtons={[
                        {
                            label: "Confirm Logout",
                            onClick: confirmLogout,
                            className: "bg-blue-600 text-white px-4 py-2 rounded-md w-full",
                        },
                    ]}
                >
                    <p className="text-2xl text-center font-bold mb-5 p-5">Are you sure you want to Log out?</p>
                </Modal>
            </div>
        </>
    );
};

export default Sidebar;
