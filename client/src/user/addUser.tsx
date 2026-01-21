import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  name : string;
  img:string|null;
}

function AddUser() {
  // const [data, setData] = useState<User[]>([]);
  const [name, setName] = useState<string>("");
  const [img, setImg] = useState<File|undefined>(undefined);

const navigate = useNavigate();


  const getData = async () => {
    try {
     await axios.get<User[]>("http://localhost:5000/getuser");
      // setData(response.data);
    } catch (error) {
      console.error(error); 
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!img) return;
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("img", img);

      await axios.post("http://localhost:5000/adduser", formData);

      alert("DATA ADDED ✅");
      setName("");
      setImg(undefined);
      navigate("/")
      getData();
    } catch (error) {
      console.error(error);
      alert("ERROR TO ADD DATA ❌");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="img">Image</label>
          <input
            id="img"
            type="file"
            accept="image/*"
            required
            onChange={(
              e: React.ChangeEvent<HTMLInputElement>
            ) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setImg(file);
            }}
          />
        </div>

        <button type="submit">ADD DATA</button>
      </form>
    </div>
  );
}

export default AddUser;