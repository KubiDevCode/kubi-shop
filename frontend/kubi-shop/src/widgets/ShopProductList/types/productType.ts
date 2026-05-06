export interface ProductType {
    id: string
    name: string
    price: number
    img: string
}

export interface ProductResponse {
    id: string
    name: string
    price: number
    img: string | null
}


export interface ProductPageType {
    page: number
    limit: number
    products: ProductResponse[]
}