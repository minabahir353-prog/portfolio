"use client";

import { useState } from "react";
import type { CartItem } from "../app/page";
type NavbarProps = {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  onRemove: (id: number) => void;
  onRemoveAll: (id: number) => void;
  onIncrease: (id: number) => void;
};

export default function Navbar({
  cartItems,
  totalItems,
  totalPrice,
  onRemove,
  onRemoveAll,
  onIncrease,
}: NavbarProps) {

  const [cartOpen, setCartOpen] =
    useState(false);

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

        <a href="#services">
          Services
        </a>

        <a href="#portfolio">
          Portfolio
        </a>

        <a href="#contact">
          Contact
        </a>

      </div>


      <div className="cart-wrapper">

        <button
          type="button"
          className="cart-button"
          onClick={() =>
            setCartOpen(!cartOpen)
          }
        >

          🛒

          {totalItems > 0 && (

            <span className="cart-count">
              {totalItems}
            </span>

          )}

        </button>


        <div
          className={`cart-dropdown ${
            cartOpen
              ? "cart-open"
              : ""
          }`}
        >

          <div className="cart-header">

            <div>

              <h3>
                Your Cart
              </h3>

              <span>
                {totalItems}{" "}
                {totalItems === 1
                  ? "item"
                  : "items"}
              </span>

            </div>


            <button
              type="button"
              className="close-cart"
              onClick={() =>
                setCartOpen(false)
              }
            >
              ×
            </button>

          </div>


          {cartItems.length === 0 && (

            <div className="empty-cart">

              <div className="empty-cart-icon">
                🛒
              </div>

              <h4>
                Your cart is empty
              </h4>

              <p>
                Choose a service and
                start your project.
              </p>

            </div>

          )}


          {cartItems.length > 0 && (

            <div className="cart-items">

              {cartItems.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  <div className="cart-item-icon">
                    ✦
                  </div>


                  <div className="cart-item-info">

                    <h4>
                      {item.title}
                    </h4>

                    <div className="cart-item-price">

                      <span>
                        {item.price.toLocaleString()} LE
                      </span>

                      <strong>
                        × {item.quantity}
                      </strong>

                    </div>

                  </div>


                  <div className="quantity-controls">

                    <button
                      type="button"
                      onClick={() =>
                        onRemove(item.id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        onIncrease(item.id)
                      }
                    >
                      +
                    </button>

                  </div>


                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      onRemoveAll(item.id)
                    }
                  >
                    ×
                  </button>

                </div>

              ))}

            </div>

          )}


          {cartItems.length > 0 && (

            <div className="cart-footer">

              <div className="cart-total">

                <span>
                  Total
                </span>

                <strong>
                  {totalPrice.toLocaleString()} LE
                </strong>

              </div>


              <button
                type="button"
                className="checkout-button"
              >

                Continue to Checkout

                <span>
                  →
                </span>

              </button>

            </div>

          )}

        </div>

      </div>

    </nav>

  );

}