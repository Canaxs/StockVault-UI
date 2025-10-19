import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "text-blue-500",
  className = "",
}) => {
  const sizes: Record<string, string> = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizes[size]} border-4 border-t-4 border-gray-200 border-t-current rounded-full animate-spin ${color}`}
      ></div>
    </div>
  );
};
