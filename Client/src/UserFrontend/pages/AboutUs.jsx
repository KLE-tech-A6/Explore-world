import React from "react";
import NavBar from "../components/NavBar";
import about1 from "../images/about1.jpg";
import about2 from "../images/about2.jpg";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div>
      <NavBar />
      <div className="w-full h-[350px] mx-auto px-40 bg-[#0b2428] flex flex-col text-center justify-center items-center ">
        <h1 className="text-[50px] font-bold text-[#fdf0d5]">About Us</h1>
        <p className="text-slate-300 mt-2">
          We are your ultimate travel companion, dedicated to making every
          journey unforgettable. With expert tips, curated recommendations, and
          must-visit destinations, we inspire you to explore the world with ease
          and confidence. Let us help you discover extraordinary adventures like
          never before!
        </p>
      </div>
      <div className="flex justify-between items-center gap-10 my-20 px-32">
        <div className="flex-1">
          <img
            className="w-[500px] rounded-br-[80px] shadow-lg shadow-slate-600 "
            src={about1}
            alt="Image01"
          />
        </div>
        <div className="flex-1 text-justify">
          <p>
            Travel unveils the beauty of the world, offering endless inspiration
            and adventure. Every journey opens the door to new cultures,
            breathtaking sights, and unforgettable memories. From serene
            landscapes to vibrant cities, the world invites you to explore its
            wonders. Embrace the thrill of discovery, making each destination a
            part of your story. Let every step inspire, as travel becomes a
            celebration of life’s endless possibilities.
          </p>
        </div>
      </div>
      <div className="flex justify-between gap-10 items-center my-20 px-32">
        <div className="flex-1 text-justify">
          <p>
            Explore the wonders of the world, where every destination tells a
            unique story. Discover vibrant cultures, breathtaking landscapes,
            and unforgettable adventures. Let curiosity guide your path,
            creating memories that last a lifetime. Embrace the spirit of travel
            and the joy of discovery at every turn. The journey is as rewarding
            as the destination itself.
          </p>
        </div>
        <div className="flex-1">
          <img
            className="w-[600px] h-[300px] shadow-lg shadow-slate-600 rounded-tl-[80px] "
            src={about2}
            alt="Image01"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
