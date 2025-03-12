import React, { useState, useEffect } from 'react'
import { useExpense, useExpenseDispatch } from "../context/ExpenseContext";
import { AccountsList, CategoryList, RecordType } from '../data';
import { v4 as uuidv4 } from 'uuid';

function AddRecordForm() {
    const state = useExpense();
    const dispatch = useExpenseDispatch()

    const [record, setRecord] = useState({
        ...state.form
    })

    useEffect(() => {
        setRecord(state.form); // Sync with global state
    }, [state.form]); // Runs whenever `state.form` changes

    const handleSubmitForm = () => {
        console.log('record', record);

        if (record.action === "add") {
            const newRecord = { ...record, id: uuidv4() };
            dispatch({ type: 'add_record', record: newRecord })
            setRecord(newRecord);
            return;
        }

        dispatch({ type: 'edit_record', record })
    }

    const handleChangeType = (e) => {
        setRecord({
            ...record,
            type: e.target.value
        })
    }

    const handleChangeAccount = (e) => {
        setRecord({
            ...record,
            account: e.target.value
        })
    }

    const handleChangeCategory = (e) => {
        setRecord({
            ...record,
            category: e.target.value
        })
    }

    return (
        <>
            <div className='card'>
                <div className='card-body'>
                    <h5 className="card-title">Add Record</h5>
                    <div className="mb-3">
                        <label className="form-label">Type</label>
                        <select className="form-select" onChange={handleChangeType} value={record.type}>
                            {
                                RecordType.map(record => (
                                    <option key={record.id}>{record.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Account</label>
                        <select className="form-select" onChange={handleChangeAccount} value={record.account}>
                            {
                                AccountsList.map(record => (
                                    <option key={record.id}>{record.name}</option>
                                ))
                            }
                        </select>
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
                        <select className="form-select" onChange={handleChangeCategory} value={record.category}>
                            {
                                CategoryList.map(record => (
                                    <option key={record.id}>{record.name}</option>
                                ))
                            }
                        </select>
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