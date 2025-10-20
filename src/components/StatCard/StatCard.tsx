import { ArrowUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  className?: string;
  gradient: string;
  link: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  className,
  gradient,
  link,
}) => {
  return (
    <div
      className={`flex flex-col relative justify-between bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all duration-300 ${className} `}
    >
      <div>
        <p className="text-gray-500 text-base lg:text-lg">{title}</p>
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-semibold bg-gradient-to-r ${gradient} text-transparent bg-clip-text mt-5`}
        >
          {value}
        </h2>
        {description && (
          <p className="text-gray-400 text-xs lg:text-sm mt-3">{description}</p>
        )}
      </div>
      <NavLink to={link}>
        <div className="absolute right-3 top-3 lg:right-2 lg:top-2 w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all hover:scale-105">
          <ArrowUpRight size={18} />
        </div>
      </NavLink>
    </div>
  );
};
