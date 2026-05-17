import type { BrandNameType } from '@/entities/Brand'
import type { CategoryNameType } from '@/entities/Category'
import type { TagNameType } from '@/entities/Tag'

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
