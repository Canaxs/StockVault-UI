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
        <p className="text-gray-500 text-lg">{title}</p>
        <h2
          className={`text-5xl font-semibold bg-gradient-to-r ${gradient} text-transparent bg-clip-text mt-5`}
        >
          {value}
        </h2>
        {description && (
          <p className="text-gray-400 text-sm mt-3">{description}</p>
        )}
      </div>
      <NavLink to={link}>
        <div className="absolute right-2 top-2 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all hover:scale-105">
          <ArrowUpRight size={18} />
        </div>
      </NavLink>
    </div>
  );
};
