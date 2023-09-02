"use client";

import { RiShoppingCartLine } from "react-icons/ri";
import Image from "next/image";

type NavbarProps = {
  showSearch: boolean;
  setSearchQuery?: (query: string) => void;
  searchQuery?: string;
};

const Navbar: React.FC<NavbarProps> = ({ // Navbar component with specified props
  showSearch,
  setSearchQuery,
  searchQuery,
}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark sticky-top">
      <div className="container-fluid">
        &nbsp; &nbsp;
        <Image
          src="/nepal.gif" // Path to the GIF in the public directory
          alt="My GIF"
          width={25}
          height={25}
        />
        &nbsp; &nbsp;
        <a className="navbar-brand" href="/">
          OnlineStore
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/cart">
                <RiShoppingCartLine />
              </a>
            </li>
          </ul>
          {showSearch && (
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                value={searchQuery}
                aria-label="Search"
                onChange={(e) => setSearchQuery?.(e.target.value)}
              />
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
