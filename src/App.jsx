import { Suspense } from "react"
import CategoriesData from "./Components/CategoriesData/CategoriesData"
import Header from "./Components/Header/Header"
import Hero from "./Components/Hero_Section/Hero"
import Navbar from "./Components/Navbar/Navbar"
import Selling_json from "./Components/Selling_json/Selling_json"


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
  </div>
  )
}

export default App
