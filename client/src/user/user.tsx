import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

type User = {
  id: number;
  name : string;
  img:string|null;
}

function User() {

  const id  = useParams()
    const [data,setData] = useState<User[]>([])
    const fetchuser = async()=>{
      try {
        const res = await axios.get<User[]>("http://localhost:5000/getuser")
        setData(res.data)
        console.log("data is get")
      } catch (error) {
        console.log(error);
        
      }
    }

    const handleDelete = async(userId:number)=>{
      try {
        await axios.delete<User[]>(`http://localhost:5000/deleteuser/${userId}`)
        console.log("user is deleted successfully")
        fetchuser()
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      fetchuser()
    },[])

  return (
<>
    <div>
      <h1>hello</h1>
      <NavLink to={"/AddUser"}>
      <button>Add User</button>
      </NavLink>
    </div>
     <div>
      {data.map((user) => (
        <ul key={user.id}>
          <li>{user.id}</li>
          <li>{user.name}</li>
          <li >
            {user.img && (
              <img src={`http://localhost:5000/upload/${user.img}`} alt={user.name} width={"80px"}/>
            )}
          </li>
          <li>
            <NavLink to={`EditUser/${id}`}>
            <button>
              Edit User
            </button>
            </NavLink>
          </li>
          <li>
            <button onClick={()=> handleDelete(user.id)}>
              Delete User
            </button>
          </li>
        </ul>
      ))}
    </div>
    </>
  );
}

export default User
