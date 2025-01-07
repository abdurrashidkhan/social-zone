"use client";
import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import insertAdmissionInfo from "@/database/insert/insertAdmissionInfo";
import { useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import CheckingUser from "../Admin/checkingUser";

export default function CollegeAdmissionsForm() {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, outLoading, OutError] = useSignOut(auth);
  const checkingUsers = CheckingUser(); // call checking user function
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const insertData = {
        firstName: data?.firstName,
        middleInitial: data?.middleInitial,
        lastName: data?.lastName,
        dateOfBirth: data?.dateOfBirth,
        gender: data?.gender,
        citizenship: data?.citizenship,
        phone: data?.phone,
        email: data?.email,
        city: data?.city,
        state: data?.state,
        zipCode: data?.zipCode,
        emergencyFirstName: data?.emergencyFirstName,
        emergencyLastName: data?.emergencyLastName,
        relationship: data?.relationship,
        emergencyEmail: data?.emergencyEmail,
        emergencyPhone: data?.emergencyPhone,
        otherLanguages: data?.otherLanguages, // "Yes" or "No"otherLanguages,
      };
      console.log(insertData);
      // console.log(insertData)
      // Handle form submission logic here (e.g., save to database)

      const book = await insertAdmissionInfo(insertData, setIsLoading, reset);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-slate-700 text-2xl font-bold mb-6 text-center">
          COLLEGE ADMISSIONS FORM
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                placeholder="enter you fast name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#fff] "
              />
              {errors.firstName && (
                <span className="text-sm text-red-500">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Middle Initial
              </label>
              <input
                type="text"
                placeholder="enter you middle initial"
                {...register("middleInitial")}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#fff] "
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                placeholder="enter you last name"
                {...register("lastName", { required: "Last name is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#fff] "
              />
              {errors.lastName && (
                <span className="text-sm text-red-500">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          {/* Birth Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#fff] text-slate-700"
            />
            {errors.dateOfBirth && (
              <span className="text-sm text-red-500">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>

          {/* Gender and Citizenship */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="mt-2 flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Male"
                    {...register("gender", { required: "Gender is required" })}
                    className="h-4 w-4 border-gray-300 bg-[#fff] radio"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Female"
                    {...register("gender", { required: "Gender is required" })}
                    className="h-4 w-4 border-gray-300 bg-[#fff] radio"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
              {errors.gender && (
                <span className="text-sm text-red-500">
                  {errors.gender.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Of which country are you a citizen?
              </label>
              <select
                {...register("citizenship", {
                  required: "Citizenship is required",
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#fff]"
              >
                <option value="">Please select</option>
                <option value="bangladesh">Bangladesh</option>
              </select>
              {errors.citizenship && (
                <span className="text-sm text-red-500">
                  {errors.citizenship.message}
                </span>
              )}
            </div>
          </div>

          {/* Phone and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                {...register("phone", { required: "Phone number is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#fff]"
                placeholder="(000) 000-0000"
              />
              {errors.phone && (
                <span className="text-sm text-red-500">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-[#fff]"
                placeholder="example@example.com"
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          {/* Mailing Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <input
                type="text"
                {...register("city", { required: "City is required" })}
                className="block w-full border border-gray-300 rounded-md p-2 bg-[#fff]"
                placeholder="City"
              />
              <input
                type="text"
                {...register("state", { required: "State is required" })}
                className="block w-full border border-gray-300 rounded-md p-2 bg-[#fff]"
                placeholder="State / Province"
              />
              <input
                type="text"
                {...register("zipCode", {
                  required: "Postal code is required",
                })}
                className="block w-full border border-gray-300 rounded-md p-2 bg-[#fff]"
                placeholder="Postal / Zip Code"
              />
              {errors.zipCode && (
                <span className="text-sm text-red-500">
                  {errors.zipCode.message}
                </span>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Emergency Contact
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <input
                type="text"
                {...register("emergencyFirstName", {
                  required: "First name is required",
                })}
                className="block w-full border border-gray-300 rounded-md p-2 bg-[#fff]"
                placeholder="First Name"
              />
              <input
                type="text"
                {...register("emergencyLastName", {
                  required: "Last name is required",
                })}
                className="block w-full border border-gray-300 rounded-md p-2 bg-[#fff]"
                placeholder="Last Name"
              />
              <input
                type="text"
                {...register("relationship", {
                  required: "Relationship is required",
                })}
                className="block w-full border border-gray-300 rounded-md p-2 bg-[#fff]"
                placeholder="Relationship"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input
                type="email"
                {...register("emergencyEmail", {
                  required: "Email is required",
                })}
                className="block w-full border border-gray-300 rounded-md p-2 bg-[#fff]"
                placeholder="example@example.com"
              />
              <input
                type="text"
                {...register("emergencyPhone", {
                  required: "Phone number is required",
                })}
                className="block w-full border border-gray-300 rounded-md p-2 bg-[#fff]"
                placeholder="(000) 000-0000"
              />
            </div>
          </div>

          {/* Language Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Do you speak any languages other than English?
            </label>
            <div className="mt-2 flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Yes"
                  {...register("otherLanguages", {
                    required: "This field is required",
                  })}
                  className="h-4 w-4 border-gray-300 bg-[#fff] radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="No"
                  {...register("otherLanguages", {
                    required: "This field is required",
                  })}
                  className="h-4 w-4 border-gray-300 bg-[#fff] radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
            {errors.otherLanguages && (
              <span className="text-sm text-red-500">
                {errors.otherLanguages.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
