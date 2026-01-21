import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../form.css'


function AddUser() {
  const [name, setName] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!img) return;

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("img", img);

      await axios.post("http://localhost:5000/adduser", formData);

      alert("DATA ADDED ✅");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("ERROR TO ADD DATA ❌");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2>Add User</h2>

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

          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setImg(file);
              }}
            />
          </div>

          <button className="form-btn" type="submit">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
