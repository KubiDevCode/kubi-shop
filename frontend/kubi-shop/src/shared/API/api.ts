import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Category } from '../../widgets/CategoriesWidget/index'
import type { ProductPageType } from '../../widgets/ShopProductList/types/productType'


// Define a service using a base URL and expected endpoints
export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    endpoints: (build) => ({
        getAllCategory: build.query<Category[], void>({
            query: () => 'category',
        }),
        getPageProducts: build.query<ProductPageType, { page: number, limit: number }>({
            query: ({ page, limit }) => (
                {
                    url: '/products/page',
                    params: {
                        page,
                        limit
                    },
                }
            )
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllCategoryQuery, useGetPageProductsQuery } = shopApi