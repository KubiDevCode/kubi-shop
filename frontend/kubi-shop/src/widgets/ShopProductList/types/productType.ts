import type { BrandNameType } from "../../../entities/Brand/types/brandTypes"
import type { CategoryNameType } from "../../../entities/Category/types/categoryTypes"

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
    totalPage: number
    total: number
    products: ProductType[]
}