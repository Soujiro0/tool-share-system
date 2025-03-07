import { useContext, useEffect, useState } from "react";
import ApiService from "../../api/ApiService";
import { AuthContext } from "../../context/AuthContext";

const TransactionTable = () => {
    const { auth } = useContext(AuthContext);
    const { token } = auth;

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const data = await ApiService.TransactionService.getTransactions(token);
            setTransactions(data.transactions);
        } catch (error) {
            console.error("Error fetching transactions:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateTransactionStatus = async (transactionId, status) => {
        try {
            await ApiService.TransactionService.updateTransactionStatus(token, transactionId, status);
            fetchTransactions();
        } catch (error) {
            console.error("Error updating transaction status:", error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">Transaction ID</th>
                            <th className="py-2 px-4">Request ID</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <tr key={transaction.transaction_id} className="border-t text-sm">
                                    <td className="py-2 px-4">{transaction.transaction_id}</td>
                                    <td className="py-2 px-4">{transaction.request_id}</td>
                                    <td className="py-2 px-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                transaction.transaction_status === "PENDING_ADMIN_APPROVAL"
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : transaction.transaction_status === "BORROWED"
                                                    ? "bg-green-100 text-green-600"
                                                    : transaction.transaction_status === "REJECTED"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            {transaction.transaction_status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex gap-2">
                                            <button
                                                className="bg-green-500 text-white px-3 py-1 rounded-full"
                                                onClick={() => handleUpdateTransactionStatus(transaction.transaction_id, "BORROWED")}
                                                disabled={transaction.transaction_status !== "PENDING_ADMIN_APPROVAL"}
                                            >
                                                Allow Request
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded-full"
                                                onClick={() => handleUpdateTransactionStatus(transaction.transaction_id, "REJECTED")}
                                                disabled={transaction.transaction_status !== "PENDING_ADMIN_APPROVAL"}
                                            >
                                                Reject Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500 py-4">
                                    No transactions found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TransactionTable;