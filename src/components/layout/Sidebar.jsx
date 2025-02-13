import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
library.add(fas);

export const Sidebar = () => {

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", icon: "chart-line", active: true },
        { name: "Inventory", icon: "boxes" },
        { name: "Transactions", icon: "sync-alt" },
        { name: "Condition Reports", icon: "file-alt" },
        { name: "Settings", icon: "cog" },
    ];

    return (
        <div className="p-4 bg-white w-64 min-h-screen">
            <h1 onClick={() => {
                logout();
                navigate("/")
            }} className="text-xl font-bold mb-4">ToolShare</h1>
            <ul className="space-y-2">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <a
                            href="#"
                            className={`gap-5 flex items-center p-2 rounded transition-colors duration-200 ${
                                item.active ? "text-blue-600 bg-blue-100" : "text-gray-700 hover:text-blue-600"
                            }`}
                        >
                            <FontAwesomeIcon icon={item.icon}/>
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
