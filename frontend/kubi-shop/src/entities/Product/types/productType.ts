import type { BrandNameType } from '../../Brand'
import type { CategoryNameType } from '../../Category'
import type { TagNameType } from '../../Tag'

export type SortProductsType = 'asc' | 'desc' | 'default'

export interface ProductType {
  id: string
  name: string
  price: number
  img: string
}

export interface ProductPageType {
  page: number
  limit: number
  categories?: CategoryNameType[]
  brands?: BrandNameType[]
  tags?: TagNameType[]
  totalPage: number
  total: number
  products: ProductType[]
}
