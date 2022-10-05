import '../../App.css';

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://assets.imgix.net/hp/snowshoe.jpg?h=650&w=940&auto=compress&cs=tinysrgb&dpr=2"
        alt="Header"
      />
    </div>
  );
}
