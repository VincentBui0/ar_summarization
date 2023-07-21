/* Hero section of the website.
 A big title telling people what the app does 
 flex justify-between: content shows on left and right side
 items-center: vertically centered
 w-full = 100% width; flex-col: column not row*/
 import React from 'react'
 import {logo} from '../assets';

 const Hero = () => {
   return ( 
     <header className="w-full flex 
     justify-center items-center flex-col">
      <nav className="flex justify-between
      items-center w-full mb-10 pt-3"> 
        <img src={logo} alt="sumz_logo"
        className="w-28 object-contain" />
      
      <button
        type="button"
        onClick={() => window.open('https://github.com/VincentBui0')}
        className="black_btn">
        GitHub
      </button>
      </nav>

      <h1 className="head_text">
        Use OpenAI GPT-4 to <br className="max-md:hidden"/>
        <span className="orange_gradient">Summarize Articles</span>
      </h1>
      <h2 className="desc">
        Turn your lengthy articles into simple and clear
        summaries with Sumz, an open source article summarizer
      </h2>
     </header>
   )
 }
 
 export default Hero