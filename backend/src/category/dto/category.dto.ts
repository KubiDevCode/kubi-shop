export class CategoryResponse {
    id!: string
    name!: string
    slug!: string
    img!: string | null;
}

export class CategoryDetailsResponse {
    id!: string
    name!: string
    slug!: string
    brands!: {
        id: string
        name: string
        slug: string
    }[]
    img!: string | null;
}