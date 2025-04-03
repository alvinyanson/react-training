import EditContact from '@/routes/edit'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLoaderData: () => ({
      contact: {
        first: 'John',
        last: 'Doe',
        twitter: '@johndoe',
        avatar: 'https://example.com/avatar.jpg',
        notes: 'Test notes',
      },
    }),
    useNavigate: vi.fn(),
    Form: vi.fn(({ children }) => <form>{children}</form>),
  }
})

describe('EditContact Component', () => {
  it('renders the form with contact data', () => {
    render(
      <MemoryRouter>
        <EditContact />
      </MemoryRouter>
    )

    screen.debug()

    expect(screen.getByPlaceholderText('First')).toHaveValue('John')
    expect(screen.getByPlaceholderText('Last')).toHaveValue('Doe')
    expect(screen.getByPlaceholderText('@jack')).toHaveValue('@johndoe')
    expect(screen.getByPlaceholderText('https://example.com/avatar.jpg')).toHaveValue(
      'https://example.com/avatar.jpg'
    )
    expect(screen.getByRole('textbox', { name: /notes/i })).toHaveValue('Test notes')
  })

  it('calls navigate when cancel is clicked', () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(
      <MemoryRouter>
        <EditContact />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('Cancel'))

    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
