import axios from "axios";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name : string;
  img:string|null;
}

function User() {
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

    useEffect(()=>{
      fetchuser()
    },[])

  return (
     <div>
      {data.map((user) => (
        <ul key={user.id}>
          <li>{user.id}</li>
          <li>{user.name}</li>
          <li>
            {user.img && (
              <img src={`/upload/${user.img}`} alt={user.name} />
            )}
          </li>
        </ul>
      ))}
    </div>
  );
}

export default User
