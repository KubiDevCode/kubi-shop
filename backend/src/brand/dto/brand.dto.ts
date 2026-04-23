export class BrandResponse {
    id!: string
    name!: string
    slug!: string
}

export class BrandDetailsResponse {
    id!: string
    name!: string
    slug!: string
    categories!: {
        id: string
        name: string
        slug: string
    }[]
}