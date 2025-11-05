import React from "react";

const SemiCircleLoadBar = ({ progress = 50, size = 150, stroke = 10 }) => {
  const radius = (size - stroke) / 2;
  const circumference = Math.PI * radius; // half of full circle (πr)
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size / 2 + stroke}
        viewBox={`0 0 ${size} ${size / 2 + stroke}`}
      >
        {/* Background arc */}
        <path
          d={`M ${stroke / 2},${size / 2} A ${radius},${radius} 0 0 1 ${
            size - stroke / 2
          },${size / 2}`}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />

        {/* Progress arc */}
        <path
          d={`M ${stroke / 2},${size / 2} A ${radius},${radius} 0 0 1 ${
            size - stroke / 2
          },${size / 2}`}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
      </svg>

      <p className="text-3xl font-medium -mt-10">{progress}%</p>
    </div>
  );
};

export default SemiCircleLoadBar;
