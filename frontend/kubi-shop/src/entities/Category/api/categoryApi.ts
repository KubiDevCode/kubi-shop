import { baseApi } from '@/shared/api'
import type { CategoryType } from '../model/types'

// Define a service using a base URL and expected endpoints
export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCategory: build.query<CategoryType[], void>({
      query: () => 'category',
    }),
  }),
})

export const { useGetAllCategoryQuery } = categoryApi
