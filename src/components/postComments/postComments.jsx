"use client";
import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import findOneUser from "@/database/find/allUsers/findOneUser";
import getAllComments from "@/database/find/comments";
import commentsInsert from "@/database/insert/commentsInsert";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import "./style.css";

// Profile Avatar component
const ProfileAvatar = ({ src, alt }) => (
  <div className="rounded-full border bg-[#ebe7e7] ease-in-out duration-500">
    {src ? (
      <Image
        alt={alt}
        src={src}
        width={500}
        height={500}
        className="object-cover w-10 h-10 rounded-full object-center"
      />
    ) : (
      <div className="text-[30px] text-center p-2">
        <FiUser />
      </div>
    )}
  </div>
);

const CommentsComponent = ({ post }) => {
  const [IsLoading, setIsLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});
  const [comments, setComments] = useState([]);
  const timeAgo = "4 days ago"; // Placeholder, replace with real calculation if needed

  useEffect(() => {
    const contentLoad = async () => {
      try {
        if (user?.email) {
          const { allUserInfo } = await findOneUser(user.email);
          setUserInfo(allUserInfo || {});

          // Fetch comments for the current post
          const { comments, message } = await getAllComments(post?._id);
          if (comments.length > 0) {
            setComments(comments); // Set fetched comments
          } else {
            console.warn(message);
            setComments([]); // Set empty array if no comments
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setComments([]); // Fallback to empty array on error
      }
    };
    contentLoad();
  }, [user]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const captionValue = watch("comment", "");

  const onSubmit = async (data) => {
    const comment = {
      postId: post?._id,
      commentEmail: user?.email,
      comment: data?.comment,
      commentDate: new Date(),
      displayName: user?.displayName,
    };

    try {
      await commentsInsert(comment, setIsLoading, reset);
      setComments((prev) => [...prev, comment]); // Add new comment locally
      reset();
    } catch (err) {
      console.error("Error inserting comment:", err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error(error);
    return <p>Error loading user data</p>;
  }

  return (
    <>
      <aside className="w-full sm:w-[40%] h-auto bg-[#fff] text-[#000] overflow-y-auto">
        <h2 className="text-lg font-bold">Comments</h2>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 py-2 border-b last:border-none"
            >
              <div className="h-10 w-10 bg-gray-600 rounded-full"></div>
              <div>
                <p className="text-sm font-bold">
                  {comment?.displayName || "Anonymous"}
                </p>
                <p className="text-sm">{comment?.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No Comments Found</p>
        )}

        {/* Add New Comment */}
        <div className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              {...register("comment", {
                required: "Comment is required",
                maxLength: {
                  value: 200,
                  message: "Comment must be less than 200 characters",
                },
              })}
              name="comment"
              id="comment"
              className="mt-4 w-full border rounded p-2 focus:outline-none px-1 bg-white"
              placeholder="Write a comment..."
              rows="4"
              aria-label="Write your comment"
            ></textarea>
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1">
                {errors.comment.message}
              </p>
            )}
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Post Comment
            </button>
          </form>
        </div>
      </aside>
    </>
  );
};

export default CommentsComponent;
