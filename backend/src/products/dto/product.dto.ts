export class ProductResponse {
    id!: string
    name!: string
    price!: number
    img!: string | null
}

export class ProductDetailResponse {
    id!: string
    name!: string
    price!: number
    img!: string | null
    categoryId!: string
    brandId!: string
}