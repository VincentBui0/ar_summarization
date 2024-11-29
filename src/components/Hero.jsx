// Import React library
import React from 'react';
// Import assets like the logo
import { logo } from '../assets';

// Functional component for the "Hero" section of the website
const Hero = () => {
  return (
    // Header section of the page
    <header className="w-full flex justify-center items-center flex-col">
      {/* Navigation bar */}
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        {/* Logo on the left side */}
        <img
          src={logo} // Source of the logo image
          alt="sumz_logo" // Alternative text for accessibility
          className="w-28 object-contain" // Set width and maintain aspect ratio
        />

        {/* GitHub button on the right side */}
        <button
          type="button" // Button type
          onClick={() => window.open('https://github.com/VincentBui0')} // Opens GitHub profile in a new tab
          className="black_btn" // Styling class for the button
        >
          GitHub
        </button>
      </nav>

      {/* Main title */}
      <h1 className="head_text">
        Use OpenAI GPT-4 to <br className="max-md:hidden" /> {/* Line break hidden on medium and smaller screens */}
        <span className="orange_gradient">Summarize Articles</span> {/* Highlighted text with gradient */}
      </h1>

      {/* Subtitle/description */}
      <h2 className="desc">
        Turn your lengthy articles into simple and clear summaries with Sumz, an open-source article summarizer
      </h2>
    </header>
  );
};

// Export the component for use in other parts of the application
export default Hero;
