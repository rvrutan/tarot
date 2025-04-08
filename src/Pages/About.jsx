import React from 'react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        About Tarot
      </h1>

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-base-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
          <p className="text-lg mb-4">
            ForTune was created as a collaborative project by a team of
            developers passionate about creating meaningful digital experiences.
            The application combines traditional tarot wisdom with modern web
            technologies to provide users with insightful readings.
          </p>
        </div>

        <div className="bg-base-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Development Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="avatar">
                <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="/profile/roni.jpeg" alt="Roni Rutan" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Roni Rutan</h3>
                <a
                  href="https://github.com/rvrutan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-focus"
                >
                  @rvrutan
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="avatar">
                <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="/profile/josh.jpg" alt="Josh Kramer" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Josh Kramer</h3>
                <a
                  href="https://github.com/KramerJosh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-focus"
                >
                  @KramerJosh
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="avatar">
                <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="/profile/ryan.jpeg" alt="Ryan Clouser" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Ryan Clouser</h3>
                <a
                  href="https://github.com/rclouser24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-focus"
                >
                  @rclouser24
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="avatar">
                <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="/profile/Tim.jpg" alt="Timothy Ehli" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Timothy Ehli</h3>
                <a
                  href="https://github.com/Saosyn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-focus"
                >
                  @Saosyn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-base-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Data Sources</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Tarot Card Data</h3>
              <p className="mb-2">
                Our tarot card interpretations and meanings are sourced from:
              </p>
              <a
                href="https://www.kaggle.com/datasets/lsind18/tarot-json?resource=download"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-focus flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Kaggle - Tarot JSON Dataset
              </a>
            </div>
          </div>
        </div>

        <div className="bg-base-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="badge badge-lg p-4">React</div>
            <div className="badge badge-lg p-4">Tailwind CSS</div>
            <div className="badge badge-lg p-4">DaisyUI</div>
            <div className="badge badge-lg p-4">Tone.js</div>
            <div className="badge badge-lg p-4">React Router</div>
            <div className="badge badge-lg p-4">Vite</div>
          </div>
        </div>
      </div>
    </div>
  );
}
