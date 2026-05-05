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

export class ProductPageResponse {
    page!: number
    limit!: number
    products!: ProductResponse[]
}