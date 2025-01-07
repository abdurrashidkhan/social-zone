"use client";
import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import CheckingUser from "@/components/Admin/checkingUser";
import insertNewPost from "@/database/insert/insertNewPost";
import Link from "next/link";
import { useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";

export default function CreateCollegeForm() {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, outLoading, OutError] = useSignOut(auth);
  const checkingUsers = CheckingUser();
  const [profile, setProfile] = useState(false)
  const [files, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    // setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      const lgImageFile = data.file[0];
      let lgImageUrl = "";

      if (lgImageFile) {
        formData.append("file", lgImageFile);
        formData.append("upload_preset", "images_preset");

        const imageResponse = await fetch(
          `https://api.cloudinary.com/v1_1/digb8ogls/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());

        if (imageResponse.secure_url) {
          lgImageUrl = imageResponse.secure_url;
        } else {
          console.error("Image response:", imageResponse);
          throw new Error("Image upload failed");
        }
      }

      const insertData = {
        caption: data.caption,
        date: new Date(),
        image: lgImageUrl,
        email: user?.email,
        profile: profile
      };
      console.log(insertData)
      await insertNewPost(insertData, setIsLoading, reset);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    // setValue("file", event.target.files);
  };

  if (loading || outLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <form
        className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {(error || OutError) && (
          <div className="mb-4 text-red-500">
            {error?.message || OutError?.message || "An unknown error occurred."}
          </div>
        )}

        <div className="flex items-center justify-between border-b pb-2">
          <Link href='/' className="text-gray-500 hover:text-black">&larr; Back</Link >
          <h1 className="font-semibold">Create new post</h1>
          <button
            type="submit"
            disabled={!files || isLoading}
            className={`font-semibold ${files && !isLoading
              ? "text-blue-500 hover:text-blue-600"
              : "text-gray-400 cursor-not-allowed"
              }`}
          >
            {isLoading ? "Submitting..." : "Share"}
          </button>
        </div>

        <div className="flex mt-4">
          <div className="flex-1 border rounded-lg flex justify-center items-center bg-gray-100 h-64">
            <div className="w-full flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-100">
              {!files ? (
                <>
                  <div className="flex flex-col items-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-16 h-16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5M9 12l3 3m0 0l3-3m-3 3V3"
                      />
                    </svg>
                    <p className="mt-2 text-sm">Drag photos and videos here</p>
                  </div>
                  <label
                    htmlFor="file"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
                  >
                    Select from computer
                  </label>
                  <input
                    name="file"
                    id="file"
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    {...register("file", {
                      onChange: onFileChange,
                      required: "Please select a file",
                    })}
                  />
                </>
              ) : (
                <div className="text-center">
                  <p className="text-gray-700 font-medium">
                    {files.name} ({(files.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setValue("file", null);
                    }}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Remove File
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 pl-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <span className="font-medium">abdurrashidkhan.dev</span>
            </div>

            <textarea
              {...register("caption", {
                required: "Caption is required",
                maxLength: {
                  value: 2200,
                  message: "Caption must be less than 2200 characters",
                },
                onChange: (e) => setCaption(e.target.value),
              })}
              name="caption"
              id="caption"
              className="mt-4 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a caption..."
              rows="4"
            ></textarea>
            {errors.caption && (
              <p className="text-red-500 text-sm mt-1">
                {errors.caption.message}
              </p>
            )}

            <div className="text-sm text-gray-500 text-right mt-1">
              {caption.length}/2200
            </div>
            <div className="flex items-center gap-2">
              <input onClick={() => setProfile(true)} type="checkbox" className="checkbox " id="profilePhoto" name="profilePhoto" />
              <label htmlFor="profilePhoto">Use as profile picture</label>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
