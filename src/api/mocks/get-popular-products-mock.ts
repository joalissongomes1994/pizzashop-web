import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    { product: 'Pizza 01', amount: 25.5 },
    { product: 'Pizza 02', amount: 30 },
    { product: 'Pizza 03', amount: 45 },
    { product: 'Pizza 04', amount: 44 },
    { product: 'Pizza 05', amount: 22.9 },
  ])
})
