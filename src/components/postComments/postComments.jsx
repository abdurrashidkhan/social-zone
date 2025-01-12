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
import { HiDotsVertical } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import "./style.css";

// Profile Avatar Component
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
  const [isComment, setIsComment] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});
  const [comments, setComments] = useState([]);
  const timeAgo = "4 days ago"; // Placeholder for real-time calculation

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.email) {
          const { allUserInfo } = await findOneUser(user.email);
          setUserInfo(allUserInfo || {});
          setIsLoading(true);
          // Fetch comments for the post
          const { comments, message } = await getAllComments(post?._id);
          if (comments.length > 0) {
            setComments(comments);
          } else {
            console.warn(message);
            setComments([]);
          }
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setComments([]);
      }
    };
    fetchData();
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
    setIsLoading(true);
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
    setIsLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error(error);
    return <p>Error loading user data</p>;
  }

  return (
    isComment && (
      <div className="z-[999] w-[100vw] h-[100vh] bg-[#9b9b9b8c] fixed top-0 left-0 overflow-y-scroll">
        <div id="comments_content_center" className="overflow-y-scroll">
          <div className="container mx-auto px-2 shadow-2xl rounded relative">
            {/* close comment aria */}
            <div className="text-center p-2 text-xl absolute top-0 right-4">
              <button
                className="text-3xl bg-[#0000001a] hover:bg-[#00000031] rounded duration-700 ease-in-out text-red-700 hover:text-red-800"
                onClick={() => setIsComment(false)}
              >
                <IoClose />
              </button>
            </div>
            <div className="w-full bg-white shadow-2xl rounded">
              <div className=" w-full h-full">
                {/* Main Post Section */}
                <main className="flex flex-col sm:flex-row items-center px-6 py-6 bg-white shadow-2xl rounded">
                  <div className="w-[100%] p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center px-4 py-2 border-b border-gray-200">
                        <ProfileAvatar
                          src={userInfo?.photoURL}
                          alt={userInfo?.displayName}
                        />
                        <div className="ml-3">
                          <p className="text-slate-800 font-medium capitalize">
                            {userInfo?.displayName || "Anonymous"}
                          </p>
                          <p className="text-gray-400 text-sm">{timeAgo}</p>
                        </div>
                      </div>
                      <span className="text-base font-bold text-gray-900">
                        <HiDotsVertical />
                      </span>
                    </div>
                    <hr />
                    <div className="mt-4 w-full aspect-video rounded-lg flex items-center justify-center bg-gray-200 py-1">
                      {post?.image ? (
                        <Image
                          src={post.image}
                          alt="Post image"
                          width={500}
                          height={500}
                          className="mx-auto rounded"
                        />
                      ) : (
                        <div className="text-gray-500">No image available</div>
                      )}
                    </div>
                    <div className="mt-4 p-1 text-base bg-white shadow-2xl text-slate-800">
                      <div className="flex items-center gap-2">
                        <p>{userInfo?.displayName}</p>
                        <span className="font-semibold">{post.caption}</span>
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
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
                    ) : isLoading ? (
                      <div className="text-center py-4 ">
                        <span className="loading loading-ring loading-lg"></span>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No Comments Found
                      </p>
                    )}

                    {/* Add New Comment Section */}
                    <div className="mt-4">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <textarea
                          {...register("comment", {
                            required: "Comment is required",
                            maxLength: {
                              value: 200,
                              message:
                                "Comment must be less than 200 characters",
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
                        <div className="text-sm text-gray-500 text-right mt-1">
                          {captionValue.length}/200
                        </div>
                        {isLoading ? (
                          <button
                            disabled
                            type="submit"
                            className="w-full mt-4 bg-blue-400 text-white px-4 py-2 rounded-lg  transition duration-200 text-center"
                          >
                            <span className="loading loading-spinner loading-md"></span>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className=" w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                          >
                            Post Comment
                          </button>
                        )}
                      </form>
                    </div>
                  </aside>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CommentsComponent;
