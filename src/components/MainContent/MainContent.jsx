"use client";

import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import findOneUser from "@/database/find/allUsers/findOneUser";
import findAllPosts from "@/database/find/findAllPosts/findAllPosts";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { CiShare1 } from "react-icons/ci";
import { FaComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import Swal from "sweetalert2";
const ProfileAvatar = ({ src, alt, size = 30 }) => (
  <div className="rounded-full border  bg-[#ebe7e7] ease-in-out duration-500">
    {src ? (
      <Image
        alt={alt}
        src={src}
        width={500}
        height={500}
        className="object-cover w-full h-auto   rounded-full object-center"
      />
    ) : (
      <div className="text-[30px] text-center">
        <FiUser />
      </div>
    )}
  </div>
);

export default function MainContent() {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, outLoading, outError] = useSignOut(auth);

  // Data states
  const [allContent, setAllContent] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setLoading] = useState(false);

  // Fetch posts and user details
  const contentLoad = async (email) => {
    try {
      setLoading(true);

      // Fetch all posts for the user
      const { allPost } = await findAllPosts(email);
      setAllContent(allPost || []);

      // Extract unique emails from posts
      const emails = [...new Set(allPost.map((post) => post.email))];

      // Fetch user details for each email
      const userFetchPromises = emails.map((email) => findOneUser(email));
      const userResults = await Promise.all(userFetchPromises);

      // Map emails to user details
      const userMap = userResults.reduce((acc, result) => {
        if (result?.email) {
          acc[result.email] = result; // Assuming result contains email and user details
        }
        return acc;
      }, {});

      setUserDetails(userMap);
    } catch (err) {
      console.error("Error fetching data:", err);
      setAllContent([]);
      setUserDetails({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      contentLoad(user.email);
    }
  }, [user?.email]);

  const userLogOut = async () => {
    await signOut();
    Swal.fire({
      title: "Logout success",
      icon: "success",
    });
  };

  if (loading || outLoading || isLoading) {
    return <Loading />;
  }

  // Error Handling
  if (error || outError) {
    const errorMessage =
      error?.message || outError?.message || "An unknown error occurred";
    return (
      <div className="p-4 text-red-500">
        <p>Error: {errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between px-4 py-2 border-b bg-stext-slate-800 shadow-sm ">
        <div className="text-2xl font-bold text-gray-900">Instagram</div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-200 rounded-lg px-4 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="flex space-x-2 ">
            <div className="avatar ">
              <div className="border rounded-full pt-2 px-[10px]  mx-auto hover:bg-[#ebe7e7] ease-in-out duration-500">
                <IoMdNotificationsOutline className="text-[25px] text-center" />
              </div>
            </div>
            <Link href={"/profile"}>
              <ProfileAvatar src={user?.photoURL} alt="User Avatar" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar */}
        <aside className="hidden md:block w-1/5 border-r p-4">
          <ul className="space-y-2">
            <li className="text-lg font-medium">Home</li>
            <li className="text-gray-700">Explore</li>
            <li className="text-gray-700">Messages</li>
          </ul>
        </aside>

        {/* Feed */}
        <main className="flex-grow p-4">
          <div className="bg-stext-slate-800 rounded-lg shadow-sm p-4">
            {/* Post Feed */}
            {allContent.map((post) => {
              const users = userDetails[post.email];

              // Use date-fns to format the post date
              const postDate = post.date ? new Date(post.date) : new Date();
              const timeAgo = formatDistanceToNow(postDate, {
                addSuffix: true,
              });

              return (
                <div
                  key={post?._id}
                  className="mt-4 w-full sm:w-[70%] mx-auto bg-[#fff] rounded-lg overflow-hidden shadow-2xl"
                >
                  {/* User Info */}
                  <div className="flex items-center px-4 py-2 border-b border-gray-200">
                    <div className="h-10 w-10   rounded-full flex items-center justify-center">
                      {/* User Avatar */}
                      <ProfileAvatar
                        src={users?.photoURL}
                        alt={users?.displayName || "User"}
                        className="w-full h-auto"
                        // size={40}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-slate-800 font-medium capitalize">
                        {users?.displayName || "Anonymous"}
                      </p>
                      <p className="text-gray-400 text-sm">{timeAgo}</p>
                    </div>
                    <div className="ml-auto text-slate-800 text-lg">⋮</div>
                  </div>

                  {/* Post Image */}
                  <div className="relative w-full h-[500px]">
                    <Image
                      src={post?.image || "/default.jpg"}
                      alt="Post Image"
                      fill
                      className="object-cover w-full h-auto rounded"
                    />
                  </div>

                  {/* Post Footer */}
                  <div className="px-4 py-3">
                    {/* Post Caption */}
                    <div className="text-slate-800">
                      <span className="font-bold capitalize">
                        {users?.displayName || "Anonymous"}
                      </span>{" "}
                      {post?.caption}
                    </div>
                    <p className="text-gray-500 text-sm mt-1">5,498 likes</p>

                    {/* Interaction Buttons */}
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center space-x-4">
                        <button className="text-slate-800 text-xl">
                          <FaRegHeart />
                          {/* <FaHeart /> */}
                        </button>
                        <button className="text-slate-800 text-xl">
                          <FaComment />
                        </button>
                        <button className="text-slate-900 text-xl">
                          <CiShare1 />
                        </button>
                      </div>
                      <span className="text-gray-400 text-sm">{timeAgo}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-1/5 border-l p-4">
          <h3 className="font-bold text-gray-800">Suggestions for you</h3>
          <ul className="mt-4 space-y-2">
            {["monalisa11934", "shopnil_ehsan", "sharif_hujaifa"].map(
              (user, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <Image
                      src={`/suggestion-avatar-${index + 1}.jpg`}
                      alt={user}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <p>{user}</p>
                  </div>
                  <button className="text-blue-500 font-medium">Follow</button>
                </li>
              )
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
}
