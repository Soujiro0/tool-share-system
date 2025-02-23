import PropTypes from "prop-types";

const DeleteItemAlert = ({ item, onConfirm }) => {
    return (
        <div className="rounded-lg max-w-sm text-center">
        <h2 className="text-2xl font-semibold text-red-600">Confirm Deletion</h2>
        <p className="mt-2 text-xl text-gray-700 p-5">
            Are you sure you want to delete <strong>{item.id} - {item.name}</strong> ?
        </p>
        <div className="mt-4 flex justify-center gap-4">
            <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full"
            >
                Confirm
            </button>
        </div>
    </div>
    );
};

DeleteItemAlert.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default DeleteItemAlert;