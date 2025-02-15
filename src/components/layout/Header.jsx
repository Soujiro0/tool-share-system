export const Header = ({ onAdd }) => {
    return (
        <div className="flex justify-between items-center p-5 shadow-md bg-white">
            <h6 className="text-3xl font-bold">Inventory Management</h6>
            <button onClick={onAdd} className="bg-blue-600 text-white px-4 py-2 rounded-md">+ Add New Item</button>
        </div>
    );
};

Header.propTypes;

export default Header;