export class ProductRespons {
    id!: string
    name!: string
    price!: number
    image!: string
}

export class ProductDetailResponse {
    id!: string
    name!: string
    price!: number
    image!: string | null
    categoryId!: string
    brandId!: string
}