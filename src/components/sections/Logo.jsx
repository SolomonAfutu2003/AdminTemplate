import React from "react";

const Logo = ({ image }) => {
    return (
        <div className="w-[90px] h-[90px] rounded-full overflow-hidden">
            {image && (
                <img
                    src={image}
                    alt="Logo"
                    className="w-full h-full object-cover"
                />
            )}
        </div>
    );
};

export default Logo;
