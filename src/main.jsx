import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Product from './pages/Product.jsx'
import Contact from './pages/Contact.jsx'
import RootError from './pages/RootError.jsx'
import { CartProvider } from './context/CartContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <RootError />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "product",
        element: <Product />
      },
      {
        path: "contact",
        element: <Contact />
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
