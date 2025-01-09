"use client";

import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import findOneUser from "@/database/find/allUsers/findOneUser";
import findAllPosts from "@/database/find/findAllPosts/findAllPosts";
import countReact from "@/database/insert/countReact";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { CiShare1 } from "react-icons/ci";
import { FaComment } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoBookmarksOutline } from "react-icons/io5";
import Swal from "sweetalert2";

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

export default function MainContent() {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, outLoading, outError] = useSignOut(auth);
  const [IsLoading, setIsLoading] = useState(false);

  // Data states
  const [allContent, setAllContent] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  // Function to fetch react count
  const reactCounter = async (id, email) => {
    try {
      const response = await countReact(id, email);

      if (response.success) {
        if (response.alreadyReacted) {
          // Swal.fire({
          //   title: "You already liked this post!",
          //   icon: "info",
          // });
        } else {
          // Swal.fire({
          //   title: "Post liked successfully!",
          //   icon: "success",
          // });
          // Reload posts to update the react count
          contentLoad(user.email);
        }
      } else {
        // Swal.fire({
        //   title: "Failed to like the post",
        //   text: response.message,
        //   icon: "error",
        // });
      }
    } catch (error) {
      console.error("Error in reactCounter:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while reacting to the post",
        icon: "error",
      });
    }
  };

  // Function to fetch posts and user details
  const contentLoad = async (email) => {
    try {
      setIsLoading(true);

      const { allPost } = await findAllPosts(email);
      const updatedPosts = allPost.map((post) => {
        const hasReacted = post.reactEmail.some(
          (entry) => entry.email === email
        );
        return { ...post, hasReacted };
      });

      // Sort posts by reaction count in descending order
      updatedPosts.sort((a, b) => b.react - a.react);

      setAllContent(updatedPosts);

      const emails = [...new Set(allPost.map((post) => post.email))];
      const userFetchPromises = emails.map((email) => findOneUser(email));
      const userResults = await Promise.all(userFetchPromises);

      const userMap = {};
      userResults.forEach((result) => {
        if (result?.allUserInfo) {
          userMap[result.allUserInfo.email] = result.allUserInfo;
        }
      });
      setUserDetails(userMap);
    } catch (err) {
      console.error("Error fetching data:", err);
      setAllContent([]);
      setUserDetails({});
    } finally {
      setIsLoading(false);
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

  if (loading || outLoading || IsLoading) {
    return <Loading />;
  }

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
      <nav className="navbar bg-gray-100 border border-b shadow-2xl ">
        <div className="flex-1">
          <Link href={"/"} className="font-semibold  text-xl">
            Social Zone
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input border   focus:outline-none w-24 md:w-auto bg-white"
            />
          </div>
          <div className="form-control">
            <div className="border rounded-full p-2 hover:bg-gray-300 ease-in-out duration-300">
              <IoMdNotificationsOutline className="text-[25px] text-gray-800" />
            </div>
          </div>
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <ProfileAvatar
                  src={userDetails[user?.email]?.photoURL}
                  alt="User Avatar"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  rounded z-[1] mt-3 w-52 p-2 shadow-2xl bg-gray-100"
            >
              <li>
                <Link href={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={() => userLogOut()}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* left slider */}
        <aside className="hidden md:block w-1/5 border-r p-4">
          <ul className="space-y-2">
            <li className="text-lg font-medium">Home</li>
            <li className="text-gray-700">Explore</li>
            <li className="text-gray-700">Messages</li>
          </ul>
        </aside>
        <main className="flex-grow sm:p-4">
          <div className="bg-stext-slate-800 rounded-lg shadow-sm p-4">
            {allContent.map((post) => {
              const userData = userDetails[post.email];
              const userName = userData?.displayName || "Anonymous";
              const userPhoto = userData?.photoURL;

              const postDate = post.date ? new Date(post.date) : new Date();
              const timeAgo = formatDistanceToNow(postDate, {
                addSuffix: true,
              });

              return (
                <div
                  key={post?._id}
                  className="mt-4 w-full sm:w-[70%] mx-auto bg-[#fff] rounded-lg overflow-hidden shadow-2xl"
                >
                  <div className="flex items-center px-4 py-2 border-b border-gray-200">
                    <ProfileAvatar src={userPhoto} alt={userName} />
                    <div className="ml-3">
                      <p className="text-slate-800 font-medium capitalize">
                        {userName}
                      </p>
                      <p className="text-gray-400 text-sm">{timeAgo}</p>
                    </div>
                  </div>

                  <div className="relative w-full h-[500px]">
                    <Image
                      src={post?.image || "/default.jpg"}
                      alt="Post Image"
                      fill
                      className="object-contain w-full h-auto rounded"
                    />
                  </div>

                  <div className="px-4 py-3">
                    <div className="text-slate-800">
                      <span className="font-bold capitalize">{userName}</span>{" "}
                      {post?.caption}
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                      {post?.react} likes
                    </p>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex gap-4 items-center">
                        <button
                          disabled={post.hasReacted}
                          onClick={() =>
                            !post.hasReacted &&
                            reactCounter(post?._id, user?.email)
                          }
                        >
                          {post.hasReacted ? (
                            <GoHeartFill className="text-3xl text-red-700" />
                          ) : (
                            <GoHeart className="text-3xl text-slate-800" />
                          )}
                        </button>
                        <button className="text-slate-800 text-3xl">
                          <FaComment />
                        </button>
                        <button className="text-slate-900 text-3xl">
                          <CiShare1 />
                        </button>
                      </div>
                      <span className="">
                        <IoBookmarksOutline className="text-slate-900 text-3xl" />
                      </span>
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
