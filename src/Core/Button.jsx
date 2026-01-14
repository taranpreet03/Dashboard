import { useTheme } from "../context/ThemeContext";

const Button = ({ icon: Icon, text, onClick, className = "" }) => {
  const { theme } = useTheme();

  const themeClasses =
    theme === "dark"
      ? "bg-[#1B211A] border border-yellow-800 text-white hover: bg-blue-800"
      : "bg-white border border-gray-300 text-[#3A4752]";

  const iconClasses =
    theme === "dark" ? " text-white" : "text-gray-600";

  return (
    <button
      onClick={onClick}
      className={`
        nav-btn flex items-center gap-4 px-4 py-2 rounded-md
        transition
        ${themeClasses}
        ${className}
      `}
    >
      {Icon && <Icon className={iconClasses} />}
      {text}
    </button>
  );
};

export default Button;
