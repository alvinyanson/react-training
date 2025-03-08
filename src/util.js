export function formatNumberWithCommas(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function getCurrencySymbol(currency) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    })
        .formatToParts()
        .find((part) => part.type === 'currency')?.value;
}

export const COIN_GECKO_BASE_URL = "https://api.coingecko.com/api/v3";

export const FIAT_CURRENCIES = [
    'USD', 'AED', 'ARS', 'AUD', 'BDT', 'BHD', 'BMD', 'BRL', 'CAD', 'CHF', 'CLP',
    'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'GEL', 'HKD', 'HUF', 'IDR', 'ILS', 'INR',
    'JPY', 'KRW', 'KWD', 'LKR', 'MMK', 'MXN', 'MYR', 'NGN', 'NOK', 'NZD', 'PHP',
    'PKR', 'PLN', 'RUB', 'SAR', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'UAH', 'VEF',
    'VND', 'ZAR'
];