import type { BrandNameType } from '@/entities/Brand'
import type { CategoryNameType } from '@/entities/Category'
import type { TagNameType } from '@/entities/Tag'

export type FilterType = 'category' | 'brand' | 'tag'
export type PriceFilterAction = 'minPrice' | 'maxPrice'

export interface FilterItem {
  id: number
  title: string
  data: CategoryNameType | BrandNameType | TagNameType
}

export interface ShopFilter {
  id: number
  title: string
  type: FilterType
  filters: FilterItem[]
}

export interface InputFilterItem {
  id: number
  placeholder: string
  title: string
  defValue?: string
  action: PriceFilterAction
}

export interface InputShopFilter {
  id: number
  title: string
  filters: InputFilterItem[]
}
