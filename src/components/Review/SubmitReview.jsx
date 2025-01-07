"use client";
import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import insertReview from "@/database/insert/insertReview.";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import CheckingUser from "../Admin/checkingUser";

export default function SubmitReview() {
  const [user, loading, error] = useAuthState(auth);
  // const [signOut, outLoading, OutError] = useSignOut(auth);
  const checkingUsers = CheckingUser(); // call checking user fund or no
  const [isLoading, seIsLoading] = useState(false);
  const [reviewStar, setReviewStar] = useState(2);
  // console.log(reviewStar);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);

    const admissionInfo = {
      reviewStar: reviewStar,
      reviewDescription: data.review,
      email: user?.email,
      displayName: user?.displayName,
      image: user?.photoURL,
    };
    // // loading start
    seIsLoading(true);
    const insertProjects = insertReview(admissionInfo, seIsLoading, reset);
  };
  if (isLoading || loading) {
    return <Loading></Loading>;
  }
  if (error) {
    console.log(error.message);
  }
  return (
    <div>
      <div className="">
        <div className="">
          <p>Share your experience</p>
          <h2 className="text-2xl font-medium py-2">
            How was your experience ?{" "}
          </h2>
        </div>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-5 text-start">
              <div className="w-full text-start py-5">
                <div className="rating rating-lg">
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                    onClick={() => setReviewStar(1)}
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                    onClick={() => setReviewStar(2)}
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                    onClick={() => setReviewStar(3)}
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                    onClick={() => setReviewStar(4)}
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                    onClick={() => setReviewStar(5)}
                  />
                </div>
              </div>
              <div className="w-full">
                <textarea
                  id="review"
                  name="review"
                  type="text"
                  cols={20}
                  rows={10}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border dark:border-gray-700 border-gray-400  placeholder-gray-500 dark:text-slate-400 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-[#1f296117]  bg-[#ffffff00] mt-2 "
                  placeholder="Share feedback...."
                  {...register("review", {
                    required: {
                      value: true,
                      maxLength: 60,
                      message: "Share feedback....",
                    },
                  })}
                ></textarea>

                <label className="">
                  {errors.review?.type === "required" && (
                    <span className="text-red-500 text-sm pt-2 capitalize">
                      {errors.review.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            {isLoading ? (
              <button
                className="btn w-full rounded capitalize bg-blue-700 py-2 text-white hover:bg-blue-600 rounded-b border-none"
                disabled
              >
                <span className="loading loading-spinner"></span>
                loading...
              </button>
            ) : (
              <button className="uppercase bg-blue-700 w-full py-2 text-white hover:bg-blue-600 rounded-b">
                submit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
