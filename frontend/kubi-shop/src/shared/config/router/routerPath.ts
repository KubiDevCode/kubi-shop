export type AppRouterType = typeof Path[keyof typeof Path]

export const Path = {
    HOME: 'home',
    SHOP: 'shop',
} as const

export const RouterPath = {
    [Path.HOME]: '/',
    [Path.SHOP]: '/shop'
} as const satisfies Record<AppRouterType, string>

export type RouterPathType = typeof RouterPath[keyof typeof RouterPath]


