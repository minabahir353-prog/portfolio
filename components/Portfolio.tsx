"use client";

import Link from "next/link";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  cover: string;
  images: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "Social Media Campaign",
    category: "Social Media",
    description:
      "Creative social media designs created to build a strong visual presence.",
    cover: "/projects/Soical1/0.jpg",
    images: [
      "/projects/Soical1/1.jpg",
      "/projects/Soical1/2.jpg",
      "/projects/Soical1/3.jpg",
      "/projects/Soical1/4.jpg",
      "/projects/Soical1/5.jpg",
      "/projects/Soical1/6.jpg",
      "/projects/Soical1/7.jpg",
    ],
  },


  {
    id: 2,
    title: "Brand Identity",
    category: "Branding",
    description:
      "Complete visual identity including logo, colors, typography and brand applications.",
    cover: "/projects/branding/0.jpg",
    images: [
      "/projects/branding/1.jpg",
      "/projects/branding/2.png",
      "/projects/branding/3.png",
      "/projects/branding/4.jpg",
      "/projects/branding/5.jpg",
      "/projects/branding/6.jpg",
      "/projects/branding/7.jpg",
      "/projects/branding/8.jpg",
      "/projects/branding/9.jpg",
      "/projects/branding/10.jpg",
      "/projects/branding/11.jpg",
      "/projects/branding/12.png",
      "/projects/branding/13.png",
    ],
  },

  {
    id: 3,
    title: "Social Media Campaign",
    category: "Social Media",
    description:
      "Creative social media designs created to build a strong visual presence.",
    cover: "/projects/Soical2/COVER.jpg",
    images: [
      "/projects/Soical2/1.jpg",
      "/projects/Soical2/2.jpg",
      "/projects/Soical2/3.jpg",
      "/projects/Soical2/4.jpg",
      "/projects/Soical2/5.jpg",
      
    ],
  },


];

export default function Portfolio() {
  return (
    <section className="portfolio-section" id="portfolio">
      <div className="portfolio-container">

        {/* HEADER */}
        <div className="portfolio-header">
          <div>
            <div className="section-label">MY WORK</div>

            <h2>
              Selected <span>Projects.</span>
            </h2>
          </div>

          <p>
            A collection of branding, social media, print and visual
            design projects.
          </p>
        </div>

        {/* PROJECTS */}
        <div className="portfolio-grid">

          {projects.map((project) => (
            <Link
              href={`/portfolio/${project.id}`}
              className="project-card"
              key={project.id}
            >

              {/* IMAGE */}
              <div className="project-image-wrapper">

                <img
                  src={project.cover}
                  alt={project.title}
                  className="project-image"
                />

                <div className="project-image-overlay">
                  <span>VIEW PROJECT</span>
                </div>

              </div>

              {/* INFO */}
              <div className="project-info">

                <div className="project-meta">
                  <span className="project-category">
                    {project.category}
                  </span>

                  <span className="project-number">
                    {String(project.id).padStart(2, "0")}
                  </span>
                </div>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="project-link">
                  <span>Explore project</span>
                  <span className="project-arrow">↗</span>
                </div>

              </div>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}