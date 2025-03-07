import Header from "../../components/layout/Header";
import TransactionTable from "../../components/tables/TransactionTable";

export const Transactions = () => {
    return(
        <>
            <div>
                <Header headerTitle={"Transactions"} />
                <TransactionTable />
            </div>
        </>
    );
};

export default Transactions;