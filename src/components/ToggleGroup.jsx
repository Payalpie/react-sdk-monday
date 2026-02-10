const ToggleGroup = ({ 
  options, 
  value, 
  onChange,
  variant = "default"
}) => {
  const variants = {
    default: {
      button: (isActive) => `
        h-10 w-10 flex items-center justify-center transition cursor-pointer
        ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"}
      `,
      container: "flex items-center rounded-md border border-gray-300 overflow-hidden h-10"
    },
    compact: {
      button: (isActive) => `
        h-10 w-10 flex items-center justify-center transition cursor-pointer
        ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"}
      `,
      container: "flex items-center gap-1 h-10"
    }
  };

  const config = variants[variant];

  return (
    <div className={config.container}>
      {options.map(({ id, icon: Icon, label, title }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={config.button(value === id)}
          title={title || label}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
};

export default ToggleGroup;
