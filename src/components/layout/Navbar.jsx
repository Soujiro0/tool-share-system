import { library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
library.add(faS);

export const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">ToolShare</h1>
            <div className="space-x-4 flex items-center">
            </div>
        </nav>
    );
};

export default Navbar;
