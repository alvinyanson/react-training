import Root from '@/routes/root'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, useLoaderData } from 'react-router-dom'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLoaderData: vi.fn(),
    useNavigation: () => ({
      location: { search: '?q=test' },
      state: 'idle',
    }),
    useSubmit: () => vi.fn(),
    Form: vi.fn(({ children }) => <form>{children}</form>),
  }
})

describe('Root Component', () => {
  it('should render the sidebar with contacts', () => {
    vi.mocked(useLoaderData).mockReturnValue({
      contacts: [
        {
          id: '1',
          first: 'John',
          last: 'Doe',
          avatar: 'https://example.com/avatar.png',
          twitter: 'johndoe',
          notes: 'Test notes',
          favorite: true,
        },
      ],
      q: '',
    })

    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    )

    // Check that the sidebar contains the correct text
    expect(screen.getByText('React Router Contacts')).toBeInTheDocument()

    // // Check that the contact's name is displayed in the list
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('★')).toBeInTheDocument()
  })

  it('should display "No contacts" if contacts array is empty', () => {
    vi.mocked(useLoaderData).mockReturnValue({
      contacts: [],
      q: '',
    })

    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    )

    // Check that "No contacts" is displayed
    expect(screen.getByText('No contacts')).toBeInTheDocument()
  })
})
