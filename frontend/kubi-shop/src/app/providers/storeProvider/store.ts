import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { shopApi } from '../../../shared/API/api'
import { shopPageReducer } from '../../../pages/ShopPage/model/slice/shopPageSlice'

export const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    shopPage: shopPageReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
