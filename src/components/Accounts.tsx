import { useExpense } from '../hooks/useExpense'
import { ExpenseState } from '../types'

function Accounts() {
  const state = useExpense() as ExpenseState

  return (
    <>
      {state.accounts.map((account) => (
        <div key={account.id} className="col-md-3 col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{account.name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">{account.balance}</h6>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Accounts
