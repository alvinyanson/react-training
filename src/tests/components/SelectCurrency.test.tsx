import { render, screen } from '@testing-library/react'
import SelectCurrency from '../../components/SelectCurrency'
import { FIAT_CURRENCIES as currencies } from '../../util'

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
