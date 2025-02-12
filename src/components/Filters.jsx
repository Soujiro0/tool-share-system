export const Filters = () => {
    return (
        <div className="flex justify-between items-center mb-4">
            <input type="text" placeholder="Search items..." className="border border-gray-300 rounded-md p-2 w-full max-w-xs" />
            <div className="flex space-x-2">
                <select className="border border-gray-300 rounded-md p-2">
                    <option>All Categories</option>
                </select>
                <select className="border border-gray-300 rounded-md p-2">
                    <option>Availability</option>
                </select>
                <select className="border border-gray-300 rounded-md p-2">
                    <option>Sort By</option>
                </select>
            </div>
        </div>
    );
};
export default Filters;
