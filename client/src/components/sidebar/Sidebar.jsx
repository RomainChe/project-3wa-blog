import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../App.css';

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
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://assets.imgix.net/unsplash/turntable.jpg?w=236&h=236"
          alt="about me"
        />
        <p>
          Bienvenue ! Je m'appelle Romain Chevalier et je suis actuellement étudiant en tant que développeur d'applications web à la 3w Academy voici mon projet de fin d'année.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c, index) => (
            <Link to={`/?cat=${c.name}`} className="link">
            <li key={index} className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <a href="https://facebook.com/" title="Facebook" alt="Facebook"><i className="sidebarIcon fab fa-facebook-square"></i></a>
          <a href="https://twitter.com/" title="Twitter" alt="Twitter"><i className="sidebarIcon fab fa-twitter-square"></i></a>
          <a href="https://www.linkedin.com/" title="Linkedin" alt="Linkedin"><i className="sidebarIcon fab fa-linkedin"></i></a>
          <a href="https://www.instagram.com/" title="Instagram" alt="Instagram"><i className="sidebarIcon fab fa-instagram-square"></i></a>
        </div>
      </div>
    </div>
  );
}
