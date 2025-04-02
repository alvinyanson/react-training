import { createContext, useContext } from 'react'
import { ExpenseState } from '@/type'

export const ExpenseContext = createContext<ExpenseState | null>(null)

export const useExpense = () => useContext(ExpenseContext)
