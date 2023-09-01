/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";

const Btn = ({ children, type, width, className, onClick, popovertarget }) => {
  return (
    <button
      onClick={onClick}
      popovertarget={popovertarget}
      className={`transition flex gap-1.5 text-violet-600 hover:text-violet-300 ${className}`}
    >
      <img className="mt-1" width={width} src={type} alt="edit" />
      <span className="mb-2 text-[.8125rem]">{children}</span>
    </button>
  );
};

Btn.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  popovertarget: PropTypes.string,
};

export default Btn;
