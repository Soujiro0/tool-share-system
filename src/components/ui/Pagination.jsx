import PropTypes from 'prop-types';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const maxButtons = 10;
        const halfMaxButtons = Math.floor(maxButtons / 2);
        let startPage = Math.max(1, currentPage - halfMaxButtons);
        let endPage = Math.min(totalPages, currentPage + halfMaxButtons);

        if (currentPage <= halfMaxButtons) {
            endPage = Math.min(totalPages, maxButtons);
        } else if (currentPage + halfMaxButtons >= totalPages) {
            startPage = Math.max(1, totalPages - maxButtons + 1);
        }

        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <>
            <nav className="mt-3 mb-2 flex justify-end">
                <ul className="flex gap-5 list-none">
                    <li>
                        <button
                            className="p-1 rounded-2xl"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                    </li>
                    {getPageNumbers().map((number) => (
                        <li key={number}>
                            <button
                                onClick={() => handlePageChange(number)}
                                style={{
                                    fontWeight: currentPage === number ? "bold" : "normal",
                                    backgroundColor: currentPage === number ? "#ccc" : "transparent",
                                }}
                                className="p-1"
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            className="p-1"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
