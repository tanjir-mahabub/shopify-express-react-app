import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className='nav'>
        <h3><Link to="/">Logo</Link></h3>
        <ul className='navbar-nav'>
            <li className='nav-links'><Link to="/about">About</Link></li>
            <li className='nav-links'><Link to="/shop">Shop</Link></li>
        </ul>
    </nav>
  )
}

export default Nav;