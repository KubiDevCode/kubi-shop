import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routerConfig } from '../config/routerConfig';

export const RouterProvider = () => {
    return (
        <BrowserRouter>
            <Routes>
                {Object.values(routerConfig).map((item) => (
                    <Route
                        key={item.path}
                        path={item.path}
                        element={item.element}
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
};