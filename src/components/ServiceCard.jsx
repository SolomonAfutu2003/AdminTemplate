import React from "react";
import * as Icons from "lucide-react";

const ServiceCard = ({ title, icon, content }) => {
  const Icon = Icons[icon] || Icons.HelpCircle;

  return (
    <div className="relative">
      <div className="relative group">
        {/* Smooth fading background */}
        <div className="absolute rounded-xl top-0 left-0 h-[80%] w-[80%] opacity-50 bg-gradient-to-br from-blue-900 to-transparent 
                        transition-all duration-700 ease-in-out group-hover:opacity-0"></div>

        {/* Main Card */}
        <div className="bg-white rounded-xl pl-9 py-4 flex flex-col gap-3 w-[400px] min-h-[300px] relative top-1 left-1 
                        hover:bg-blue-900 transition-all duration-700 ease-in-out group-hover:p-6">

          {/* Icon */}
          <div className="text-blue-900 group-hover:text-white">
            <Icon size={50} />
          </div>

          {/* Title */}
          <div className="title font-bold text-lg text-blue-900 group-hover:text-white">
            {title}
          </div>

          {/* Description */}
          <div className="content text-black opacity-50 group-hover:text-white group-hover:opacity-100 transition-all">
            <p className="leading-8">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
