import '../../App.css';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footerTitles">
        <span className="footerTitleSm">React & Node</span>
        <span className="footerTitleSm">Blog</span>
        <span className="footerTitleSmaller">Copyright © 2022 3wa Academy</span>
        <div>
            <span className="footerConf">Mentions légales</span>
            <span className="footerConf">Politique de confidentialité</span>
            <span className="footerConf">Sécurité</span>
        </div>
      </div>
    </div>
  );
}
