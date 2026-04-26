import { Suspense, useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CategoriesData from "./Components/CategoriesData/CategoriesData"
import Header from "./Components/Header/Header"
import Hero from "./Components/Hero_Section/Hero"
import Navbar from "./Components/Navbar/Navbar"
import Brands from "./Components/Brands/Brands"
import FetchHoney from "./Components/Honey/FetchHoney/FetchHoney"
import LoadHoney from "./Components/Honey/LoadHoney/LoadHoney"
import Honey from "./Components/Honey/ProductHoney/Honey"
import FetchDates from "./Components/Dates/FetchDates"
import Img from "./Components/Img_Section/Img"
import FetchCooking from "./Components/Cooking/FetchCooking"
import Customer from "./Components/customer_review/Customer"
import Footer from "./Components/Footer/Footer"


const categFetch = async () => {
  const res = await fetch("/public/Categories/categories.json")
  return res.json()
}

function App() {
  const promise = categFetch()

    const [addCart,setAddCart] = useState([])

    const handleCart = (e) =>{
        const existingItemIndex = addCart.findIndex(item => item.id === e.id);
        if (existingItemIndex !== -1) {
            const newCart = [...addCart];
            newCart[existingItemIndex].quantity = (newCart[existingItemIndex].quantity || 1) + 1;
            setAddCart(newCart);
        } else {
            setAddCart([...addCart, { ...e, quantity: 1 }]);
        }
        toast.success("Add To Cart")
    }

    const updateQuantity = (id, amount) => {
        setAddCart(addCart.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, (item.quantity || 1) + amount);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    }
    
   const removeItem = (id) => {
    const remove = addCart.filter(p => p.id !== id)
    setAddCart(remove)
   toast.info("Remove item")
   }

   const clearCart = () => {
    setAddCart([])
    toast.info("Cart Cleared")
   }

    const handleBuyNow = (item) => {
    toast("Buy Now",item)
    }


  return (
  <div>
    {/* Header */}
    <Header cartItems={addCart} removeItem={removeItem} clearCart={clearCart} buyNow={handleBuyNow} updateQuantity={updateQuantity}></Header>

    
    {/* Navbar */}
    <Navbar></Navbar>
    <Hero></Hero>

    {/* CategoriesData */}
    <Suspense>
      <CategoriesData promise={promise}></CategoriesData>
    </Suspense>

    {/* Selling */}

    {/* Brands */}
    <Brands></Brands>

    {/* Honey */}
    <FetchHoney handleCart={handleCart}></FetchHoney>

    {/* Dates */}
    <FetchDates handleCart={handleCart}></FetchDates>

    <Img></Img>

    {/* Cooking */}
    <FetchCooking handleCart={handleCart}> </FetchCooking>

    {/* Customer */}
    <Customer></Customer>

    {/* Footer */}
    <Footer></Footer>




    {/* Toastfy */}
<ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
  </div>
  )
}

export default App
