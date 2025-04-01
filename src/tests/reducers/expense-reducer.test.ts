import { v4 as uuidv4 } from 'uuid'
import { expenseReducer } from '../../context/expense-reducer'
import {
  AccountsList,
  AccountsType,
  CategoriesType,
  DummyRecords,
  RecordsType,
} from '../../data/data'
import { ExpenseAction, Record } from '../../types'

describe('expenseReducer', () => {
  const initialState = {
    records: DummyRecords,
    accounts: AccountsList,
    form: {
      amount: '',
      type: RecordsType.EXPENSE,
      account: AccountsType.SAVINGS,
      category: CategoriesType.FINANCIAL_EXPENSES,
      date: new Date().toISOString().split('T')[0],
    },
  }

  it('should add a new expense record and deduct from Savings account balance from 100,000 to 99,500', () => {
    const action: ExpenseAction = {
      type: 'add_record',
      record: {
        ...initialState.form,
        type: RecordsType.EXPENSE, // record type of EXPENSE
        id: uuidv4(),
        amount: '500',
      },
    }

    const state = expenseReducer(initialState, action)
    expect(state.accounts.find((a) => a.name === 'Savings')?.balance).toBe(99500)
  })

  it('should add a new income record and increase Savings account balance from 100,000 to 100,500', () => {
    const action: ExpenseAction = {
      type: 'add_record',
      record: {
        ...initialState.form,
        type: RecordsType.INCOME, // record type of INCOME
        id: uuidv4(),
        amount: '500',
      },
    }

    const state = expenseReducer(initialState, action)
    expect(state.accounts.find((a) => a.name === 'Savings')?.balance).toBe(100500)
  })

  it('should update the second row amount from 100 to 200 and update the Cash account balance to 49900', () => {
    const recordToUpdate = { ...DummyRecords[1], activeEdit: true, amount: '200' } as Record
    const action: ExpenseAction = {
      type: 'edit_record',
      record: recordToUpdate, // amount of 100
    }

    const state = expenseReducer(initialState, action)
    const cashAccount = state.accounts[1] // Cash account - (50000 + 100 (existing expense)) - 200 (record to update amount) = 49900

    expect(cashAccount.balance).toBe(49900)
  })

  it('should delete the first record and update balance of Savings account to 100100', () => {
    const recordToDelete = DummyRecords[0]

    const action: ExpenseAction = {
      type: 'delete_record',
      record: recordToDelete, // amount of 100
    }

    const state = expenseReducer(initialState, action)
    const savingsAccount = state.accounts[0] // 100000 + 100 (return the 100 to the balance after delete expense record)

    expect(savingsAccount.balance).toBe(100100)
    expect(state.records.length).toBe(5)
  })
})
