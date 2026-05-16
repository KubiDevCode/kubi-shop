export interface CategoryType {
  id: string
  name: CategoryNameType
  slug: string
  img: string
}

export type CategoryNameType =
  | 'all'
  | 'earpods'
  | 'joysticks'
  | 'laptops'
  | 'phones'
  | 'playstations'
  | 'digital-watches'
