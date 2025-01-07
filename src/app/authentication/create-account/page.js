"use client";

import { auth } from "@/app/firebase.init";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState, useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function SignUpPage() {
  const router = useRouter();
  const [cUser, cLoading, cError] = useAuthState(auth);
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { userName, userEmail, password, userNumber } = data;

    try {
      await createUserWithEmailAndPassword(userEmail, password);
      await updateProfile({ displayName: userName });

      const userInfo = {
        displayName: userName,
        email: userEmail,
        userNumber,
        password,
        emailVerified: user?.emailVerified || false,
        photoURL: user?.photoURL || null,
      };

      const res = await fetch(`/api/users/create-account/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      if (!res.ok) {
        throw new Error("Failed to insert user info");
      }

      reset();
      Swal.fire({ title: "Account created successfully!", icon: "success" });
    } catch (err) {
      Swal.fire({ title: "Error", text: err.message, icon: "error" });
    }
  };

  useEffect(() => {
    if (user || cUser) {
      router.push("/");
      Swal.fire({ title: "Logged in successfully!", icon: "success" });
    }
  }, [user, cUser, router]);

  if (loading || cLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <div className="container mx-auto bg-gray-50 px-2">
        <div className="flex justify-center items-center  min-h-screen">
          {/* Main Container */}
          <div className="bg-white border border-gray-300 p-6 w-full max-w-sm rounded-md shadow-sm">
            {/* Instagram Logo */}
            <h1 className="text-center text-3xl font-logo mb-4">Instagram</h1>

            {/* Subtitle */}
            <p className="text-center text-gray-500 text-sm mb-4">
              Sign up to see photos and videos from your friends.
            </p>

            {/* Facebook Login Placeholder */}
            <button className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold mb-4 hover:bg-blue-600 transition-all">
              Log in with Facebook
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="text-gray-400 text-sm px-2">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <input
                type="text"
                {...register("userName", { required: "Name is required" })}
                placeholder="Full Name"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}

              <input
                type="number"
                {...register("userNumber", { required: "Mobile Number is required" })}
                placeholder="Mobile Number"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.userNumber && <p className="text-red-500 text-sm">{errors.userNumber.message}</p>}

              <input
                type="email"
                {...register("userEmail", { required: "Email is required" })}
                placeholder="Mobile Number or Email"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.userEmail && <p className="text-red-500 text-sm">{errors.userEmail.message}</p>}

              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition-all"
              >
                Sign up
              </button>
            </form>

            {/* Terms and Policies */}
            <div className="">
              <p className="text-xs text-gray-500 text-center mt-4">
                People who use our service may have uploaded your contact information
                to Instagram. <a href="#" className="text-blue-500 hover:underline">Learn More</a>
              </p>
              <p className="text-xs text-gray-500 text-center mt-2">
                By signing up, you agree to our{" "}
                <a href="#" className="text-blue-500 hover:underline">Terms</a>,{" "}
                <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>, and{" "}
                <a href="#" className="text-blue-500 hover:underline">Cookies Policy</a>.
              </p>
            </div>
            {/* Footer Section */}
            <div className="mt-6 text-center">
              <p className="text-sm">
                Have an account?{" "}
                <Link href="/authentication/login" className="text-blue-500 font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>


        </div>

      </div>
    </section>
  );
}
