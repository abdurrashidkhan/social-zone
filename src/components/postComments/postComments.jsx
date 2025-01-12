import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./style.css";

const CommentsComponent = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [comments, setComments] = useState([
    {
      name: "Meher",
      comment:
        "Facebook, Google, Amazon, Netflix, Tesla er moto boro company te job korte gele ki CSE kora lagbe?",
    },
    {
      name: "Arif",
      comment:
        "CSE na korleo job kora jay. Skill e ashol bishoy, na sudhu degree.",
    },
  ]);

  const captionValue = watch("caption", "");

  const onSubmit = (data) => {
    setComments([{ name: "Anonymous", comment: data.caption }, ...comments]);
    reset(); // Clear the form after submission
  };

  return (
    <div
      className="container mx-auto px-2 z-[999] shadow-2xl"
      id="comments_content_center"
    >
      <div className="w-full bg-white shadow-2xl rounded">
        <div className="flex w-full h-full">
          {/* Main Video and Description */}
          <main className="flex flex-col sm:flex-row items-center px-6 py-6 bg-white shadow-2xl">
            {/* Video Section */}
            <div className="w-[100%] p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold">Career Cracker</h1>
                <span className="text-sm text-gray-400">4 days ago</span>
              </div>
              <div className="mt-4 w-full aspect-video rounded-lg flex items-center justify-center bg-gray-200">
                <p className="text-gray-400">Video Placeholder</p>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                CSE-এ পড়াশোনা করা অনেকেই স্বপ্ন দেখে, তারা একদিন Facebook,
                Google, Amazon, Netflix, Tesla-এর মতো বড় কোম্পানিতে কাজ করবে।
              </p>
            </div>

            {/* Comments Section */}
            <aside className="w-full sm:w-[40%] h-auto bg-[#fff] text-[#000] overflow-y-auto">
              <h2 className="text-lg font-bold">Comments</h2>
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 py-2 border-b last:border-none"
                >
                  <div className="h-10 w-10 bg-gray-600 rounded-full"></div>
                  <div>
                    <p className="text-sm font-bold">{comment.name}</p>
                    <p className="text-sm">{comment.comment}</p>
                  </div>
                </div>
              ))}

              {/* Add New Comment */}
              <div className="mt-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                    {...register("caption", {
                      required: "Caption is required",
                      maxLength: {
                        value: 2200,
                        message: "Caption must be less than 2200 characters",
                      },
                    })}
                    name="caption"
                    id="caption"
                    className="mt-4 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="Write a caption..."
                    rows="4"
                    aria-label="Write your comment"
                  ></textarea>
                  {errors.caption && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.caption.message}
                    </p>
                  )}

                  <div className="text-sm text-gray-500 text-right mt-1">
                    {captionValue.length}/2200
                  </div>
                  <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Post Comment
                  </button>
                </form>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CommentsComponent;
