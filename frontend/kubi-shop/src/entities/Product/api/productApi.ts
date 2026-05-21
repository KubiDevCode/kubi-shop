import { baseApi } from '@/shared/api'
import type { BrandNameType } from '@/entities/Brand'
import type { CategoryNameType } from '@/entities/Category'
import type { TagNameType } from '@/entities/Tag'
import type { ProductPageType, SortProductsType } from '../types/productType'

// Define a service using a base URL and expected endpoints
export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPageProducts: build.query<ProductPageType, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: '/products/page',
        params: {
          page,
          limit,
        },
      }),
    }),
    getPageProductsByFilters: build.query<
      ProductPageType,
      {
        brands?: BrandNameType[]
        tags?: TagNameType[]
        categories?: CategoryNameType[]
        sort: SortProductsType
        minprice: number
        maxprice: number
        page: number
        search: string
        limit: number
      }
    >({
      query: ({
        brands = ['all'],
        tags = ['all'],
        categories = ['all'],
        sort = 'default',
        minprice,
        maxprice,
        page,
        search,
        limit,
      }) => {
        return {
          url: '/products/page/filters',
          params: {
            ...(brands.length > 0 && {
              brands: brands.join(','),
            }),

            ...(categories.length > 0 && {
              categories: categories.join(','),
            }),

            ...(tags.length > 0 && {
              tags: tags.join(','),
            }),
            sort,
            minprice,
            maxprice,
            page,
            search,
            limit,
          },
        }
      },
    }),
  }),
})

export const { useGetPageProductsByFiltersQuery, useGetPageProductsQuery } = productApi
