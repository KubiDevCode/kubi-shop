import { IsArray, IsIn } from 'class-validator';

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
    categories?: Category[]
    limit!: number
    totalPage!: number
    total!: number
    products!: ProductResponse[]
}

export const CATEGORIES = ["all", "earpods", "joysticks", "laptops", "phones", "playstations", "digital-watches"] as const

export type Category = typeof CATEGORIES[number]

export class CategoryRequest {
    @IsArray({ message: 'категории должны быть в массиве' })
    @IsIn(CATEGORIES, { each: true, message: 'Несуществующие категеории' })
    categories!: Category[];
}