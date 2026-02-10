import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const DropdownButton = ({
  label,
  icon: Icon,
  onClick,
  onSelect,
  isActive = false,
  showChevron = true,
  iconSize = 16,
  variant = "default",
  options = [],
  value = null,
  placeholder = "Select option",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const variants = {
    default: isActive
      ? "bg-gray-100 text-gray-900 border border-gray-400 shadow-sm"
      : "border border-gray-300 text-gray-700 hover:bg-gray-100",
    filter: isActive
      ? "border-blue-500 bg-blue-50"
      : "border-gray-300 hover:bg-gray-50",
  };

  if (options.length > 0) {
    const selectedOption = options.find((opt) => opt.id === value);

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`inline-flex h-10 items-center gap-2 px-3 text-sm border rounded-md transition cursor-pointer w-full justify-between ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            size={14}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="overflow-y-auto max-h-48">
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onSelect(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-sm text-left transition cursor-pointer ${
                    value === option.id
                      ? "bg-blue-100 text-blue-900"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex h-10 items-center gap-2 px-3 text-sm border rounded-md transition cursor-pointer ${variants[variant]}`}
    >
      {Icon && <Icon size={iconSize} />}
      <span className="hidden sm:inline">{label}</span>
      {showChevron && <ChevronDown size={14} />}
    </button>
  );
};

export default DropdownButton;
