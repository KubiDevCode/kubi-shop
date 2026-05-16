import type { JSX } from 'react'
import { HomePage } from '@/pages/HomePage/HomePage'
import { ShopPage } from '@/pages/ShopPage/ShopPage'
import { Path, RouterPath, type AppRouterType } from '@/shared/config/router/routerPath'
import { AboutPage } from '@/pages/AboutPage/AboutPage'

export type RouterConfigType = {
  path: (typeof RouterPath)[keyof typeof RouterPath]
  element: JSX.Element
}

export const routerConfig = {
  [Path.HOME]: {
    path: RouterPath[Path.HOME],
    element: <HomePage />,
  },
  [Path.SHOP]: {
    path: RouterPath[Path.SHOP],
    element: <ShopPage />,
  },
  [Path.ABOUT]: {
    path: RouterPath[Path.ABOUT],
    element: <AboutPage />,
  },
} satisfies Record<AppRouterType, RouterConfigType>
