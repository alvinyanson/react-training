const baseUrl = import.meta.env.VITE_COIN_GECKO_BASE_URL

export const getCoinMarketData = (currency: string, page: number) => {
  return fetch(
    `${baseUrl}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=12&page=${page}&sparkline=false&price_change_percentage=24h`
  ).then((resp) => {
    if (resp.status === 200) return resp.json()
    else throw new Error('Invalid response')
  })
}
