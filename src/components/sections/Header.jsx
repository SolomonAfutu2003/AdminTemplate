// components/Header.jsx
import React from "react";

const Header = ({ heading, subheading }) => {
    return (
      <header className="space-y-5">
        <h1 className="text-6xl font-bold px-50 text-center">{heading}</h1>
        <div
          className="text-gray-600 px-50 text-center"
          dangerouslySetInnerHTML={{ __html: subheading }}
        />
      </header>
    );
  };
  

export default Header;