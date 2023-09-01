import PropTypes from "prop-types";
const Button = ({ onClick, children, className }) => {
  return (
    <button
      className={`bg-violet-600 hover:bg-violet-300 text-white mt-1 px-6 py-2 rounded-md text-[.8rem]  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};
