import { useReducer } from 'react'
import { AccountsList, CategoryList, DummyRecords, RecordType } from '../data'
import { ExpenseContext } from '../hooks/useExpense'
import { RecordsProviderProps } from '../types'
import { expenseTrackerReducer } from './expense-reducer'
import { ExpenseDispatchContext } from '../hooks/useExpenseDispatch'

export function RecordsProvider({ children }: RecordsProviderProps) {
  const [records, dispatch] = useReducer(expenseTrackerReducer, {
    records: DummyRecords,
    accounts: AccountsList,
    form: {
      action: 'add',
      type: RecordType[0].name,
      account: AccountsList[0].name,
      amount: '',
      category: CategoryList[0].name,
      date: new Date().toISOString().split('T')[0],
    },
  })

  return (
    <ExpenseContext.Provider value={records}>
      <ExpenseDispatchContext.Provider value={dispatch}>{children}</ExpenseDispatchContext.Provider>
    </ExpenseContext.Provider>
  )
}
