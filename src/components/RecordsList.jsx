import { useExpense } from "../context/ExpenseTrackerContext";


function RecordsList() {
    const state = useExpense();

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Account</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Category</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.records.map(record => (
                            <tr>
                                <td>{record.type}</td>
                                <td>{record.account}</td>
                                <td>{record.amount}</td>
                                <td>{record.category}</td>
                                <td>{record.date}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </>
    )
}

export default RecordsList