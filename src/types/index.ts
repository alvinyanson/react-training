import { ReactNode } from 'react'

export type ExpenseState = {
  records: Record[]
  accounts: Account[]
  form: Record
}

export type ExpenseAction = {
  type: string
  record: Record
}

export type Record = {
  id?: string
  activeEdit?: boolean
  type: string
  account: string
  amount: string
  category: string
  date: string
}

export type Account = {
  id: number
  name: string
  balance: number
}

export type RecordsProviderProps = {
  children: ReactNode
}
