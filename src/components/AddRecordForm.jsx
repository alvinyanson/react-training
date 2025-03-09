import React, { useState } from 'react'
import { useExpenseDispatch } from "../context/ExpenseTrackerContext";

function AddRecordForm() {
    const dispatch = useExpenseDispatch()

    const [record, setRecord] = useState({
        type: '',
        account: '',
        amount: '',
        category: '',
        date: ''
    })

    const handleSubmitForm = () => {
        console.log('record', record);

        dispatch({ type: 'add_record', record })
    }

    return (
        <>
            <div className='card'>
                <div className='card-body'>
                    <div className="mb-3">
                        <label className="form-label">Type</label>
                        <input type="text" className="form-control"
                            value={record.type}
                            onChange={e => {
                                setRecord({
                                    ...record,
                                    type: e.target.value
                                });
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Account</label>
                        <input type="text" className="form-control"
                            value={record.account}
                            onChange={e => {
                                setRecord({
                                    ...record,
                                    account: e.target.value
                                });
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Amount</label>
                        <input type="text" className="form-control"
                            value={record.amount}
                            onChange={e => {
                                setRecord({
                                    ...record,
                                    amount: e.target.value
                                });
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <input type="text" className="form-control"
                            value={record.category}
                            onChange={e => {
                                setRecord({
                                    ...record,
                                    category: e.target.value
                                });
                            }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Date</label>
                        <input type="date" className="form-control"
                            value={record.date}
                            onChange={e => {
                                setRecord({
                                    ...record,
                                    date: e.target.value
                                });
                            }} />
                    </div>


                    <button className="btn btn-dark" onClick={handleSubmitForm}>Add Record</button>
                </div>
            </div>
        </>
    )
}

export default AddRecordForm