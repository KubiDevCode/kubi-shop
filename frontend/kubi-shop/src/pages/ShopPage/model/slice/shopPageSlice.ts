import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CategoryNameType } from '../../../../widgets/CategoriesWidget/types/categoryTypes'

export interface ShopPageState {
    shopPage: {
        pagination: number
        categories: CategoryNameType[]
    }
}

const initialState: ShopPageState = {
    shopPage: {
        pagination: 1,
        categories: []
    }
}

export const shopPageSlice = createSlice({
    name: 'shopPage',
    initialState,
    reducers: {
        setPagination: (state, action: PayloadAction<number>) => {
            state.shopPage.pagination = action.payload
        },
        addCategory: (state, action: PayloadAction<CategoryNameType>) => {
            state.shopPage.categories.push(action.payload)
        },
        removeCategory: (state, action: PayloadAction<CategoryNameType>) => {
            state.shopPage.categories.filter(item => item !== action.payload)
        },
        resetCategory: (state) => {
            state.shopPage.categories = []
        }
    },
})

export const shopPageActions = shopPageSlice.actions;

export const shopPageReducer = shopPageSlice.reducer;