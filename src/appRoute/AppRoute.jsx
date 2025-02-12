import { Route, Routes } from "react-router-dom";
import InventoryManagement from "../pages/InventoryManagement";

export const AppRoute = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={<InventoryManagement />}></Route>
            </Routes>
        </>
    );
};
export default AppRoute;