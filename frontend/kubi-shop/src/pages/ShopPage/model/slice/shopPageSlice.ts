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

        toggleCategory: (state, action: PayloadAction<CategoryNameType>) => {
            const category = action.payload

            if (category === 'all') {
                state.shopPage.categories = []
                return
            }

            if (state.shopPage.categories.includes(category)) {
                state.shopPage.categories = state.shopPage.categories.filter(
                    item => item !== category
                );
                return
            }

            state.shopPage.categories.push(category)
        },

        setPagination: (state, action: PayloadAction<number>) => {
            state.shopPage.pagination = action.payload
        },
        // addCategory: (state, action: PayloadAction<CategoryNameType>) => {
        //     state.shopPage.categories.push(action.payload)
        // },
        // removeCategory: (state, action: PayloadAction<CategoryNameType>) => {
        //     state.shopPage.categories = state.shopPage.categories.filter(
        //         item => item !== action.payload
        //     );
        // },
        // resetCategory: (state) => {
        //     state.shopPage.categories = []
        // }
    },
})

export const shopPageActions = shopPageSlice.actions;

export const shopPageReducer = shopPageSlice.reducer;