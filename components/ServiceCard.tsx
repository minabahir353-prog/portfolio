"use client";

import {
  useEffect,
  useState,
} from "react";

import type {
  Service,
} from "../app/page";

type ServiceCardProps = {
  service: Service;
  onBuy: (service: Service) => void;
};

export default function ServiceCard({
  service,
  onBuy,
}: ServiceCardProps) {

  const [added, setAdded] =
    useState(false);


  useEffect(() => {

    if (added) {

      const timer =
        setTimeout(() => {
          setAdded(false);
        }, 800);

      return () =>
        clearTimeout(timer);

    }

  }, [added]);


  const handleBuy = () => {

    onBuy(service);

    setAdded(true);

  };


  return (

    <div className="service-card">

      <div>

        <div className="service-icon">
          ✦
        </div>


        <h3>
          {service.title}
        </h3>


        <p>
          {service.description}
        </p>

      </div>


      <div className="service-footer">

        <div className="price">
          {service.price.toLocaleString()} LE
        </div>


        <button
          type="button"
          onClick={handleBuy}
          className={
            added
              ? "purchased"
              : ""
          }
        >

          {added
            ? "Added ✓"
            : "Buy Now"}

        </button>

      </div>

    </div>

  );

} 