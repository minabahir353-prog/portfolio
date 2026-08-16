"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import ChatBot from "../components/ChatBot";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";

export type Service = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export type CartItem = Service & {
  quantity: number;
};

const CART_COOKIE_NAME = "mina_cart";

/* =========================================
   COOKIE FUNCTIONS
========================================= */

function setCartCookie(cart: CartItem[]) {
  document.cookie = `${CART_COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(cart)
  )}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
}

function getCartCookie(): CartItem[] {
  try {
    const cookies = document.cookie.split("; ");

    const cartCookie = cookies.find((cookie) =>
      cookie.startsWith(`${CART_COOKIE_NAME}=`)
    );

    if (!cartCookie) {
      return [];
    }

    const value = cartCookie.split("=")[1];

    if (!value) {
      return [];
    }

    return JSON.parse(decodeURIComponent(value));
  } catch (error) {
    console.error("Error reading cart cookie:", error);

    return [];
  }
}

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [cartLoaded, setCartLoaded] = useState(false);

  const [typedText, setTypedText] = useState("");

  const words = [
    "Graphic Designer",
    "Brand Designer",
    "Visual Artist",
    "Creative Designer",
  ];

  const [wordIndex, setWordIndex] = useState(0);

  /* =========================================
     LOAD CART FROM COOKIE
  ========================================= */

  useEffect(() => {
    const savedCart = getCartCookie();

    setCartItems(savedCart);

    setCartLoaded(true);
  }, []);

  /* =========================================
     SAVE CART TO COOKIE
  ========================================= */

  useEffect(() => {
    if (!cartLoaded) {
      return;
    }

    setCartCookie(cartItems);
  }, [cartItems, cartLoaded]);

  /* =========================================
     TYPING EFFECT
  ========================================= */

  useEffect(() => {
    const word = words[wordIndex];

    let index = 0;

    setTypedText("");

    const typing = setInterval(() => {
      setTypedText(word.slice(0, index + 1));

      index++;

      if (index === word.length) {
        clearInterval(typing);

        setTimeout(() => {
          setWordIndex(
            (prev) => (prev + 1) % words.length
          );
        }, 1800);
      }
    }, 80);

    return () => {
      clearInterval(typing);
    };
  }, [wordIndex]);

  /* =========================================
     ADD TO CART
  ========================================= */

  const addToCart = (service: Service) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === service.id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === service.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...service,
          quantity: 1,
        },
      ];
    });
  };

  /* =========================================
     INCREASE
  ========================================= */

  const increaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  /* =========================================
     DECREASE
  ========================================= */

  const decreaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /* =========================================
     REMOVE COMPLETELY
  ========================================= */

  const removeAllFromCart = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => item.id !== id
      )
    );
  };

  /* =========================================
     TOTAL ITEMS
  ========================================= */

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  /* =========================================
     TOTAL PRICE
  ========================================= */

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <main>

      {/* =========================================
          NAVBAR
      ========================================= */}

      <Navbar
      />

      {/* =========================================
          HERO
      ========================================= */}

      <section
        className="hero-redesign"
        id="home"
      >

        <div className="hero-glow hero-glow-1" />

        <div className="hero-glow hero-glow-2" />

        <div className="hero-grid" />

        <div className="hero-redesign-content">

          <div className="hero-intro">
            <span />
            AVAILABLE FOR FREELANCE
          </div>

          <h1>
            Hi, I'm

            <span className="hero-name">
              Mina Bahir.
            </span>
          </h1>

          <div className="hero-role">
            <span>
              {typedText}
            </span>

            <b>|</b>
          </div>

          <p className="hero-description">
            I create bold visual identities,
            memorable brands and creative
            digital experiences that help
            businesses stand out.
          </p>

          <div className="hero-actions">

            <a
              href="#portfolio"
              className="hero-primary-btn"
            >
              View My Work

              <span>
                ↗
              </span>
            </a>

            <a
              href="#contact"
              className="hero-secondary-btn"
            >
              Let's Work Together
            </a>

          </div>

          <div className="hero-stats">

            <div className="hero-stat">
              <strong>
                50+
              </strong>

              <span>
                Projects
              </span>
            </div>

            <div className="stat-line" />

            <div className="hero-stat">
              <strong>
                20+
              </strong>

              <span>
                Brands
              </span>
            </div>

            <div className="stat-line" />

            <div className="hero-stat">
              <strong>
                3+
              </strong>

              <span>
                Years
              </span>
            </div>

          </div>

        </div>

        {/* =========================================
            HERO IMAGE
        ========================================= */}

        <div className="hero-visual">

          <div className="hero-ring" />

          <div className="hero-ring hero-ring-2" />

          <div className="hero-image-wrapper">

            <div className="hero-image">

              <img
                src="/profile.jpg"
                alt="Mina Bahir"
              />

            </div>

          </div>

          <div className="floating-card card-ai">

            <span>
              Ai
            </span>

            <small>
              Illustrator
            </small>

          </div>

          <div className="floating-card card-ps">

            <span>
              Ps
            </span>

            <small>
              Photoshop
            </small>

          </div>

          <div className="floating-card card-brand">

            <strong>
              ✦
            </strong>

            <small>
              Branding
            </small>

          </div>

          <div className="hero-dot dot-1" />

          <div className="hero-dot dot-2" />

          <div className="hero-dot dot-3" />

        </div>

      </section>

     

<section className="about" id="about">
  <div className="about-container">

    {/* HEADER */}
    <div className="about-header">
      <span className="section-label">ABOUT ME</span>

      <h2>
        About <span>Me</span>
      </h2>

      <p>
        A graphic designer focused on creating bold visual identities,
        engaging digital experiences, and designs that help brands stand out.
      </p>
    </div>

    {/* CONTENT */}
    <div className="about-content">

      {/* STORY */}
      <div className="about-story">

        <div className="about-story-line"></div>

        <span className="about-small-label">
          MY STORY
        </span>

        <h3>
          Turning ideas into
          <span> visual experiences.</span>
        </h3>

        <p>
          I’m a graphic designer passionate about transforming ideas
          into meaningful and visually powerful designs.
        </p>

        <p>
          My work focuses on creating strong visual identities,
          social media designs, advertising materials, and creative
          solutions that communicate clearly and leave an impression.
        </p>

        <p>
          I believe great design is not just about making something
          look good — it is about creating a visual language that
          connects a brand with its audience.
        </p>

        <div className="about-signature">
          <span>Designing with purpose.</span>
          <strong>✦</strong>
        </div>

      </div>

      {/* INFO CARDS */}
      <div className="about-cards">

        <div className="about-card">
          <div className="about-card-icon">
            ✦
          </div>

          <div>
            <h3>Creative Approach</h3>

            <p>
              Every project starts with an idea, then turns into
              a visual concept built around the brand and its audience.
            </p>
          </div>
        </div>


        <div className="about-card">
          <div className="about-card-icon">
            ◈
          </div>

          <div>
            <h3>What I Create</h3>

            <p>
              Brand identities, logos, social media designs,
              advertising visuals, print materials and creative campaigns.
            </p>
          </div>
        </div>


        <div className="about-card about-card-wide">
          <div className="about-card-icon">
            ↗
          </div>

          <div>
            <h3>Design That Connects</h3>

            <p>
              My goal is to create designs that do more than look
              beautiful — they communicate, attract attention and
              make brands memorable.
            </p>
          </div>
        </div>

      </div>

    </div>

  </div>
</section>






{/* ================= PORTFOLIO ================= */}

<Portfolio/>








     {/* ================= CONTACT SECTION ================= */}

<section className="contact-section" id="contact">

  {/* HEADER */}
  <div className="contact-header">

    <div className="section-label">
      <span></span>
      CONTACT ME
      <span></span>
    </div>

    <h2>
      Let&apos;s <strong>Work</strong> Together
    </h2>

    <p>LET&apos;S CREATE SOMETHING GREAT</p>

  </div>


  <div className="contact-container">

    {/* ================= LEFT SIDE ================= */}

    <div className="contact-info">

      <div className="contact-intro">
        Have a design project in mind? Whether it&apos;s branding,
        social media content, or a complete visual identity —
        I&apos;m here to turn your idea into something memorable.
      </div>


      {/* PHONE */}

      <a
        href="tel:01554497569"
        className="contact-card"
      >

        <div className="contact-icon">

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.27-1.23a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
          </svg>

        </div>

        <div>
          <span>PHONE</span>
          <strong>01554497569</strong>
        </div>

      </a>


      {/* WHATSAPP */}

      <a
        href="https://wa.me/201554497569"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-card whatsapp-card"
      >

        <div className="contact-icon">

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 8.6 8.6 0 0 1-4.1-1.05L3 20l1.1-4.6A8.4 8.4 0 0 1 3 11.2 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />
            <path d="M8.5 9.5c.3-.6.6-.6 1-.6h.4c.2 0 .4.1.5.4l.7 1.5c.1.2.1.4-.1.6l-.5.6c.7 1.2 1.6 2.1 2.8 2.8l.6-.5c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5v.4c0 .4 0 .7-.6 1-.5.3-1.1.4-1.7.2-2.7-.7-5.4-3.4-6.1-6.1-.2-.6-.1-1.2.2-1.7Z" />
          </svg>

        </div>

        <div>
          <span>WHATSAPP</span>
          <strong>+20 15 5449 7569</strong>
        </div>

      </a>


      {/* EMAIL */}

      <a
        href="mailto:minabahir353@gmail.com"
        className="contact-card"
      >

        <div className="contact-icon">

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
            />

            <path d="m3 7 9 6 9-6" />
          </svg>

        </div>

        <div>
          <span>EMAIL</span>
          <strong>minabahir353@gmail.com</strong>
        </div>

      </a>


      {/* LOCATION */}

      <div className="contact-card location-card">

        <div className="contact-icon">

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />

            <circle
              cx="12"
              cy="10"
              r="2.5"
            />
          </svg>

        </div>

        <div>
          <span>LOCATION</span>
          <strong>Cairo, Egypt</strong>
        </div>

      </div>


      {/* ================= SOCIAL MEDIA ================= */}

      <div className="contact-social-title">
        FOLLOW MY WORK
      </div>

      <div className="contact-socials">

        {/* FACEBOOK */}

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn facebook"
          aria-label="Facebook"
        >

          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14 8h3V4h-3c-3.3 0-5 1.7-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1Z" />
          </svg>

          <span>Facebook</span>

        </a>


        {/* INSTAGRAM */}

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn instagram"
          aria-label="Instagram"
        >

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="5"
            />

            <circle
              cx="12"
              cy="12"
              r="4"
            />

            <circle
              cx="17.5"
              cy="6.5"
              r="1"
              fill="currentColor"
              stroke="none"
            />
          </svg>

          <span>Instagram</span>

        </a>


        {/* BEHANCE */}

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn behance"
          aria-label="Behance"
        >

          <span className="behance-icon">Be</span>

          <span>Behance</span>

        </a>


        {/* LINKEDIN */}

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn linkedin"
          aria-label="LinkedIn"
        >

          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 8H2v14h4V8ZM4 2a2.3 2.3 0 1 0 0 4.6A2.3 2.3 0 0 0 4 2ZM22 14.1c0-4.2-2.2-6.1-5.2-6.1-2.4 0-3.5 1.3-4.1 2.2V8H9v14h3.7v-6.9c0-1.8.3-3.6 2.6-3.6 2.2 0 2.2 2 2.2 3.7V22H22v-7.9Z" />
          </svg>

          <span>LinkedIn</span>

        </a>


        {/* WHATSAPP */}

        <a
          href="https://wa.me/201554497569"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn whatsapp"
          aria-label="WhatsApp"
        >

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 8.6 8.6 0 0 1-4.1-1.05L3 20l1.1-4.6A8.4 8.4 0 0 1 3 11.2 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />

            <path d="M8.5 9.5c.3-.6.6-.6 1-.6h.4c.2 0 .4.1.5.4l.7 1.5c.1.2.1.4-.1.6l-.5.6c.7 1.2 1.6 2.1 2.8 2.8l.6-.5c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5v.4c0 .4 0 .7-.6 1-.5.3-1.1.4-1.7.2-2.7-.7-5.4-3.4-6.1-6.1-.2-.6-.1-1.2.2-1.7Z" />
          </svg>

          <span>WhatsApp</span>

        </a>

      </div>


      {/* STATUS */}

      <div className="contact-status">

        <span></span>

        Usually replies within a
        <strong>few hours</strong>

      </div>

    </div>


    {/* ================= RIGHT SIDE - FORM ================= */}

    <div className="contact-form-wrapper">

      <h3>Project Details</h3>

      <form>

        <div className="form-group">

          <label>
            FULL NAME <span>*</span>
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            required
          />

        </div>


        <div className="form-group">

          <label>
            EMAIL <span>*</span>
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            required
          />

        </div>

        <div className="form-group">

          <label>
            PHONE <span>*</span>
          </label>

          <input
            type="Phone"
            placeholder="Enter your phone number"
            required
          />

        </div>


        <div className="form-group">

          <label>
            PROJECT TYPE <span>*</span>
          </label>

          <input
            type="text"
            placeholder="e.g. Branding, Social Media, Logo..."
            required
          />

        </div>


        <div className="form-group">

          <label>
            EXPECTED BUDGET
          </label>

          <input
            type="text"
            placeholder="e.g. $100, $500..."
          />

        </div>


        <div className="form-group">

          <label>
            PROJECT DETAILS
          </label>

          <textarea
            placeholder="Tell me a little about your project..."
            rows={5}
          />

        </div>


        <button
          type="submit"
          className="contact-submit"
        >
          SEND REQUEST
        </button>

      </form>

    </div>

  </div>

</section>
      



    </main>
  );
}