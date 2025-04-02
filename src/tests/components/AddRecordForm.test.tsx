import { fireEvent, render, screen } from '@testing-library/react'
import { JSX, ReactNode } from 'react'
import AddRecordForm from '@/components/AddRecordForm'
import { InitialAppState } from '@/data/data'
import { ExpenseContext } from '@/hooks/useExpense'
import { ExpenseDispatchContext } from '@/hooks/useExpenseDispatch'

describe('AddRecordForm', () => {
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

  it('renders form fields', () => {
    render(<AddRecordForm />, { wrapper })

    expect(screen.getByRole('combobox', { name: /type/i })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /account/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /category/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
  })

  it('shows alert when amount is missing', () => {
    window.alert = vi.fn()
    render(<AddRecordForm />, { wrapper })

    fireEvent.click(screen.getByRole('button', { name: /save record/i }))
    expect(window.alert).toHaveBeenCalledWith('Amount is required')
  })

  it('dispatches add_record action when submitting a new record', () => {
    render(<AddRecordForm />, { wrapper })

    fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '100' } })
    fireEvent.click(screen.getByText(/save record/i))

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'add_record',
        record: expect.objectContaining({
          amount: '100',
          type: expect.any(String),
          account: expect.any(String),
          category: expect.any(String),
          date: expect.any(String),
          id: expect.any(String),
        }),
      })
    )
  })
})
