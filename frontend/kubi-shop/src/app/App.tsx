import { RouterProvider } from './providers/routerProvider/ui/RouterProvider'
import { StoreProvider } from './providers/storeProvider/StoreProvider'

function App() {
  return (
    <StoreProvider>
      <RouterProvider />
    </StoreProvider>
  )
}

export default App
