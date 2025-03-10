import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, children, buttonLayout, extraButtons }) => {
    if (!isOpen) return null;

    const buttonContainerClass = buttonLayout === "vertical" ? "mt-4 flex flex-col gap-4" : "mt-4 flex flex-row gap-4 justify-end";

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="fixed inset-0 flex justify-center items-center">
                <div className="bg-white p-6 rounded-md shadow-md w-full md:w-1/2 lg:w-1/3">
                    {children}
                    <div className={buttonContainerClass}>
                        {extraButtons &&
                            extraButtons.map((button, index) => (
                                <button key={index} onClick={button.onClick} className={button.className}>
                                    {button.label}
                                </button>
                            ))}
                        <button onClick={onClose} className="bg-gray-300 text-grey px-4 py-2 rounded-md w-full">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    buttonLayout: PropTypes.oneOf(["horizontal", "vertical"]),
    extraButtons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
            className: PropTypes.string,
        })
    ),
};

Modal.defaultProps = {
    buttonLayout: "horizontal",
    extraButtons: [],
};

export default Modal;
