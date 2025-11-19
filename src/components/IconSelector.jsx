import React from "react";
import * as Icons from "lucide-react";

const availableIcons = [
    "Home",
    "User",
    "Settings",
    "Phone",
    "Star",
    "Check",
    "Bell",
    "Map",
    "Globe",
    "Briefcase",
    "Cloud",
    "Smartphone",
    "AppWindow",
    "PenTool",
    "MonitorCog",
    "MessagesSquare",
    "ServerCrash"
];

const IconSelector = ({ value, onChange }) => {
    return (
        <div className="grid grid-cols-4 gap-4 p-4 border rounded-lg bg-white">
            {availableIcons.map((iconName) => {
                const Icon = Icons[iconName];

                return (
                    <button
                        key={iconName}
                        className={`p-3 border rounded-lg flex justify-center items-center 
              ${value === iconName ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
                        onClick={() => onChange(iconName)}
                    >
                        <Icon size={28} />
                    </button>
                );
            })}
        </div>
    );
};

export default IconSelector;
