import Link from "next/link";
import ChatBot from "./ChatBot";

export default function Footer() {
  return (
    <footer className="footer">

      {/* =========================================
          FOOTER TOP
      ========================================= */}

      <div className="footer-top">

        {/* BRAND */}
        <div className="footer-brand">

          <Link href="/#home" className="footer-logo">
            <img
              src="/logo.png"
              alt="Mina Bahir Logo"
            />
          </Link>

          <p>
            Graphic designer creating bold brands,
            memorable visuals and creative experiences
            that help businesses stand out.
          </p>

          <a
            href="mailto:hello@example.com"
            className="footer-email"
          >
            hello@example.com
          </a>

        </div>


        {/* QUICK LINKS */}
        <div className="footer-column">

          <h4>Explore</h4>

          <Link href="/#home">
            Home
          </Link>

          <Link href="/#about">
            About
          </Link>

          <Link href="/#portfolio">
            Portfolio
          </Link>

          <Link href="/#contact">
            Contact
          </Link>

        </div>


        {/* SERVICES */}
        <div className="footer-column">

          <h4>Services</h4>

          <Link href="/#services">
            Branding
          </Link>

          <Link href="/#services">
            Social Media
          </Link>

          <Link href="/#services">
            Print Design
          </Link>

          <Link href="/#services">
            Visual Identity
          </Link>

        </div>


        {/* SOCIAL */}
        <div className="footer-column">

          <h4>Follow Me</h4>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram ↗
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Behance ↗
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dribbble ↗
          </a>

        </div>

      </div>


      {/* =========================================
          CHAT BOT
      ========================================= */}

      <ChatBot />


      {/* =========================================
          CTA
      ========================================= */}

      <div className="footer-cta">

        <div>

          <span>
            HAVE A PROJECT IN MIND?
          </span>

          <h2>
            Let's create something{" "}
            <strong>
              amazing.
            </strong>
          </h2>

        </div>


        <Link
          href="/#contact"
          className="footer-cta-button"
        >
          Let's Work Together

          <span>
            ↗
          </span>
        </Link>

      </div>


      {/* =========================================
          BOTTOM
      ========================================= */}

      <div className="footer-bottom">

        <span>
          © 2026 Mina Bahir. All Rights Reserved.
        </span>

        <span>
          Designed &amp; Crafted with passion.
        </span>

      </div>

    </footer>
  );
}

