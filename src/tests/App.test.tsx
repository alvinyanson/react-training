import App from '@/App'
import { fireEvent, render, screen } from '@testing-library/react'

describe('App Component', () => {
  it('should navigate to Page 2 when Next button is clicked', () => {
    render(<App />)

    const nextButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(nextButton)

    expect(screen.getByText(/PAGE: 2/i)).toBeInTheDocument()
  })

  it('disables the "Prev" button when page is 1', () => {
    render(<App />)

    const prevButton = screen.getByRole('button', { name: /prev/i })

    expect(prevButton).toBeDisabled()
  })

  it('should navigate to previous page when Prev button is clicked', async () => {
    render(<App />)

    const prevButton = screen.getByRole('button', { name: /prev/i })
    const nextButton = screen.getByRole('button', { name: /next/i })

    expect(screen.getByText(/PAGE: 1/i)).toBeInTheDocument()

    fireEvent.click(nextButton)

    expect(screen.getByText(/PAGE: 2/i)).toBeInTheDocument()

    fireEvent.click(prevButton)

    expect(screen.getByText(/PAGE: 1/i)).toBeInTheDocument()

    expect(prevButton).toBeDisabled()
  })
})
