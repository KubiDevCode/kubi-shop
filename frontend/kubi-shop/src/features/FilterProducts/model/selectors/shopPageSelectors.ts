import type { RootState } from '@/shared/model/store'

export const getShopPageCategories = (state: RootState) => state.shopPage.shopPage.categories

export const getShopPageBrands = (state: RootState) => state.shopPage.shopPage.brands

export const getShopPageTags = (state: RootState) => state.shopPage.shopPage.tags

export const getShopPageMinPrice = (state: RootState) => state.shopPage.shopPage.minprice

export const getShopPageMaxPrice = (state: RootState) => state.shopPage.shopPage.maxprice
