export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <>
            <nav className="mt-10 mb-2 flex justify-end">
                <ul className="flex gap-5 list-none">
                    <li>
                        <button
                            className="p-1 bg-amber-50 rounded-2xl"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                    </li>
                    {pageNumbers.map((number) => (
                        <li key={number}>
                            <button
                                onClick={() => handlePageChange(number)}
                                style={{
                                    fontWeight: currentPage === number ? "bold" : "normal",
                                    backgroundColor: currentPage === number ? "#ccc" : "transparent",
                                }}
                                className="p-1 rounded-2xl"
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            className="p-1 bg-amber-50 rounded-2xl"
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

Pagination.propTypes;

export default Pagination;
