"use client";
import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import CheckingUser from "@/components/Admin/checkingUser";
import findAllPost from "@/database/find/findAllPost/findAllPost";
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { CiCirclePlus } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const checkingUsers = CheckingUser();
  const pathname = usePathname();
  const [user, loading, error] = useAuthState(auth);
  // console.log(user);
  const [signOut, outLoading, OutError] = useSignOut(auth);
  // data load
  const [allContent, setAllContent] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // console.log(allContent)
  const contentLoad = async (email) => {
    try {
      setLoading(true);
      const { allPost } = await findAllPost(email);


      // Ensure allPost is an array, or default to an empty array
      if (allPost) {
        setAllContent(allPost);
      } else {
        console.warn(" empty .");
        setAllContent([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setAllContent([]); // Set to empty array in case of an error
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    contentLoad(user?.email);
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }
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
    <div className="min-h-screen bg-gray-100 px-2">
      {/* Navbar */}
      <div className="bg-white border-b border-gray-300 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-lg font-bold">Social Zone</h1>
          <div className="flex items-center space-x-4">
            <Link href={'/'} className="text-gray-700">Home</Link>
            <button className="text-gray-700">Search</button>
            <Link href={'/'} className="text-gray-700">Explore</Link>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-8">
          {/* Profile Picture */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden py-2">
            <div
              tabIndex={0}
              role=""
              className="  w-[100%] h-auto avatar "
            >
              <div className="  mx-auto ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                {
                  allContent.map((p) => (
                    <div key={p?._id}>
                      {p?.profile ? (
                        <Image
                          alt="user profile photo"
                          width={500}
                          height={500}
                          src={p?.image}
                          quality={100}
                        />
                      ) : (
                        <div className="text-center">
                          <FiUser className="text-[5rem] h-auto mx-auto" />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">Rashid Khan</h2>
            <p className="text-gray-500">Full-stack Developer</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem veniam accusamus consequuntur repudiandae officiis mollitia, incidunt commodi aliquid id unde.</p>

            {/* Stats */}
            <div className="flex space-x-6 mt-4">
              <div>
                <span className="font-bold">{allContent?.length}</span> posts
              </div>
              <div>
                <span className="font-bold">53</span> followers
              </div>
              <div>
                <span className="font-bold">24</span> following
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* add a new post */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex items-center gap-5">
          <div className="">
            <div className="  rounded-full">
              {user?.photoURL &&
                <Image
                  alt="user profile photo"
                  width={100}
                  height={100}
                  src={user?.photoURL}
                  className="w-[80px] h-auto mx-auto rounded-full"
                />
              }
            </div>
          </div>
          <Link href={'/add-new-post'} className="">
            <CiCirclePlus className="bg-[#F5F5F5] text-[#C7C7C7] text-[80px]" />
          </Link>
        </div>
      </div>
      {/* Posts Section */}
      <div className="max-w-4xl mx-auto mt-8">
        <h3 className="text-lg font-semibold mb-4">Posts</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Post 1 */}
          {
            allContent.map((p) => (
              <div key={p?._id}>
                <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
                  <Link href={`/post/dates/${p?._id}`}>
                    <Image
                      src={p?.image}
                      alt={'loading'}
                      layout="fill"
                      objectFit="cover"
                      className="hover:scale-110 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            ))}

        </div>
      </div>
    </div>
  );
}
