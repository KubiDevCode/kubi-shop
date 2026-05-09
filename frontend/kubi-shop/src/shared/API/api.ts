import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CategoryType } from '../../widgets/CategoriesWidget/index'
import type { ProductPageType } from '../../widgets/ShopProductList/types/productType'
import type { CategoryNameType } from '../../entities/Category/types/categoryTypes'
import type { BrandNameType } from '../../entities/Brand/types/brandTypes'


// Define a service using a base URL and expected endpoints
export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    endpoints: (build) => ({
        getAllCategory: build.query<CategoryType[], void>({
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
        getPageProductsByCategory: build.query<ProductPageType, { categories: CategoryNameType[], page: number, limit: number }>({
            query: ({ categories, page, limit }) => {
                if (!categories || categories.length === 0) {
                    return {
                        url: '/products/page',
                        params: { page, limit },
                    };
                }

                return {
                    url: '/products/page/category',
                    params: {
                        categories,
                        page,
                        limit,
                    },
                };
            },
        }),
        getPageProductsByBrand: build.query<ProductPageType, { brands: BrandNameType[], page: number, limit: number }>({
            query: ({ brands, page, limit }) => {
                if (!brands || brands.length === 0) {
                    return {
                        url: '/products/page',
                        params: { page, limit },
                    };
                }

                return {
                    url: '/products/page/brand',
                    params: {
                        brands,
                        page,
                        limit,
                    },
                };
            },
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllCategoryQuery,
    useGetPageProductsQuery,
    useGetPageProductsByCategoryQuery,
    useGetPageProductsByBrandQuery,
} = shopApi