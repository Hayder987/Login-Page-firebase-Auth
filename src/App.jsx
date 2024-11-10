import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"



function App() {


  return (
    <>
      <div className="">
        <NavBar></NavBar>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
