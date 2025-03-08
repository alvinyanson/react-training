import React from 'react'
import { FIAT_CURRENCIES as currencies } from '../util'

function SelectCurrency({ onChangeCurrency }) {
    return (
        <>
            <select class="form-select" onChange={(e) => onChangeCurrency(e.target.value)}>
                {
                    currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))
                }
            </select>
        </>
    )
}

export default SelectCurrency