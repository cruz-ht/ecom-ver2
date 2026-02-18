
import { NavLink } from 'react-router-dom'
import logobox from '../assets/logobox.png'


function Navbar() {
  return (
    <header>

      {/* LOGO */}
      <NavLink className="logo" to="/">
        <img src={logobox} alt="Cruz Riot Home Logo" />
      </NavLink>

      {/* NAV MENU */}
      <nav>
        <ol className="top-menu">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/products">Shop</NavLink></li>
          <li><NavLink to="/contact">Contact Us</NavLink></li>
        </ol>
      </nav>

    </header>
  )
}

export default Navbar