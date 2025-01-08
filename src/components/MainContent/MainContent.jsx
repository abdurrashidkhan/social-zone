"use client";

import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import Image from "next/image";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import findOneUser from "@/database/find/allUsers/findOneUser";
import findAllPosts from "@/database/find/findAllPosts/findAllPosts";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { formatDistanceToNow } from "date-fns"; // Import formatDistanceToNow

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
  if (error || outError) {
    return (
      <div>
        <p>Error: {error?.message || outError?.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between px-4 py-2 border-b bg-white shadow-sm">
        <div className="text-2xl font-bold text-gray-900">Instagram</div>
      </nav>

      {/* Main Content */}
      <div className="flex">
        <main className="flex-grow p-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            {/* Post Feed */}
            {allContent.map((post) => {
              const users = userDetails[post.email];

              // Use date-fns to format the post date
              const postDate = post.date ? new Date(post.date) : new Date();
              const timeAgo = formatDistanceToNow(postDate, {
                addSuffix: true,
              });

              return (
                <div key={post?._id} className="mt-4 w-[70%] mx-auto">
                  {/* User Info */}
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/user-avatar.jpg"
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-800 capitalize">
                        {users?.displayName || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-500">{timeAgo}</p>{" "}
                      {/* Time ago */}
                    </div>
                  </div>

                  {/* Post Image */}
                  <div className="mt-4">
                    <Image
                      src={post?.image || "/default.jpg"}
                      alt="Post Image"
                      width={500}
                      height={500}
                      className="w-full rounded-lg"
                    />
                  </div>

                  {/* Post Caption */}
                  <div className="mt-2">
                    <p>
                      <span className="font-bold capitalize">
                        {users?.displayName || "Anonymous"}
                      </span>{" "}
                      {post?.caption}
                    </p>
                    <p className="text-gray-500 text-sm">5,498 likes</p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
