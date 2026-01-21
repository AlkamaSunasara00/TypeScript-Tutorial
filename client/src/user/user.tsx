import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

type User = {
  id: number;
  name: string;
  img: string | null;
}

function User() {

  // const id = useParams()
  const [data, setData] = useState<User[]>([])
  const fetchuser = async () => {
    try {
      const res = await axios.get<User[]>("http://localhost:5000/getuser")
      setData(res.data)
      console.log("data is get")
    } catch (error) {
      console.log(error);

    }
  }

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete<User[]>(`http://localhost:5000/deleteuser/${userId}`)
      console.log("user is deleted successfully")
      fetchuser()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchuser()
  }, [])

  return (
    <>
      <div className="user-page">

        <div className="user-header">
          <h1>Users</h1>
          <NavLink to="/AddUser">
            <button className="add-btn">Add User</button>
          </NavLink>
        </div>

        <div className="user-list">
          {data.map((user) => (
            <div className="user-card" key={user.id}>
              {user.img && (
                <img src={`http://localhost:5000/upload/${user.img}`} />
              )}
              <div className="user-name">{user.name}</div>

              <div className="user-actions">
                <NavLink to={`EditUser/${user.id}`}>
                  <button className="edit-btn">Edit</button>
                </NavLink>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </>
  );
}

export default User
