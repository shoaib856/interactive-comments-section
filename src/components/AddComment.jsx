import PropTypes from "prop-types";
import Button from "./Button";

const AddComment = ({
  className,
  currentUser,
  comment,
  setComment,
  AddComment,
  type,
}) => {
  return (
    <div
      className={`flex max-sm:flex-wrap max-sm:justify-between items-start gap-[.9rem] bg-white px-4 py-[1.1rem] rounded-md ${className}`}
    >
      <img
        className="mt-1.5 border max-sm:order-2 border-slate-900 rounded-full"
        width={31}
        src={currentUser.image.png}
        alt="avatar"
      />
      <textarea
        className="max-sm:order-1 w-full h-20 resize-none outline-none border border-slate-900 rounded-md py-2.5 px-4 text-[.85rem] tracking-tight"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        autoFocus
      />
      <Button className={"max-sm:order-3"} onClick={() => AddComment()}>{type.toUpperCase()}</Button>
    </div>
  );
};

AddComment.propTypes = {
  currentUser: PropTypes.object.isRequired,
  comment: PropTypes.string.isRequired,
  setComment: PropTypes.func.isRequired,
  AddComment: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default AddComment;
