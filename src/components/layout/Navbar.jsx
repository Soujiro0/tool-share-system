import { library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
library.add(faS);

export const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            
            <Link to="/">
            <h1 className="text-xl font-bold">ToolShare</h1>
            </Link>
            <div className="space-x-4 flex items-center">
            </div>
        </nav>
    );
};

export default Navbar;
