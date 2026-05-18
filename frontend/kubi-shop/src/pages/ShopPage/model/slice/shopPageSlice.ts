import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CategoryNameType } from '@/entities/Category'
import type { BrandNameType } from '@/entities/Brand'
import type { TagNameType } from '@/entities/Tag'
import type { SortProductsType } from '@/entities/Product'

export interface ShopPageState {
  shopPage: {
    categories: CategoryNameType[]
    brands: BrandNameType[]
    tags: TagNameType[]
    sort: SortProductsType
    minprice: number
    maxprice: number
  }
}

const initialState: ShopPageState = {
  shopPage: {
    categories: [],
    brands: [],
    tags: [],
    sort: 'default',
    minprice: 0,
    maxprice: 999999,
  },
}

export const shopPageSlice = createSlice({
  name: 'shopPage',
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<CategoryNameType>) => {
      const category = action.payload

      if (category === 'all') {
        state.shopPage.categories = []
        return
      }

      if (state.shopPage.categories.includes(category)) {
        state.shopPage.categories = state.shopPage.categories.filter((item) => item !== category)
        return
      }

      state.shopPage.categories.push(category)
    },

    toggleBrands: (state, action: PayloadAction<BrandNameType>) => {
      const brand = action.payload

      if (brand === 'all') {
        state.shopPage.brands = []
        return
      }

      if (state.shopPage.brands.includes(brand)) {
        state.shopPage.brands = state.shopPage.brands.filter((item) => item !== brand)
        return
      }

      state.shopPage.brands.push(brand)
    },

    toggleTags: (state, action: PayloadAction<TagNameType>) => {
      const tag = action.payload

      if (tag === 'all') {
        state.shopPage.tags = []
        return
      }

      if (state.shopPage.tags.includes(tag)) {
        state.shopPage.tags = state.shopPage.tags.filter((item) => item !== tag)
        return
      }

      state.shopPage.tags.push(tag)
    },

    setMinPrice: (state, action: PayloadAction<number>) => {
      state.shopPage.minprice = action.payload
    },

    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.shopPage.maxprice = action.payload
    },

    setSort: (state, action: PayloadAction<SortProductsType>) => {
      state.shopPage.sort = action.payload
    },
  },
})

export const shopPageActions = shopPageSlice.actions

export const shopPageReducer = shopPageSlice.reducer
