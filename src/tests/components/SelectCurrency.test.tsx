import { render, screen } from '@testing-library/react'
import { FIAT_CURRENCIES as currencies } from '@/util'
import SelectCurrency from '@/components/SelectCurrency'

describe('SelectCurrency Component', () => {
  const mockOnChangeCurrency = vi.fn()

  it('should render supported fiat currencies in dropdown', () => {
    render(<SelectCurrency onChangeCurrency={mockOnChangeCurrency} />)

    currencies.forEach((currency) => {
      // Check for currency name
      expect(screen.getByText(currency)).toBeInTheDocument()
    })
  })
})
