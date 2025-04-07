import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LogoutDialog from "../dialogs/LogoutDialog";
library.add(fas);

const Sidebar = () => {
    const { logout, auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const baseAdminMenu = [
        // { name: "Dashboard", icon: "chart-line", to: "/admin-dashboard" },
        { name: "Inventory", icon: "boxes", to: "/inventory" },
        // { name: "History", icon: "clock-rotate-left", to: "/history" },
        { name: "Request Trasactions", icon: "clipboard", to: "/request-transactions" }
    ];

    const instructorMenu = [
        // { name: "Dashboard", icon: "chart-line", to: "/instructor-dashboard" },
        { name: "Request Borrow", icon: "hand-holding", to: "/request-borrow" },
        { name: "Your Requests", icon: "list", to: "/your-requests" },
    ];

    let menuItems = [];

    if (auth.user?.role === "SUPER_ADMIN") {
        menuItems = [...baseAdminMenu];
        menuItems.splice(1, 0, {
            name: "Manage Accounts",
            icon: "user-tie",
            to: "/admin-accounts",
        });
    } else if (auth.user?.role === "ADMIN") {
        menuItems = baseAdminMenu;
    } else if (auth.user?.role === "INSTRUCTOR") {
        menuItems = instructorMenu;
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
                <LogoutDialog isOpen={isLogoutModalOpen} onClose={closeLogoutModal} onConfirm={confirmLogout}/>
            </div>
        </>
    );
};

export default Sidebar;
