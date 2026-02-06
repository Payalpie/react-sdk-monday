const MenuItem = ({ 
  label, 
  onClick, 
  isSelected = false,
  variant = "radio",
  icon: Icon = null
}) => {
  const variants = {
    radio: "flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded hover:bg-gray-100 transition cursor-pointer",
    link: "flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded hover:bg-gray-100 transition cursor-pointer text-gray-700",
    action: "w-full px-2 py-1.5 text-sm rounded hover:bg-gray-100 transition cursor-pointer text-left"
  };

  return (
    <button
      onClick={onClick}
      className={variants[variant]}
    >
      {variant === "radio" && (
        <span className={`w-4 h-4 rounded-full border-2 transition ${
          isSelected ? "border-blue-600 bg-blue-600" : "border-gray-400"
        }`} />
      )}
      {Icon && <Icon size={16} />}
      <span>{label}</span>
    </button>
  );
};

export default MenuItem;
