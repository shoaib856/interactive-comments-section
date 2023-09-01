import PropTypes from "prop-types";

const DeleteDialogBox = ({ deleteIt, setIsDeleting }) => {
  return (
    <div className="fixed inset-0 h-full z-10 flex justify-center items-center bg-black/50 backdrop-blur-[1px] border-red-800 ">
      <div className="p-6 max-w-xs bg-white rounded-md m-2">
        <h2 className="mb-3 font-medium text-lg">Delete Comment</h2>
        <p className="text-gray-400 text-sm">
          Are you sure you want to delete this comment? This will remove the
          comment and can&#39;t be undone.
        </p>
        <div className="flex gap-2 justify-between items-center mt-4 text-white">
          <DialogButton onClick={() => setIsDeleting(false)}>
            cancel
          </DialogButton>

          <DialogButton
            onClick={deleteIt}
            className="!bg-red-600 hover:!bg-red-400"
          >
            yes, delete
          </DialogButton>
        </div>
      </div>
    </div>
  );
};

DeleteDialogBox.propTypes = {
  deleteIt: PropTypes.func,
  setIsDeleting: PropTypes.func,
};

export default DeleteDialogBox;

const DialogButton = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`text-sm bg-gray-500 hover:bg-gray-400 uppercase py-2 px-1 flex-1 rounded-md ${className}`}
    >
      {children}
    </button>
  );
};

DialogButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};
