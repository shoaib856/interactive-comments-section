/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import EditScore from "./EditScore";
import data from "../../data.json";
import reply from "../assets/images/icon-reply.svg";
import del from "../assets/images/icon-delete.svg";
import edit from "../assets/images/icon-edit.svg";
import IconButton from "./IconButton";
import { useState } from "react";
import Button from "./Button";
import AddComment from "./AddComment";
import DeleteDialogBox from "./DeleteDialogBox";

const Comment = ({
  comment,
  parentID = null,
  isReply = false,
  DeleteComment,
  replying,
  incrementScore,
  decrementScore,
}) => {
  const { currentUser } = data;
  const isCurrentUser = currentUser.username === comment.user.username;
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyingContent, setReplyingContent] = useState("");
  const [editingContent, setEditingContent] = useState(
    (isReply ? `@${comment.replyingTo} ` : "") + comment.content
  );
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <>
      {isDeleting && (
        <DeleteDialogBox
          deleteIt={() =>
            isReply
              ? DeleteComment(parentID, comment.id)
              : DeleteComment(comment.id)
          }
          setIsDeleting={setIsDeleting}
        />
      )}
      <div
        className={`relative flex max-sm:flex-col-reverse items-start gap-[1.2rem] bg-white px-5 py-[1.1rem] rounded-md`}
      >
        <EditScore
          score={comment.score}
          incrementScore={incrementScore}
          decrementScore={decrementScore}
          id={comment.id}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="tracking-tight flex items-center gap-3 mb-2.5">
              <img
                className="border border-slate-900 rounded-full"
                width={26}
                src={comment.user.image.png}
                alt="avatar"
              />
              <h2 className="text-[.9rem]">{comment.user.username}</h2>
              {isCurrentUser && (
                <span className="text-[.7rem] px-[.35rem]  bg-violet-600 rounded text-white">
                  you
                </span>
              )}
              <span className="text-[.85rem]">{comment.createdAt}</span>
            </div>
            <div className="flex gap-5 items-center max-sm:absolute max-sm:bottom-[1.1rem] max-sm:right-5 ">
              {isCurrentUser ? (
                <>
                  <IconButton
                    popovertarget={"delete"}
                    type={del}
                    onClick={() => setIsDeleting(true)}
                    width={10}
                    className={"!text-red-600 hover:!text-red-300 !gap-2"}
                  >
                    Delete
                  </IconButton>
                  <IconButton
                    type={edit}
                    width={12}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    Edit
                  </IconButton>
                </>
              ) : (
                <IconButton
                  type={reply}
                  width={12}
                  onClick={() => {
                    setIsReplying(!isReplying);
                    !isReplying
                      ? setReplyingContent(`@${comment.user.username}, `)
                      : setReplyingContent("");
                  }}
                >
                  Reply
                </IconButton>
              )}
            </div>
          </div>
          {isEditing ? (
            <div className="flex flex-col gap-3">
              <textarea
                className="w-full h-28  resize-none outline-none border border-slate-900 rounded-md py-2.5 px-4 text-[.85rem] tracking-tight"
                placeholder="Edit a reply..."
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              />
              <Button className={"self-end"} onClick={() => {}}>
                UPDATE
              </Button>
            </div>
          ) : (
            <p className="text-[.85rem] tracking-tight">
              {isReply && (
                <span className="cursor-pointer font-medium text-violet-400 hover:text-violet-600 mr-1 underline underline-offset-2">
                  {"@" + comment.replyingTo}
                </span>
              )}
              {comment.content.split("\n").map((line, index) => (
                <span key={index} className="">
                  {line}
                  <br />
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
      {isReplying && (
        <AddComment
          className={"!mt-1"}
          currentUser={currentUser}
          comment={replyingContent}
          setComment={setReplyingContent}
          AddComment={() => {
            replying(
              parentID || comment.id,
              replyingContent.split(", ")[1],
              comment.user.username
            );
            setIsReplying(false);
          }}
          type="reply"
        />
      )}
    </>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  isReply: PropTypes.bool,
  DeleteComment: PropTypes.func,
  parentUsername: PropTypes.string,
  replying: PropTypes.func,
  parentID: PropTypes.number,
  incrementScore: PropTypes.func,
  decrementScore: PropTypes.func,
};

export default Comment;
