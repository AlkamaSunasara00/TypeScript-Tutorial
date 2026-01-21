import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../form.css'

type User = {
  id: number;
  name: string;
  img: string;
};

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [existingImg, setExistingImg] = useState("");
  const [newImg, setNewImg] = useState<File | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get<User[]>(
        `http://localhost:5000/getuserbyid/${id}`
      );
      const user = response.data[0];
      setName(user.name);
      setExistingImg(user.img);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (newImg) formData.append("img", newImg);

      await axios.put(
        `http://localhost:5000/edituser/${id}`,
        formData
      );

      alert("DATA UPDATED ✅");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("FAILED TO UPDATE ❌");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2>Edit User</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {existingImg && (
            <img
              className="preview-img"
              src={`http://localhost:5000/upload/${existingImg}`}
              alt="current"
            />
          )}

          <div className="form-group">
            <label>Change Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setNewImg(file);
              }}
            />
          </div>

          <button className="form-btn" type="submit">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
