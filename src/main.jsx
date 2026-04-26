import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Product from './pages/Product.jsx'
import Contact from './pages/Contact.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    Component:App,
  },
  {
    path:"home",
    Component: Home
  },
  {
    path:"about",
    Component:About,
  },
  {
    path:"product",
    Component:Product
  },
  {
    path:"contact",
    Component:Contact
  },

])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
