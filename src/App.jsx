import { useEffect, useState } from "react";
import Comment from "./components/Comment";
import AddComment from "./components/AddComment";
import juliusomo from "./assets/images/avatars/image-juliusomo.png";
import amyrobson from "./assets/images/avatars/image-amyrobson.svg";
import maxblagun from "./assets/images/avatars/image-maxblagun.png";
import ramsesmiron from "./assets/images/avatars/image-ramsesmiron.png";

const data = {
  currentUser: {
    image: {
      png: juliusomo,
    },
    username: "juliusomo",
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: amyrobson,
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: maxblagun,
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: ramsesmiron,
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: juliusomo,
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ],
};

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
              currentUser={currentUser}
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
                      currentUser={currentUser}
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
