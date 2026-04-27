import { Suspense, useState, useMemo } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CategoriesData from "./components/categories/CategoriesData"
import Header from "./Components/Header/Header"
import Hero from "./Components/Hero_Section/Hero"
import Navbar from "./Components/Navbar/Navbar"
import Brands from "./components/brands/Brands"
import FetchHoney from "./Components/Honey/FetchHoney/FetchHoney"
import LoadHoney from "./Components/Honey/LoadHoney/LoadHoney"
import Honey from "./Components/Honey/ProductHoney/Honey"
import FetchDates from "./Components/Dates/FetchDates"
import Img from "./Components/Img_Section/Img"
import FetchCooking from "./Components/Cooking/FetchCooking"
import Fetch_You from "./Components/For_You/Fetch_You"
import FetchOr from "./Components/Organic/FetchOr"
import Customer from "./Components/customer_review/Customer"
import Footer from "./components/footer/Footer"
import apiClient from "./api/apiClient"

function App() {
    const promise = useMemo(() => apiClient.fetchCategories(), [])

    const [addCart, setAddCart] = useState([])

    const handleCart = (e) => {
        const newitem = [...addCart, e]
        setAddCart(newitem)
        toast.success("Add To Cart")

    }

    const removeItem = (id) => {
        const remove = addCart.filter(p => p.id !== id)
        setAddCart(remove)
        toast.info("Remove item")
    }

    const handleBuyNow = (item) => {
        toast("Buy Now", item)
    }


    return (
        <div>
            {/* Header */}
            <Header cartItems={addCart} removeItem={removeItem} buyNow={handleBuyNow}></Header>


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

            {/* For you */}
            <Fetch_You handleCart={handleCart}></Fetch_You>

            {/* Organic */}
            <FetchOr handleCart={handleCart}></FetchOr>

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
