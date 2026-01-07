const Button = ({ icon: Icon, text, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`nav-btn flex items-center gap-2 ${className}`}
    >
      {Icon && <Icon className="text-gray-600" />}
      {text}
    </button>
  );
};

export default Button;
