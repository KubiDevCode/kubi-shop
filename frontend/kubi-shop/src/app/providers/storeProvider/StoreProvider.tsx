import { Provider } from "react-redux";
import { store } from "./store";
import type { ReactNode } from "react";

interface props {
    children: ReactNode
}

export const StoreProvider = ({ children }: props) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
};