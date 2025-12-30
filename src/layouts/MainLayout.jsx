import { Outlet } from "react-router-dom"
import { Footer } from "../components/Shared/Footer"
import { Navbar } from "../components/Shared/Navbar"

export const MainLayout = () => {
  return (
    <>
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-green-900 via-green-700 to-green-500 shadow-xl">
    <Navbar />

    </header>

    <main className="mt-[60px] lg:mt-[84px] min-h-[calc(100vh-244px)]">
      <Outlet></Outlet>
    </main>

    <footer className="bg-green-900">
     <Footer></Footer>
    </footer>
    </>
  )
}
