import { CoinCardProps } from '@/type'
import { formatNumberWithCommas, getCurrencySymbol } from '@/util'

function CoinCard({ currency, coin }: CoinCardProps) {
  return (
    <>
      <div className="card bg-dark text-light mb-4">
        <img src={coin.image} className="card-img-top p-5" alt="coin image" />
        <div className="card-body">
          {/* symbol */}
          <div className="d-flex justify-content-between">
            <h6 className="card-title">{coin.name}</h6>
            <small className="fst-italic">{coin.symbol}</small>
          </div>

          {/* additional info */}
          <div className="d-flex justify-content-between">
            {/* currency symbol */}
            <span>
              {getCurrencySymbol(currency)}
              {formatNumberWithCommas(coin.current_price)}
            </span>

            {/* Price change percentage 24 hrs */}
            <span
              className={`badge text-bg-light ${coin.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'}`}
            >
              {formatNumberWithCommas(coin.price_change_percentage_24h)}%
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default CoinCard
