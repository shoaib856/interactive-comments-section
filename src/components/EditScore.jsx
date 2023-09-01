import plus from "../assets/images/icon-plus.svg";
import minus from "../assets/images/icon-minus.svg";
import PropTypes from "prop-types";

const EditScore = ({ score, incrementScore, decrementScore, id }) => {
  return (
    <div className="bg-gray-100 rounded-md flex-col max-sm:flex-row flex gap-2.5 items-center sm:w-10 p-1.5">
      <Icon alt={"plus"} src={plus} onClick={() => incrementScore(id)} />

      <p className="text-violet-600 font-semibold scale-90">{score}</p>

      <Icon
        alt={"minus"}
        src={minus}
        onClick={() => (score > 0 ? decrementScore(id) : null)}
      />
    </div>
  );
};

export default EditScore;

EditScore.propTypes = {
  score: PropTypes.number.isRequired,
  incrementScore: PropTypes.func.isRequired,
  decrementScore: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

const Icon = ({ src, alt, onClick }) => {
  return (
    <button onClick={onClick}>
      <img src={src} alt={alt} className={"p-1"} />
    </button>
  );
};

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
