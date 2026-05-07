import type { CategoryNameType } from "../../CategoriesWidget/types/categoryTypes"

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
    totalPage: number
    total: number
    products: ProductType[]
}