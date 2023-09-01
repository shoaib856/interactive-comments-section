import { useEffect, useState } from "react";
import data from "../data.json";
import Comment from "./components/Comment";
import AddComment from "./components/AddComment";

function App() {
  const { comments, currentUser } = data;
  const [commentsState, setCommentsState] = useState(comments);
  const [comment, setComment] = useState("");

  const [commentNum, setCommentNum] = useState(0);

  const commenting = () => {
    setCommentsState([
      ...commentsState,
      {
        id: commentNum + 1,
        user: currentUser,
        content: comment,
        createdAt: "now",
        score: 0,
        replyingTo: null,
        replies: [],
      },
    ]);
    setComment("");
  };
  const replying = (parentID, content, replyingTo) => {
    setCommentsState(
      commentsState.map((comment) => {
        if (comment.id === parentID) {
          comment.replies.push({
            id: commentNum + 1,
            user: currentUser,
            content: content,
            createdAt: "now",
            score: 0,
            replyingTo,
          });
        }
        return comment;
      })
    );
  };
  const DeleteComment = (id) => {
    setCommentsState(commentsState.filter((comment) => comment.id !== id));
  };
  const DeleteReply = (parentID, id) => {
    setCommentsState(
      commentsState.map((comment) => {
        if (comment.id === parentID) {
          comment.replies = comment.replies.filter((reply) => reply.id !== id);
        }
        return comment;
      })
    );
  };

  useEffect(() => {
    let comments = commentsState.length;
    let replies = 0;
    commentsState.forEach((comment) => {
      replies += comment.replies.length;
    });
    setCommentNum(comments + replies);
  }, [commentsState]);

  const increaseScore = (id) => {
    setCommentsState(
      commentsState.map((comment) => {
        if (comment.id === id) {
          comment.score++;
        } else if (comment.replies.length > 0) {
          comment.replies.map((reply) => {
            if (reply.id === id) {
              reply.score++;
            }
            return reply;
          });
        }
        return comment;
      })
    );
  };
  const decreaseScore = (id) => {
    setCommentsState(
      commentsState.map((comment) => {
        if (comment.id === id) {
          comment.score--;
        } else if (comment.replies.length > 0) {
          comment.replies.map((reply) => {
            if (reply.id === id) {
              reply.score--;
            }
            return reply;
          });
        }
        return comment;
      })
    );
  };

  return (
    <div className="max-w-[36.5rem] mx-auto max-sm:px-3 flex flex-col gap-[1.1rem]">
      {commentsState.map((comment) => (
        <div key={comment.id}>
          <div>
            <Comment
              parentUsername={comment.user.username}
              comment={comment}
              DeleteComment={DeleteComment}
              replying={replying}
              decrementScore={decreaseScore}
              incrementScore={increaseScore}
            />
            {comment.replies.length > 0 && (
              <div className="ml-[2.25rem] pl-[2.25rem] max-sm:ml-2 max-sm:pl-2 border-l-4 border-gray-200 flex flex-col gap-[1.1rem] mt-[1.1rem]">
                {comment.replies.map((reply) => {
                  return (
                    <Comment
                      DeleteComment={DeleteReply}
                      comment={reply}
                      parentID={comment.id}
                      key={reply.id}
                      parentUsername={comment.user.username}
                      isReply
                      replying={replying}
                      decrementScore={decreaseScore}
                      incrementScore={increaseScore}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ))}
      <AddComment
        currentUser={currentUser}
        comment={comment}
        setComment={setComment}
        AddComment={commenting}
        type="send"
      />
    </div>
  );
}

export default App;
