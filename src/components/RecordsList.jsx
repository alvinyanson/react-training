import { useExpense, useExpenseDispatch } from "../context/ExpenseContext";


function RecordsList() {
    const state = useExpense();
    const dispatch = useExpenseDispatch();


    const handleDelete = (record) => {

        dispatch({ type: "delete_record", record })
    }
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Records</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Account</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Category</th>
                                <th scope="col">Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.records.map(record => (
                                    <tr key={record.id}>
                                        <td>{record.type}</td>
                                        <td>{record.account}</td>
                                        <td>{record.amount}</td>
                                        <td>{record.category}</td>
                                        <td>{record.date}</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button type="button" className="btn btn-light">Edit</button>
                                                <button onClick={() => handleDelete(record)} className="btn btn-dark">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default RecordsList