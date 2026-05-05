import { HomePage } from "../../../../pages/HomePage/HomePage"
import { ShopPage } from "../../../../pages/ShopPage/ShopPage"
import { Path, RouterPath, type AppRouterType, type RouterConfigType, } from "./router"

export const routerConfig = {
    [Path.HOME]: {
        path: RouterPath[Path.HOME],
        element: <HomePage />
    },
    [Path.SHOP]: {
        path: RouterPath[Path.SHOP],
        element: <ShopPage />
    }
} satisfies Record<AppRouterType, RouterConfigType>