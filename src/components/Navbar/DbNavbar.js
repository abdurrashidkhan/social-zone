"use client";
import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { FiUser } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";

export default function DbNavbar() {
  const pathname = usePathname();
  const [user, loading, error] = useAuthState(auth);
  const [signOut, outLoading, OutError] = useSignOut(auth);
  const [openMenu, setOpenMenu] = useState(false);

  const dashboardRouting = [
    { path: "/dashboard", name: "Overview" },
    { path: "/dashboard/add-collages", name: "Add Collage" },
    { path: "/dashboard/add-event", name: "Add Event" },
    { path: "/dashboard/manage-events", name: "Manage Events" },
  ];

  const userLogOut = async () => {
    await signOut();
    Swal.fire({
      title: "Logout success",
      icon: "success",
    });
  };
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
    <div>
      {/* Mobile Menu */}
      {openMenu && (
        <aside className="fixed sm:hidden w-[70%] bg-[#fff] h-full py-5 ease-in-out duration-700 top-0 left-0 z-[999]">
          <div className="absolute text-red-700" id="dashboard_close_icon">
            <IoClose
              className="sm:hidden text-3xl"
              onClick={() => setOpenMenu(false)}
            />
          </div>
          <ul className="p-4" id="dashboard_mobile_items">
            {dashboardRouting.map(({ path, name }) => (
              <li
                key={path}
                className="px-3 py-1 hover:bg-gray-100 mx-1 rounded"
              >
                <Link
                  className={`${pathname === path ? "text-[#e93c25]" : ""} w-full`}
                  href={path}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Small Screen Navbar */}
      <div className="navbar bg-[#ffffffea] fixed z-[3] text-[#000] drop-shadow-2xl sm:hidden">
        <div className="navbar-start" onClick={() => setOpenMenu(true)}>
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
        </div>
        <div className="navbar-center">
          <Link href="/" className="btn btn-ghost text-xl">
            <strong className="text-4xl">7</strong>College
          </Link>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="rounded-full mx-auto ">
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
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded z-[1] mt-3 w-52 p-2 shadow bg-[#2e2d26e1] text-slate-800"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={() => userLogOut()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Large Screen Navbar */}
      <div className="hidden sm:block">
        <div className="navbar bg-[#ffffffea] fixed z-[3] text-[#000] drop-shadow-2xl">
          <div className="container mx-auto flex items-center justify-between">
            <div className="text-xl">
              <Link href="/" className="btn btn-ghost text-xl">
                <strong className="text-4xl">7</strong>College
              </Link>
            </div>
            <div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="rounded-full mx-auto ">
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
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded z-[1] mt-3 w-52 p-2 shadow bg-[#2e2d26e1] text-slate-800"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <button onClick={() => userLogOut()}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
