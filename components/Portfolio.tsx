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
    title: "Brand Identity",
    category: "Branding",
    description:
      "Complete visual identity including logo, colors, typography and brand applications.",
    cover: "/projects/branding/cover.jpg",
    images: [
      "/projects/branding/1.jpg",
      "/projects/branding/2.jpg",
      "/projects/branding/3.jpg",
      "/projects/branding/4.jpg",
    ],
  },

  {
    id: 2,
    title: "Social Media Campaign",
    category: "Social Media",
    description:
      "Creative social media designs created to build a strong visual presence.",
    cover: "/projects/branding/cover.jpg",
    images: [
      "/projects/social/1.jpg",
      "/projects/social/2.jpg",
      "/projects/social/3.jpg",
      "/projects/social/4.jpg",
    ],
  },

  {
    id: 3,
    title: "Print Design",
    category: "Print",
    description:
      "Professional print materials designed for marketing campaigns and businesses.",
    cover: "/projects/branding/cover.jpg",
    images: [
      "/projects/print/1.jpg",
      "/projects/print/2.jpg",
      "/projects/print/3.jpg",
      "/projects/print/4.jpg",
    ],
  },

  {
    id: 4,
    title: "Marketing Campaign",
    category: "Marketing",
    description:
      "A complete visual campaign designed to communicate the brand message creatively.",
    cover: "/projects/branding/cover.jpg",
    images: [
      "/projects/marketing/1.jpg",
      "/projects/marketing/2.jpg",
      "/projects/marketing/3.jpg",
      "/projects/marketing/4.jpg",
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