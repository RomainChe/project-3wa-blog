/* eslint-disable jsx-a11y/img-redundant-alt */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import '../../App.css';

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <a href="https://facebook.com/" title="Facebook" alt="Facebook"><i className="topIcon fab fa-facebook-square"></i></a>
        <a href="https://twitter.com/" title="Twitter" alt="Twitter"><i className="topIcon fab fa-twitter-square"></i></a>
        <a href="https://www.linkedin.com/" title="Linkedin" alt="Linkedin"><i className="topIcon fab fa-linkedin"></i></a>
        <a href="https://www.instagram.com" title="Instagram" alt="Instagram"><i className="topIcon fab fa-instagram-square"></i></a>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            <Link className="link" to="/login">
            {user && "LOGOUT"}
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF+user.profilePic} alt="Profile picture" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
