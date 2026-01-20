import { Routes, Route } from "react-router-dom"
import EditUser from "../user/editUser"


function HomeRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/EditUser/:id" element={<EditUser/>}/>
      </Routes>
    </div>
  )
}

export default HomeRoutes
