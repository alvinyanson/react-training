import { JSX, ReactNode } from 'react'
import { InitialAppState } from '../../data/data'
import { ExpenseContext } from '../../hooks/useExpense'
import { ExpenseDispatchContext } from '../../hooks/useExpenseDispatch'
import RecordsList from '../../components/RecordsList'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Records List Component', () => {
  let wrapper: ({ children }: { children: ReactNode }) => JSX.Element

  const mockDispatch = vi.fn()

  beforeEach(async () => {
    wrapper = ({ children }: { children: ReactNode }) => (
      <ExpenseContext.Provider value={InitialAppState}>
        <ExpenseDispatchContext.Provider value={mockDispatch}>
          {children}
        </ExpenseDispatchContext.Provider>
      </ExpenseContext.Provider>
    )
  })

  it('renders records list', () => {
    render(<RecordsList />, { wrapper })

    const rows = screen.getAllByRole('row')
    expect(rows.length).toBeGreaterThan(0)
  })

  it('dispatches seed_form action when edit button is clicked', () => {
    render(<RecordsList />, { wrapper })

    const button = screen.getAllByRole('button', { name: /edit/i })[0]
    fireEvent.click(button)

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'seed_form',
      record: InitialAppState.records[0],
    })
  })

  it('dispatches delete_record action when delete button is clicked', () => {
    render(<RecordsList />, { wrapper })

    const button = screen.getAllByRole('button', { name: /delete/i })[0]
    fireEvent.click(button)

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'delete_record',
      record: InitialAppState.records[0],
    })
  })
})
