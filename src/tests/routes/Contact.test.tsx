import Contact from '@/routes/contact'
import { render, screen } from '@testing-library/react'

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'), // Retain other functionality
  useLoaderData: () => ({
    contact: {
      id: 'jmolfx2',
      first: 'John',
      last: 'Doe',
      avatar: 'https://example.com/avatar.png',
      twitter: 'johndoe',
      notes: 'Test notes',
    },
  }),
  useFetcher: vi.fn(() => ({
    formData: new FormData().append('favorite', 'true'),
    Form: vi.fn(({ children }) => <form>{children}</form>),
  })),
  Form: vi.fn(({ children }) => <form>{children}</form>),
}))

describe('Contacts Component', async () => {
  it('renders contact details correctly', async () => {
    render(<Contact />)

    screen.debug()

    // Check if the twitter handle name appears
    expect(await screen.findByText(/johndoe/i)).toBeInTheDocument()

    // Check the avatar image
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/avatar.png')

    // Check if the Twitter link is rendered correctly
    expect(screen.getByRole('link', { name: 'johndoe' })).toHaveAttribute(
      'href',
      'https://twitter.com/johndoe'
    )

    // Check if the notes are rendered
    expect(await screen.findByText('Test notes')).toBeInTheDocument()
  })
})
