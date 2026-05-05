import type { JSX } from "react"

export type AppRouterType = typeof Path[keyof typeof Path]
export type RouterConfigType = {
    path: typeof RouterPath[keyof typeof RouterPath]
    element: JSX.Element
}
export const Path = {
    HOME: 'home',
    SHOP: 'shop',
} as const

export const RouterPath = {
    [Path.HOME]: '/home',
    [Path.SHOP]: '/shop'
} as const satisfies Record<AppRouterType, string>


