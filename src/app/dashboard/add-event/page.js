"use client";
import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import CheckAdmin from "@/components/Admin/CheckAdmin";
import CheckingUser from "@/components/Admin/checkingUser";
import insertEvent from "@/database/insert/insertEvent";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import './style.css';
export default function AddBook() {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, outLoading, OutError] = useSignOut(auth);
  const checkingUsers = CheckingUser(); // call checking user function

  const [newCategory, setNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    CheckAdmin(user, signOut);
  }, [user, signOut]);
  // console.log(newCategory)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      const lgImageFile = data.lgImage[0];
      let lgImageUrl = "";

      if (lgImageFile) {
        formData.append("file", lgImageFile);
        formData.append("upload_preset", "images_preset"); // Update with your preset name
        const imageResponse = await fetch(
          `https://api.cloudinary.com/v1_1/digb8ogls/upload`,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());

        if (imageResponse.secure_url) {
          lgImageUrl = imageResponse.secure_url;
        } else {
          throw new Error("Image upload failed");
        }
      }



      // Example of project data including uploaded URLs
      const insertData = {
        title: data.title,
        eventDurations: data.contentDurations,
        description: data.description,
        eventDate: data.eventDate,
        venue: data.venue,
        date: new Date(),
        image: lgImageUrl,
      };
      console.log(insertData)
      // Handle form submission logic here (e.g., save to database)

      const event = await insertEvent(insertData, setIsLoading, reset);
      // reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsLoading(false);
    }
  };


  if (loading || outLoading) {
    return <Loading />;
  }

  if (error || OutError) {
    console.error(error?.message || OutError?.message);
  }

  return (
    <div className="w-[98%] h-auto mb-5">
      <div
        id="project-content"
        className="rounded bg-[#fff] text-[#000] shadow-2xl mb-[4rem]"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center md:text-start">
            <h1 className="text-2xl font-serif pt-4 pl-5">Add Event</h1>
          </div>
          <div className="p-4 text-start">
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">


              <div className="w-full">
                <label htmlFor="venue">Venue Name</label>
                <input
                  id="venue"
                  name="venue"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                  placeholder="type venue name"
                  {...register("venue", {
                    required: {
                      value: true,
                      message: "venue name is required",
                    },
                  })}
                />
                {errors.venue && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.venue.message}
                  </span>
                )}
              </div>
              {/* Title */}
              <div className="w-full">
                <label htmlFor="title">Event Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-[#1f296100]   mt-2"
                  placeholder="type here event  title"
                  {...register("title", {
                    required: {
                      value: true,
                      maxLength: 60,
                      message:
                        "Title is required and should be less than 60 characters",
                    },
                  })}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.title.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">

              {/* eventDate */}
              <div className="w-full">
                <label htmlFor="eventDate">Event Date</label>
                <input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-[#1f296100]   mt-2"
                  placeholder="type here event date"
                  {...register("eventDate", {
                    required: {
                      value: true,
                      message:
                        "event date is required ",
                    },
                  })}
                />
                {errors.eventDate && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.eventDate.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="contentDurations">Event Durations</label>
                <input
                  id="contentDurations"
                  name="contentDurations"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                  placeholder="type content durations"
                  {...register("contentDurations", {
                    required: {
                      value: true,
                      message: "content durations is required",
                    },
                  })}
                />
                {errors.contentDurations && (
                  <span className="text-red-500 text-sm pt-2 capitalize">
                    {errors.contentDurations.message}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="pt-3">
              <label htmlFor="description">Description</label>
              <textarea
                cols="10"
                rows="5"
                id="description"
                name="description"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                placeholder="Type Here project Description"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                })}
              />
              {errors.description && (
                <span className="text-red-500 text-sm pt-2 capitalize">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Image */}
            <div className="pt-3">
              <label htmlFor="lgImage">Content Thumbnail  (1920 * 1080)</label>
              <input
                id="lgImage"
                name="lgImage"
                type="file"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700  text-slate-800  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent   mt-2"
                {...register("lgImage", {
                  required: {
                    value: true,
                    message: "image is required",
                  },
                })}
              />
              {errors.lgImage && (
                <span className="text-red-500 text-sm pt-2 capitalize">
                  {errors.lgImage.message}
                </span>
              )}
            </div>

          </div>
          <button
            type="submit"
            className={`uppercase bg-blue-700 w-full py-2 text-white hover:bg-blue-600 rounded-b ${isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner"></span> uploading...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
