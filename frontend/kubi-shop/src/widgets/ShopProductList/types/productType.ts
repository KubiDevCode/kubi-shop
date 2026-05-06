export interface ProductType {
    id: string
    name: string
    price: number
    img: string
}

export interface ProductPageType {
    page: number
    limit: number
    totalPage: number
    total: number
    products: ProductType[]
}