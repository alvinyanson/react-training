import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { AccountsList, CategoryList, RecordsList } from '@/data/data'
import { ExpenseAction, ExpenseState } from '@/type'
import { useExpense } from '@/hooks/useExpense'
import { useExpenseDispatch } from '@/hooks/useExpenseDispatch'

function AddRecordForm() {
  const state = useExpense() as ExpenseState
  const dispatch = useExpenseDispatch() as React.Dispatch<ExpenseAction>

  const [record, setRecord] = useState({
    ...state.form,
  })

  useEffect(() => {
    setRecord(state.form)
  }, [state.form])

  const handleSubmitForm = () => {
    if (!record.amount) {
      alert('Amount is required')
      return
    }

    if (!record.activeEdit) {
      const newRecord = { ...record, id: uuidv4() }
      dispatch({ type: 'add_record', record: newRecord })
      setRecord(newRecord)
    } else {
      dispatch({ type: 'edit_record', record })
    }
  }

  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecord({
      ...record,
      type: e.target.value,
    })
  }

  const handleChangeAccount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecord({
      ...record,
      account: e.target.value,
    })
  }

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecord({
      ...record,
      category: e.target.value,
    })
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add Record</h5>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <select
              id="type"
              disabled={record.activeEdit}
              className="form-select"
              onChange={handleChangeType}
              value={record.type}
            >
              {RecordsList.map((record) => (
                <option key={record.id}>{record.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="account" className="form-label">
              Account
            </label>
            <select
              id="account"
              className="form-select"
              onChange={handleChangeAccount}
              value={record.account}
            >
              {AccountsList.map((record) => (
                <option key={record.id}>{record.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              id="amount"
              type="text"
              className="form-control"
              value={record.amount}
              onChange={(e) => {
                setRecord({
                  ...record,
                  amount: e.target.value,
                })
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              className="form-select"
              onChange={handleChangeCategory}
              value={record.category}
            >
              {CategoryList.map((record) => (
                <option key={record.id}>{record.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              id="date"
              type="date"
              className="form-control"
              value={record.date}
              onChange={(e) => {
                setRecord({
                  ...record,
                  date: e.target.value,
                })
              }}
            />
          </div>

          <button className="btn btn-dark" onClick={handleSubmitForm}>
            Save Record
          </button>
        </div>
      </div>
    </>
  )
}

export default AddRecordForm
