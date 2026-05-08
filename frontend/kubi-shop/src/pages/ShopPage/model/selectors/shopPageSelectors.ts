import type { RootState } from "../../../../app/providers/storeProvider/store";


export const getShopPagePagination = (state: RootState) => state.shopPage.shopPage.pagination
export const getShopPageCategories = (state: RootState) => state.shopPage.shopPage.categories