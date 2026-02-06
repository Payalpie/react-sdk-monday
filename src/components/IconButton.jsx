const IconButton = ({ 
  icon: Icon, 
  onClick, 
  className = "", 
  title = "", 
  variant = "ghost",
  size = 20
}) => {
  const variants = {
    ghost: "p-2 rounded hover:bg-gray-100 transition cursor-pointer text-gray-500",
    "ghost-dark": "p-1 rounded-md hover:bg-gray-800 transition cursor-pointer text-gray-100",
    "ghost-secondary": "p-1 rounded hover:bg-gray-100 transition cursor-pointer text-gray-500"
  };

  return (
    <button 
      onClick={onClick} 
      title={title} 
      className={`${variants[variant]} ${className}`}
    >
      <Icon size={size} />
    </button>
  );
};

export default IconButton;
