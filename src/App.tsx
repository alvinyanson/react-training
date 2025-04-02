import CoinCard from '@/components/CoinCard'
import SelectCurrency from '@/components/SelectCurrency'
import { Coin } from '@/type'
import { FIAT_CURRENCIES } from '@/util'
import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_COIN_GECKO_BASE_URL

function App() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currency, setCurrency] = useState(FIAT_CURRENCIES[0]) // USD

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          `${baseUrl}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=12&page=${page}&sparkline=false&price_change_percentage=24h`
        )
        const data = await response.json()

        setCoins(data)
      } catch (err) {
        setError('There was a problem loading data from API.')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCoins()
  }, [currency, page])

  const handleChangeCurrency = (currency: string) => {
    setCurrency(currency)
  }

  const handleNextPage = () => {
    setLoading(true)
    setPage(page + 1)
  }

  const handlePrevPage = () => {
    if (page === 1) return

    setLoading(true)
    setPage(page - 1)
  }

  return (
    <>
      <div className="container py-5 py-2">
        {/* Pagination */}
        <div className="row mb-3 justify-content-between">
          <div className="col-auto">
            <span className="fw-bold">PAGE: {page}</span>
          </div>
          <div className="col-md-6 d-flex justify-content-end gap-3">
            <div>
              <SelectCurrency onChangeCurrency={handleChangeCurrency} />
            </div>

            <div className="btn-group" role="group" aria-label="Basic example">
              <button className="btn btn-dark" disabled={page === 1} onClick={handlePrevPage}>
                Prev
              </button>

              <button className="btn btn-dark" onClick={handleNextPage}>
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error ?? (
          <div className="row">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        )}

        {/* Loaded data */}
        <div className="row">
          {loading ? (
            <>
              <p>Loading...</p>
            </>
          ) : (
            coins.map((coin) => (
              <div key={coin.id} className="col-sm-4 col-md-3 col-lg-2 col-6">
                <CoinCard currency={currency} coin={coin} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default App
