export interface TagTypes {
  id: string
  name: TagNameType
  slug: string
}

export type TagNameType = 'all' | 'new' | 'popular' | 'premium' | 'budget' | 'gaming' | 'wireless'
