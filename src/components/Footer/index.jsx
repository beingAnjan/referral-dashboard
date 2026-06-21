import "./index.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h3 className="footer-logo">Go Business</h3>

        <div className="footer-links">
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Privacy</a>
          <a href="/">Terms</a>
        </div>

        <p className="footer-copy">
          © 2024 Go Business, Inc.
        </p>
      </div>
    </footer>
  );
}

export default Footer;