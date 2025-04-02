import { createContext, useContext } from 'react'
import { ExpenseAction } from '@/type'

export const ExpenseDispatchContext = createContext<React.Dispatch<ExpenseAction> | null>(null)

export const useExpenseDispatch = () => useContext(ExpenseDispatchContext)
