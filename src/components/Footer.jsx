import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-brand">
        <h2 className="footer-title">TINY TRINKET CO.</h2>
        <p className="footer-tagline">Collectibles That Spark Joy.</p>
      </div>

      <div className="footer-links">

        {/* FOOTER COL 1 */}
        <ol className="footer-col">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/products">Shop</NavLink></li>
          <li><NavLink to="/contact">Contact Us</NavLink></li>
        </ol>

        {/* FOOTER COL 2 */}
        <ol className="footer-col">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">License</a></li>
          <li><a href="#">Terms Of Use</a></li>
        </ol>

      </div>

      <div className="footer-bottom">
        <p className="copyright">@ 2025 Tiny Trinket Co.</p>

        {/* SOCIAL MEDIA */}
        <ul className="social-links">
          <li>
            <a href="https://www.facebook.com/" target="_blank" aria-label="Facebook">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg" alt="Facebook" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" alt="Instagram" />
            </a>
          </li>
          <li>
            <a href="https://x.com/" target="_blank" aria-label="Twitter">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg" alt="Twitter" />
            </a>
          </li>
        </ul>
      </div>

    </footer>
  )
}

export default Footer