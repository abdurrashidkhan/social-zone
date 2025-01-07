// pages/index.js
"use client";
import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import Image from "next/image";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { FiUser } from "react-icons/fi";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdNotificationsOutline } from "react-icons/io";
import Swal from "sweetalert2";
export default function MainContent() {
  const pathname = usePathname();
  const [user, loading, error] = useAuthState(auth);
  // console.log(user);
  const [signOut, outLoading, OutError] = useSignOut(auth);
  const userLogOut = async () => {
    await signOut();
    Swal.fire({
      title: "Logout success",
      icon: "success",
    });
  };

  if (error || OutError) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading || outLoading) {
    return <Loading></Loading>;
  }
  if (error) {
    console.log(error.message);
  }
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between px-4 py-2 border-b bg-white shadow-sm">
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
            <Link href={"/profile"} className="avatar online">
              <div className="border rounded-full px-2 py-1 mx-auto hover:bg-[#ebe7e7] ease-in-out duration-500">
                {user?.photoURL != null ? (
                  <Image
                    alt="user profile photo"
                    width={30}
                    height={30}
                    src={user?.photoURL}
                  />
                ) : (
                  <div className="text-[30px] text-center">
                    <FiUser />
                  </div>
                )}
              </div>
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
          <div className="bg-white rounded-lg shadow-sm p-4">
            {/* Story Highlights */}
            <div className="flex space-x-4 overflow-x-auto pb-4 border-b">
              {["story1.jpg", "story2.jpg", "story3.jpg"].map(
                (story, index) => (
                  <div key={index} className="flex-shrink-0">
                    <Image
                      src={`/${story}`}
                      alt={`Story ${index + 1}`}
                      width={60}
                      height={60}
                      className="rounded-full border-2 border-blue-500"
                    />
                  </div>
                )
              )}
            </div>

            {/* Post */}
            <div className="mt-4">
              <div className="flex items-center space-x-4">
                <Image
                  src="/user-avatar.jpg"
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-800">sabla.babla</p>
                  <p className="text-sm text-gray-500">5d ago</p>
                </div>
              </div>

              <div className="mt-4">
                <Image
                  src="/post-image.jpg"
                  alt="Post Content"
                  width={500}
                  height={500}
                  className="w-full rounded-lg"
                />
              </div>

              <div className="mt-2">
                <p>
                  <span className="font-bold">sabla.babla</span> Happy New Year
                  🎉 #NewBeginnings
                </p>
                <p className="text-gray-500 text-sm">5,498 likes</p>
              </div>
            </div>
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
