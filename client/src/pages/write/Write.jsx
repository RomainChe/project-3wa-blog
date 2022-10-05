/* eslint-disable jsx-a11y/img-redundant-alt */
import { useContext, useState, useEffect} from "react";
import '../../App.css';
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [cats, setCats] = useState([]);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const { user } = useContext(Context);

  //get the username
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.error("problem with the image");
      }
    }
    try {
      console.log(newPost);
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.error("Title already used");
    }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="image write" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormFirstGroup">
          <label className="writeFormIcon" htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            className="none"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
          <select onChange={(e) => setCategories(e.target.value)} className="writeSelect" id="selectInput">{cats.map((c) => (
            <option value={c.key}>{c.name}</option>
          ))}</select>
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e => setDesc(e.target.value)}
          ></textarea>
           <button className="writeSubmit" type="submit">
          Publish
        </button>
        </div>
      </form>
    </div>
  );
}
