import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/app/index.css'
import App from './app/App.tsx'
import { StoreProvider } from './app/providers/storeProvider/StoreProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
)
