import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api'
import { shopPageReducer } from '@/pages/ShopPage/model/slice/shopPageSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    shopPage: shopPageReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
