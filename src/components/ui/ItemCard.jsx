
export const ItemCard = ({ name, availability, availableQuantity }) => {
    return (
        <div className="border rounded-lg p-4 flex items-center space-x-4">
            <input type="checkbox" />
            <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                    <span>{name}</span>
                    <span className={availability ? "text-green-500" : "text-red-500"}>{availability ? "Available" : "Not Available"}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="number" defaultValue="1" className="w-12 border rounded-lg p-1" />
                    <span className="text-gray-500">Available: {availableQuantity}</span>
                </div>
            </div>
        </div>
    );
};

ItemCard.propTypes

export default ItemCard;