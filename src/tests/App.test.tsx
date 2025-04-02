import App from '@/App'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

describe('App Component', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/coins')) {
        return Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve([
              {
                id: 'bitcoin',
                symbol: 'btc',
                name: 'Bitcoin',
                image:
                  'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
                current_price: 84179,
                market_cap: 1671714456288,
                market_cap_rank: 1,
                fully_diluted_valuation: 1671714456288,
                total_volume: 30444025019,
                high_24h: 85438,
                low_24h: 82649,
                price_change_24h: 782.08,
                price_change_percentage_24h: 0.93778,
                market_cap_change_24h: 16519216584,
                market_cap_change_percentage_24h: 0.99802,
                circulating_supply: 19845343.0,
                total_supply: 19845343.0,
                max_supply: 21000000.0,
                ath: 108786,
                ath_change_percentage: -22.58278,
                ath_date: '2025-01-20T09:11:54.494Z',
                atl: 67.81,
                atl_change_percentage: 124099.92512,
                atl_date: '2013-07-06T00:00:00.000Z',
                roi: null,
                last_updated: '2025-04-02T07:28:48.551Z',
                price_change_percentage_24h_in_currency: 0.9377820385779031,
              },
            ]),
        })
      }
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render coin names when api responds', async () => {
    render(<App />)

    await waitFor(() => {
      screen.getByText(/bitcoin/i)
    })
  })

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
