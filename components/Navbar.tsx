"use client";

export default function Navbar() {
  return (
    <nav className="navbar">

      <a href="#home" className="logo">
        <img
          src="/logo.png"
          alt="Mina Bahir Logo"
        />
      </a>

      <div className="nav-links">

        <a href="#home">
          Home
        </a>

        <a href="#about">
          About
        </a>

        {/* <a href="#services">
          Services
        </a> */}

        <a href="#portfolio">
          Portfolio
        </a>

        <a href="#contact">
          Contact
        </a>

      </div>

    </nav>
  );
}