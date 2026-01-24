import { Routes, Route } from "react-router-dom"
import EditUser from "../user/editUser"
import User from "../user/user"
import AddUser from "../user/addUser"


function HomeRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<User/>}/>
        <Route path="/AddUser" element={<AddUser/>}/>
        <Route path="/EditUser/:slug" element={<EditUser/>}/>
      </Routes>
    </div>
  )
}

export default HomeRoutes
