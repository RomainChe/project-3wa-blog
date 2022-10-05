import "../../App.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function Sidebar() {
  return (
    <>
      <Header />
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>
          <img src="https://assets.imgix.net/unsplash/turntable.jpg?w=236&h=236" alt="about me"/>
          <span className="aboutTitle">Bonjour, je m'appelle Romain Chevalier, j'ai 21ans et je suis en alternance chez Orchestra !</span>
          <span className="aboutText aboutSpan">
            Actuellement étudiant en tant que développeur d'apllications web à
            la 3w Academy voici mon projet de fin d'année.
          </span>
          <span className="aboutText aboutSpan">
            Cela va faire maintenant 1 ans que j'ai commencé à faire du dév Web, j'ai commencer par un bootcamp de 3mois avec la 3w Academy pour apprendre les langage basiques
            comme le Html, le Css, le Javascript et le PHP. Cela fera 1 ans et 3 mois lors de mon oral de projet, je suis donc actuellement en alternance dans l'entreprise
            Orchestra en tant que Développeur Salesforce Commerce Cloud, j'ai travaillé pendant toute l'année sur la migrations du site internet d'
            <a className="link" href="https://fr.shop-orchestra.com/">Orchestra</a>, j'ai donc appris à utiliser gitHub et l'outils saleforce. Nous utilisons Node.js pour la partie back et Jquery
            pour la partie front
          </span>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
            <a href="https://facebook.com/" title="Facebook" alt="Facebook">
              <i className="sidebarIcon fab fa-facebook-square"></i>
            </a>
            <a href="https://twitter.com/" title="Twitter" alt="Twitter">
              <i className="sidebarIcon fab fa-twitter-square"></i>
            </a>
            <a href="https://www.linkedin.com/" title="Linkedin" alt="Linkedin">
              <i className="sidebarIcon fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/" title="Instagram" alt="Instagram">
              <i className="sidebarIcon fab fa-instagram-square"></i>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
