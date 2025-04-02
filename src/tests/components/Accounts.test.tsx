import { render, screen } from '@testing-library/react'
import Accounts from '@/components/Accounts'
import { InitialAppState } from '@/data/data'
import { ExpenseContext } from '@/hooks/useExpense'
import { ReactNode } from 'react'

describe('Accounts Component', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ExpenseContext.Provider value={InitialAppState}>{children}</ExpenseContext.Provider>
  )

  const accounts = InitialAppState.accounts

  it('renders account names and balances', () => {
    render(<Accounts />, { wrapper })

    accounts.forEach((account) => {
      // Check for account name
      expect(screen.getByText(account.name)).toBeInTheDocument()

      // Check for account balance
      expect(screen.getByText(account.balance.toString())).toBeInTheDocument()
    })
  })
})
