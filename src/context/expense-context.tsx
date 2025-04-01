import { useReducer } from 'react'
import { AccountsList, AccountsType, CategoriesType, DummyRecords, RecordsType } from '../data'
import { ExpenseContext } from '../hooks/useExpense'
import { ExpenseDispatchContext } from '../hooks/useExpenseDispatch'
import { RecordsProviderProps } from '../types'
import { expenseReducer } from './expense-reducer'

export function RecordsProvider({ children }: RecordsProviderProps) {
  const [records, dispatch] = useReducer(expenseReducer, {
    records: DummyRecords,
    accounts: AccountsList,
    form: {
      amount: '',
      type: RecordsType.EXPENSE,
      account: AccountsType.SAVINGS,
      category: CategoriesType.FINANCIAL_EXPENSES,
      date: new Date().toISOString().split('T')[0],
    },
  })

  return (
    <ExpenseContext.Provider value={records}>
      <ExpenseDispatchContext.Provider value={dispatch}>{children}</ExpenseDispatchContext.Provider>
    </ExpenseContext.Provider>
  )
}
