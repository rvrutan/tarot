import React from "react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">About Tarot</h1>
      
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-base-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
          <p className="text-lg mb-4">
            This Tarot reading application was created as a collaborative project by a team of developers passionate about creating meaningful digital experiences. The application combines traditional tarot wisdom with modern web technologies to provide users with insightful readings.
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
                  <img src="/profile/ryan.jpg" alt="Ryan Clouser" />
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
                  <img src="/profile/saosyn.jpg" alt="Saosyn" />
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
