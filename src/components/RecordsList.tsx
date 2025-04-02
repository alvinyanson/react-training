import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { ExpenseAction, ExpenseState, Record } from '../type'
import { useExpense } from '@/hooks/useExpense'
import { useExpenseDispatch } from '@/hooks/useExpenseDispatch'

ChartJS.register(ArcElement, Tooltip, Legend)

function RecordsList() {
  const state = useExpense() as ExpenseState
  const dispatch = useExpenseDispatch() as React.Dispatch<ExpenseAction>

  const handleDelete = (record: Record) => {
    dispatch({ type: 'delete_record', record })
  }

  const handleEdit = (record: Record) => {
    record.activeEdit = true
    dispatch({ type: 'seed_form', record })
  }

  return (
    <>
      <div className="card mb-4">
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
              {state.records.map((record) => (
                <tr key={record.id}>
                  <td>{record.type}</td>
                  <td>{record.account}</td>
                  <td>{record.amount}</td>
                  <td>{record.category}</td>
                  <td>{record.date}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button onClick={() => handleEdit(record)} className="btn btn-light">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(record)} className="btn btn-dark">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default RecordsList
