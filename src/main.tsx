import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.tsx'
import ColorConverter from './ColorConverter.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>

    <Routes>
      <Route index element={<App />} />
      <Route path="ColorConverter" element={<ColorConverter />} />
    </Routes>

  </BrowserRouter>,
)
