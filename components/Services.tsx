"use client";

import ServiceCard from "./ServiceCard";

type Service = {
  id: number;
  title: string;
  description: string;
  price: number;
};

type ServicesProps = {
  onBuy: (service: Service) => void;
};


const services: Service[] = [

  {
    id: 1,

    title: "Branding",

    description:
      "Complete visual identity including logo, colors, typography and brand guidelines.",

    price: 5000,
  },


  {
    id: 2,

    title: "Social Media",

    description:
      "Creative and engaging social media designs that make your brand stand out.",

    price: 2500,
  },


  {
    id: 3,

    title: "Print Design",

    description:
      "Professional designs for business cards, flyers, brochures and other materials.",

    price: 1500,
  },

];


export default function Services({
  onBuy,
}: ServicesProps) {

  return (

    <section
      className="services"
      id="services"
    >

      <div className="section-label">
        SERVICES
      </div>


      <h2>
        What I Can Do
      </h2>


      <p className="section-description">

        Choose the service you need and
        let's create something amazing
        together.

      </p>


      <div className="services-grid">

        {services.map((service) => (

          <ServiceCard
            key={service.id}
            service={service}
            onBuy={onBuy}
          />

        ))}

      </div>

    </section>

  );
}