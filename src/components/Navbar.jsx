import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-[var(--surface)] text-white px-20 py-2 shadow-md">
      {/* Logo */}
      <div className="tracking-wide">
        <Link to="/">
          <img
            src={logo}
            alt="CineTrack Logo"
            className="h-20 w-50 object-contain"
          />
        </Link>
      </div>

      {/* Links */}
      <div className="flex gap-8 text-lg">
        <Link
          to="/"
          className="relative text-[var(--text-primary)] hover:text-[var(--accent)] cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-400 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-400 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
        >
          Home
        </Link>
        <Link
          to="/watchlist"
          className="relative text-[var(--text-primary)] hover:text-[var(--accent)] cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-400 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-400 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
        >
          Watchlist
        </Link>
        <Link
          to="/about"
          className="relative text-[var(--text-primary)] hover:text-[var(--accent)] cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-400 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-400 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
        >
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
