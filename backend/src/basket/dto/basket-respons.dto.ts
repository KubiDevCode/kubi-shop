export class BasketProductBrandResponseDto {
    id!: string
    name!: string
    slug!: string
}

export class BasketProductCategoryResponseDto {
    id!: string
    name!: string
    slug!: string
}

export class BasketProductResponseDto {
    id!: string
    name!: string
    price!: number
    img!: string | null
    brand!: BasketProductBrandResponseDto
    category!: BasketProductCategoryResponseDto
}

export class BasketItemResponseDto {
    id!: string
    quantity!: number
    product!: BasketProductResponseDto
}

export class BasketResponseDto {
    id!: string
    productBaskets!: BasketItemResponseDto[]
}