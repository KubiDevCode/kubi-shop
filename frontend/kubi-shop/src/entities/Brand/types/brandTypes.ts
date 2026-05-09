export interface BrandTypes {
    id: string;
    name: BrandNameType;
    slug: string;
}

export type BrandNameType =
    | 'all'
    | 'apple'
    | 'samsung'
    | 'sony'
    | 'xiaomi'
    | 'asus'
    | 'lenovo'
    | 'jbl'
    | 'microsoft'
    | 'dell'
    | "hp"
    | 'logitech'