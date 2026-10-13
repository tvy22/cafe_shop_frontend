import { Link } from 'react-router-dom'

export default function CafeFooter() {
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="brand" to="/#home">
            <span className="brand-mark">R</span>
            <span className="brand-name">RUPP Cafe</span>
          </Link>
          <p>Crafting sustainable, premium daily coffee rituals designed to refresh your mind and soothe your soul.</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/#home">Home</Link></li>
            <li><Link to="/#menu">Menu</Link></li>
            <li><Link to="/#story">Our Story</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>hello@ruppcafe.com</li>
            <li>+1 (555) 382-9901</li>
            <li>138 Matcha Way, Seattle</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Follow Us</h4>
          <ul>
            <li><Link to="/#home">Instagram</Link></li>
            <li><Link to="/#home">Facebook</Link></li>
            <li><Link to="/#home">Twitter</Link></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 RUPP Cafe. All rights reserved.</span>
        <span className="footer-legal">
          <Link to="/#home">Privacy Policy</Link>
          <span aria-hidden="true">•</span>
          <Link to="/#home">Terms of Service</Link>
        </span>
      </div>
    </footer>
  )
}