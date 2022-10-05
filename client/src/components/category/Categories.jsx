import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="category">
      <div className="categoryItem">
        <span className="categoryTitle">CATEGORIES</span>
        <ul className="categoryList">
          {cats.map((c, index) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li key={index} className="categoryListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
