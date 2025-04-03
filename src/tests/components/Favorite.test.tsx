import Favorite from '@/components/Favorite'
import { render, screen } from '@testing-library/react'

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useFetcher: vi.fn(() => ({
    formData: new FormData().append('favorite', 'true'),
    Form: vi.fn(({ children }) => <form>{children}</form>),
  })),
}))
describe('Favorite component', () => {
  it('should render favorite to ☆ when favorite is false', () => {
    const contact = { favorite: false }

    render(<Favorite contact={contact} />)

    // Ensure the button is rendered with the correct value initially
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('☆') // It should show '☆' since favorite is false
  })

  it('should render favorite to ★ when favorite is true', () => {
    const contact = { favorite: true }

    render(<Favorite contact={contact} />)

    // Ensure the button is rendered with the correct value initially
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('★') // It should show '★' since favorite is true
  })
})
