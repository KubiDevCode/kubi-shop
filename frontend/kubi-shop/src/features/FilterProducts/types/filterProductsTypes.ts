import type { BrandNameType } from '@/entities/Brand'
import type { CategoryNameType } from '@/entities/Category'
import type { TagNameType } from '@/entities/Tag'

export type FilterType = 'category' | 'brand' | 'tag'
export type PriceFilterAction = 'minPrice' | 'maxPrice'

export interface FilterItemType {
  id: number
  title: string
  data: CategoryNameType | BrandNameType | TagNameType
}

export interface ShopFilterType {
  id: number
  title: string
  type: FilterType
  filters: FilterItemType[]
}

export interface InputFilterItemType {
  id: number
  placeholder: string
  title: string
  defValue?: string
  action: PriceFilterAction
}

export interface InputShopFilterType {
  id: number
  title: string
  filters: InputFilterItemType[]
}
