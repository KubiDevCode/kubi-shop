import { useSearchParams } from 'react-router-dom'
import type { FilterItemType, InputFilterItemType, ShopFilterType } from '@/features/FilterProducts'
import type { SortProductsType } from '@/entities/Product'
import type { BrandNameType } from '@/entities/Brand'
import type { CategoryNameType } from '@/entities/Category'
import type { TagNameType } from '@/entities/Tag'

const filterParamByType = {
  category: 'categories',
  brand: 'brands',
  tag: 'tags',
} as const

const getNumberParam = (searchParams: URLSearchParams, key: string) => {
  return Number(searchParams.get(key))
}

const getArrayParam = (searchParams: URLSearchParams, key: string) =>
  searchParams.get(key)?.split(',').filter(Boolean) ?? []

export const useShopPageParams = (limit: number) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const params = {
    page: getNumberParam(searchParams, 'page') || 1,
    tags: getArrayParam(searchParams, 'tags') as TagNameType[],
    categories: getArrayParam(searchParams, 'categories') as CategoryNameType[],
    limit,
    sort: (searchParams.get('sort') || 'default') as SortProductsType,
    brands: getArrayParam(searchParams, 'brands') as BrandNameType[],
    minprice: getNumberParam(searchParams, 'minprice') || 0,
    maxprice: getNumberParam(searchParams, 'maxprice') || 99999999,
    search: searchParams.get('search') || '',
  } satisfies {
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

  const updateParams = (update: (next: URLSearchParams) => void) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      update(next)

      return next
    })
  }

  const setPage = (page: number) => {
    updateParams((params) => {
      if (page === 1) {
        params.delete('page')
      } else {
        params.set('page', String(page))
      }
    })
  }

  const toggleFilter = (section: ShopFilterType, filter: FilterItemType) => {
    updateParams((params) => {
      const key = filterParamByType[section.type]

      if (filter.data === 'all') {
        params.delete(key)
        params.delete('page')

        return
      }

      const current = getArrayParam(params, key).filter((item) => item !== 'all')

      const next = current.includes(filter.data)
        ? current.filter((item) => item !== filter.data)
        : [...current, filter.data]

      if (next.length) {
        params.set(key, next.join(','))
      } else {
        params.delete(key)
      }

      params.delete('page')
    })
  }

  const toggleSort = (value: SortProductsType) => {
    updateParams((params) => {
      if (value === 'default') {
        params.delete('sort')
      } else {
        params.set('sort', value)
      }

      params.delete('page')
    })
  }

  const changePrice = (filter: InputFilterItemType, value: string) => {
    if (filter.action === 'minPrice') {
      updateParams((params) => {
        const price = Number(value) || 0

        if (price === 0) {
          params.delete('minprice')
        } else {
          params.set('minprice', String(price))
        }

        params.delete('page')
      })
    }

    if (filter.action === 'maxPrice') {
      updateParams((params) => {
        const price = Number(value) || 99999999

        if (price === 99999999) {
          params.delete('maxprice')
        } else {
          params.set('maxprice', String(price))
        }

        params.delete('page')
      })
    }
  }

  const setSearch = (values: Record<string, string>) => {
    updateParams((params) => {
      const search = values.search?.trim()

      if (search) {
        params.set('search', search)
      } else {
        params.delete('search')
      }

      params.delete('page')
    })
  }

  return {
    params,
    setPage,
    toggleFilter,
    toggleSort,
    changePrice,
    setSearch,
  }
}
