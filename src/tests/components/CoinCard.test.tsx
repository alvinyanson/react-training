import { render, screen } from '@testing-library/react'
import CoinCard from '../../components/CoinCard'
import { formatNumberWithCommas, getCurrencySymbol } from '../../util'

describe('CoinCard Component', () => {
  const coin = {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
    current_price: 84726,
    market_cap: 1681261473329,
    market_cap_rank: 1,
    fully_diluted_valuation: 1681261473329,
    total_volume: 28785970337,
    high_24h: 85438,
    low_24h: 82649,
    price_change_24h: 1569.52,
    price_change_percentage_24h: 1.88744,
    market_cap_change_24h: 30648005004,
    market_cap_change_percentage_24h: 1.85676,
    circulating_supply: 19845243.0,
    total_supply: 19845243.0,
    max_supply: 21000000.0,
    ath: 108786,
    ath_change_percentage: -22.088,
    ath_date: '2025-01-20T09:11:54.494Z',
    atl: 67.81,
    atl_change_percentage: 124893.69939,
    atl_date: '2013-07-06T00:00:00.000Z',
    roi: null,
    last_updated: '2025-04-02T03:25:12.146Z',
    price_change_percentage_24h_in_currency: 1.8874370816905468,
  }

  it('should render the coin info in the card', () => {
    render(<CoinCard currency={'USD'} coin={coin} />)

    const coinImage = screen.getByRole('img')
    const coinName = screen.getByRole('heading', { level: 6 })
    const coinSymbol = screen.queryByText(coin.symbol)
    const coinPrice = screen.queryByText(
      `${getCurrencySymbol('USD')}${formatNumberWithCommas(coin.current_price)}`
    )
    const coinPriceChange = screen.queryByText(
      `${formatNumberWithCommas(coin.price_change_percentage_24h)}%`
    )

    expect(coinImage).toHaveAttribute('src', coin.image)
    expect(coinName).toHaveTextContent(coin.name)
    expect(coinSymbol).toBeInTheDocument()
    expect(coinPrice).toBeInTheDocument()
    expect(coinPriceChange).toBeInTheDocument()
  })
})
