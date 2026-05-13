import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import Contact from './pages/Contact.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import RootError from './pages/RootError.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import TrackOrder from './pages/TrackOrder.jsx'
import ViewCart from './pages/ViewCart.jsx'
import WishList from './pages/WishList.jsx'
import SignIn from './pages/SignIn.jsx'
import UserProfile from './pages/UserProfile.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { UserDataProvider } from './context/UserDataContext.jsx'

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
        path: "products",
        element: <ProductsPage />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "product/:slug",
        element: <ProductDetails />
      },
      {
        path:"track",
        element: <TrackOrder/>
      },
      {
        path:"cart",
        element:<ViewCart/>
      },
      {
        path: "wishlist",
        element: <WishList />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserDataProvider>
        <WishlistProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </WishlistProvider>
      </UserDataProvider>
    </AuthProvider>
  </StrictMode>,
)
