import PropTypes from "prop-types";

export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 bg-black flex opacity-50"></div>
            <div className="fixed inset-0 flex justify-center items-center">
                <div className="bg-white p-6 rounded-md shadow-md w-96">
                    {children}
                    <button onClick={onClose} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md w-full">
                        Close
                    </button>
                </div>
            </div>
        </>
    );
};

export default Modal;

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
};
