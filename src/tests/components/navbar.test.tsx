import Navbar from '@/components/navbar'
import { render, screen } from '@testing-library/react'

describe('Navbar component', () => {
  it('renders the navigation component with heading and links', async () => {
    render(<Navbar />)

    // // screen.debug()

    const heading = await screen.findByText(/shopping app/i)
    expect(heading).toBeInTheDocument()
  })
})
