"use client";
import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function CheckingUser() {
  const [user, cLoading, cError] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (cLoading) return; // Skip if loading
    if (!user) {
      router.push("/authentication/login");
      Swal.fire({
        title: "Login now",
        icon: "info",
      });
    }
  }, [user, cLoading, router]); // This will trigger when `user` or `cLoading` changes

  if (cLoading) {
    return <Loading />; // Show loading while auth state is being checked
  }

  if (cError) {
    console.log(cError.message);
    return null; // Return null if there is an error to avoid rendering anything unexpected
  }

  return null; // Nothing to render if user is authenticated
}
