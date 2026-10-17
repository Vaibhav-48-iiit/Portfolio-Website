import React from "react";
import Image from "next/image";

interface VMMonogramProps {
  className?: string;
  size?: number;
}

export const VMMonogram: React.FC<VMMonogramProps> = ({
  className = "w-9 h-9",
  size = 36,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 group ${className}`}
      style={{ width: size, height: size }}
      aria-label="Vaibhav Marathe"
    >
      <Image
        src="/avatar.jpg"
        alt="Vaibhav Marathe"
        width={size}
        height={size}
        className="w-full h-full object-cover rounded-full border border-[#64C7D8]/60 shadow-[0_0_12px_rgba(100,199,216,0.35)] transition-transform duration-300 group-hover:scale-110"
        priority
      />
    </div>
  );
};
