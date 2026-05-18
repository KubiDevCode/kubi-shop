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
    brands?: Brand[]
    limit!: number
    totalPage!: number
    total!: number
    products!: ProductResponse[]
}

export const CATEGORIES = ["earpods", "joysticks", "laptops", "phones", "playstations", "digital-watches"] as const

export type Category = typeof CATEGORIES[number]

export const BRANDS = ['all'
    , 'apple'
    , 'samsung'
    , 'sony'
    , 'xiaomi'
    , 'asus'
    , 'lenovo'
    , 'jbl'
    , 'microsoft'
    , 'dell'
    , "hp"
    , 'logitech']

export type Brand = typeof BRANDS[number]

export const TAGS = ['all',
    'new',
    'popular',
    'premium',
    'budget',
    'gaming',
    'wireless'
]

export type SortPriceType = 'default' | "asc" | "desc"

export type Tag = typeof TAGS[number]