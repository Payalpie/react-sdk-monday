import { ChevronDown } from "lucide-react";

const DropdownButton = ({ 
  label, 
  icon: Icon, 
  onClick, 
  isActive = false, 
  showChevron = true, 
  iconSize = 16,
  variant = "default"
}) => {
  const variants = {
    default: isActive 
      ? "bg-gray-100 text-gray-900 border border-gray-400 shadow-sm" 
      : "border border-gray-300 text-gray-700 hover:bg-gray-100",
    filter: isActive
      ? "border-blue-500 bg-blue-50"
      : "border-gray-300 hover:bg-gray-50"
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-md transition cursor-pointer ${variants[variant]}`}
    >
      {Icon && <Icon size={iconSize} />}
      <span className="hidden sm:inline">{label}</span>
      {showChevron && <ChevronDown size={14} />}
    </button>
  );
};

export default DropdownButton;
