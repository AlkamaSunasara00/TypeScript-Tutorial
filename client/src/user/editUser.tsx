import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type User = {
  id: number;
  name: string;
  img: string; // existing image filename
};

function EditUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [existingImg, setExistingImg] = useState<string>("");
  const [newImg, setNewImg] = useState<File | undefined>(undefined);

  // 🔹 Fetch existing user
  const fetchData = async () => {
    try {
      const response = await axios.get<User>(
        `http://localhost:5000/getuserbyid/${id}`
      );

      setName(response.data.name);
      setExistingImg(response.data.img);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // 🔹 Submit update
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);

      // only send image if user selected a new one
      if (newImg) {
        formData.append("img", newImg);
      }

      await axios.put(
        `http://localhost:5000/edituser/${id}`,
        formData
      );

      alert("DATA UPDATED SUCCESSFULLY ✅");
      navigate("/");
    } catch (error) {
      console.error("Update failed", error);
      alert("FAILED TO UPDATE DATA ❌");
    }
  };

  return (
    <div>
      <h2>Edit User</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* show existing image */}
        {existingImg && (
          <div>
            <p>Current Image:</p>
            <img
              src={`http://localhost:5000/uploads/${existingImg}`}
              alt="current"
              width={100}
            />
          </div>
        )}

        <div>
          <label>Change Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(
              e: React.ChangeEvent<HTMLInputElement>
            ) => {
              const file = e.target.files?.[0];
              if (file) setNewImg(file);
            }}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditUser;