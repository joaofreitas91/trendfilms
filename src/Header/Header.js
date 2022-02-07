import './Header.css';
import Logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <img className="logo" src={Logo} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
