import { Suspense } from "react"
import CategoriesData from "./Components/CategoriesData/CategoriesData"
import Header from "./Components/Header/Header"
import Hero from "./Components/Hero_Section/Hero"
import Navbar from "./Components/Navbar/Navbar"
import Selling_json from "./Components/Selling_json/Selling_json"
import Brands from "./Components/Brands/Brands"
import FetchHoney from "./Components/Honey/FetchHoney/FetchHoney"
import LoadHoney from "./Components/Honey/LoadHoney/LoadHoney"
import Honey from "./Components/Honey/ProductHoney/Honey"
import FetchDates from "./Components/Dates/FetchDates"
import Img from "./Components/Img_Section/Img"
import FetchCooking from "./Components/Cooking/FetchCooking"


const categFetch = async () => {
  const res = await fetch("/public/Categories/categories.json")
  return res.json()
}

function App() {
  const promise = categFetch()

  return (
  <div>
    {/* Header */}
    <Header></Header>

    
    {/* Navbar */}
    <Navbar></Navbar>
    <Hero></Hero>

    {/* CategoriesData */}
    <Suspense>
      <CategoriesData promise={promise}></CategoriesData>
    </Suspense>

    {/* Selling */}
    <Selling_json></Selling_json>

    {/* Brands */}
    <Brands></Brands>

    {/* Honey */}
    <FetchHoney></FetchHoney>

    {/* Dates */}
    <FetchDates></FetchDates>

    <Img></Img>

    {/* Cooking */}
    <FetchCooking> </FetchCooking>
  </div>
  )
}

export default App
