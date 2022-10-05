/* eslint-disable jsx-a11y/img-redundant-alt */
import "../../App.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Footer from "../../components/footer/Footer";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${user._id}`, {
        data: { 
          username: user.username
         },
      });
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.log("error")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <>
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <button className="settingsDeleteTitle" onClick={handleDelete}>Delete Account</button>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
                src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                alt="profile picture"
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                className="none"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label>Username</label>
            <input
              required 
              placeholder={user.username}
              pattern="[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ-\s]{1,}"
              title="Minimum one characters, letters only !"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              required 
              placeholder={user.email}
              pattern="[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ0-9-@.]{1,}"
              title="Minimum one characters, letters only !"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              required 
              pattern="^(?=.*[A-Za-zÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ-])(?=.*\d)[A-Za-zÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\d-]{8,}$"
              title="Minimum eight characters, at least one letter and one number !"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="settingsSubmit" type="submit">
              Update
            </button>
            {success && <span className="update">Profile has been updated...</span>}
          </form>
        </div>
        <Sidebar />
      </div>
      <Footer />
    </>
  );
}
