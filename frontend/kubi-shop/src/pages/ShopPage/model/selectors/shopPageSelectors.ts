import type { RootState } from "../../../../app/providers/storeProvider/store";


export const getShopPageCategories = (state: RootState) => state.shopPage.shopPage.categories
export const getShopPageBrands = (state: RootState) => state.shopPage.shopPage.brands