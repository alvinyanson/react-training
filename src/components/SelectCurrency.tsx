import { SelectCurrencyProps } from '@/type'
import { FIAT_CURRENCIES as currencies } from '@/util'

function SelectCurrency({ onChangeCurrency }: SelectCurrencyProps) {
  return (
    <>
      <select className="form-select" onChange={(e) => onChangeCurrency(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </>
  )
}

export default SelectCurrency
