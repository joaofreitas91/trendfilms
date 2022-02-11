import './Header.css';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/trendfilms">
          <img className="logo" src={Logo} alt="logo" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
