"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
    cover: "/projects/branding/cover.png",
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
    cover: "/projects/social/cover.jpg",
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
    cover: "/projects/print/cover.jpg",
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
    cover: "/projects/marketing/cover.jpg",
    images: [
      "/projects/marketing/1.jpg",
      "/projects/marketing/2.jpg",
      "/projects/marketing/3.jpg",
      "/projects/marketing/4.jpg",
    ],
  },
];

export default function ProjectPage() {
  const params = useParams();

  const projectId = Number(params.id);

  const project = projects.find(
    (item) => item.id === projectId
  );

  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /*
   * =========================================================
   * AUTO SLIDER
   * =========================================================
   *
   * Every 5 seconds:
   * Image 1 → Image 2 → Image 3 → Image 4 → Image 1
   *
   * Using setTimeout instead of setInterval prevents
   * overlapping timers and stale state problems.
   */

  useEffect(() => {
    if (!project || project.images.length <= 1 || isPaused) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsTransitioning(true);

      window.setTimeout(() => {
        setCurrentImage((prev) => {
          if (prev >= project.images.length - 1) {
            return 0;
          }

          return prev + 1;
        });

        setIsTransitioning(false);
      }, 250);
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [currentImage, isPaused, project]);

  /*
   * =========================================================
   * CHANGE IMAGE
   * =========================================================
   */

  const changeImage = (index: number) => {
    if (!project || index === currentImage) {
      return;
    }

    setIsTransitioning(true);

    window.setTimeout(() => {
      setCurrentImage(index);
      setIsTransitioning(false);
    }, 250);
  };

  /*
   * =========================================================
   * NEXT
   * =========================================================
   */

  const nextImage = () => {
    if (!project) return;

    const next =
      currentImage >= project.images.length - 1
        ? 0
        : currentImage + 1;

    changeImage(next);

    pauseAutoplay();
  };

  /*
   * =========================================================
   * PREVIOUS
   * =========================================================
   */

  const previousImage = () => {
    if (!project) return;

    const previous =
      currentImage === 0
        ? project.images.length - 1
        : currentImage - 1;

    changeImage(previous);

    pauseAutoplay();
  };

  /*
   * =========================================================
   * PAUSE AUTOPLAY AFTER USER INTERACTION
   * =========================================================
   */

  const pauseAutoplay = () => {
    setIsPaused(true);

    window.setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  /*
   * =========================================================
   * NOT FOUND
   * =========================================================
   */

  if (!project) {
    return (
      <main className="project-detail">
        <div className="project-detail-container">
          <h1>Project Not Found</h1>

          <Link
            href="/#portfolio"
            className="project-back"
          >
            ← Back to portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="project-detail">

      <div className="project-detail-container">

        {/* =================================================
            BACK
        ================================================= */}

        <Link
          href="/#portfolio"
          className="project-back"
        >
          <span>←</span>
          Back to portfolio
        </Link>

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="project-detail-header">

          <span className="project-detail-category">
            {project.category}
          </span>

          <h1>
            {project.title}
          </h1>

          <p className="project-detail-description">
            {project.description}
          </p>

        </header>

        {/* =================================================
            GALLERY
        ================================================= */}

        <div
          className="project-gallery-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          <div
            className={`project-gallery ${
              isTransitioning
                ? "gallery-transitioning"
                : ""
            }`}
          >

            {/* IMAGE */}

            <img
              key={project.images[currentImage]}
              src={project.images[currentImage]}
              alt={`${project.title} ${
                currentImage + 1
              }`}
              className="project-gallery-image"
            />

            {/* DARK GRADIENT */}

            <div className="gallery-overlay" />

            {/* TOP INFO */}

            <div className="gallery-top-info">

              <span>
                {project.category}
              </span>

              <div className="gallery-counter">
                <strong>
                  {String(currentImage + 1).padStart(
                    2,
                    "0"
                  )}
                </strong>

                <span>
                  /
                </span>

                <span>
                  {String(
                    project.images.length
                  ).padStart(2, "0")}
                </span>
              </div>

            </div>

            {/* PREVIOUS */}

            <button
              type="button"
              className="gallery-btn gallery-prev"
              onClick={previousImage}
              aria-label="Previous image"
            >
              <span>←</span>
            </button>

            {/* NEXT */}

            <button
              type="button"
              className="gallery-btn gallery-next"
              onClick={nextImage}
              aria-label="Next image"
            >
              <span>→</span>
            </button>

            {/* BOTTOM */}

            <div className="gallery-bottom">

              <div className="gallery-progress">

                {project.images.map(
                  (image, index) => (
                    <button
                      key={image}
                      type="button"
                      className={
                        index === currentImage
                          ? "gallery-progress-item active"
                          : "gallery-progress-item"
                      }
                      onClick={() => {
                        changeImage(index);
                        pauseAutoplay();
                      }}
                      aria-label={`Show image ${
                        index + 1
                      }`}
                    >
                      <span />
                    </button>
                  )
                )}

              </div>

              <span className="gallery-hint">
                {isPaused
                  ? "PAUSED"
                  : "AUTO PLAY"}
              </span>

            </div>

          </div>

        </div>

        {/* =================================================
            THUMBNAIL STRIP
        ================================================= */}

        <div className="gallery-thumbnails">

          {project.images.map(
            (image, index) => (
              <button
                key={image}
                type="button"
                className={
                  index === currentImage
                    ? "gallery-thumbnail active"
                    : "gallery-thumbnail"
                }
                onClick={() => {
                  changeImage(index);
                  pauseAutoplay();
                }}
                aria-label={`Open image ${
                  index + 1
                }`}
              >

                <img
                  src={image}
                  alt={`${project.title} thumbnail ${
                    index + 1
                  }`}
                />

                <span>
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

              </button>
            )
          )}

        </div>

      </div>

    </main>
  );
}