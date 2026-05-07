export interface CategoryType {
    id: string;
    name: CategoryNameType;
    slug: string;
    img: string;
    brands?: []
}

export type CategoryNameType = "all" | "earpods" | "joysticks" | "laptops" | "phones" | "playstations" | "digital-watches"