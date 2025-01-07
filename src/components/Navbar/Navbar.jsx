"use client";
import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import Link from "next/link";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { FiUser } from "react-icons/fi";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";

export default function Navbar() {
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
  // routing
  const routing = [
    { path: "/", name: "Home" },
    { path: "/colleges", name: "Colleges" },
    { path: "/admission", name: "Admission " },
    { path: "/events", name: "Events" },
    { path: "/my-college", name: "My College" },
  ];

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
    <nav className="navbar bg-[#fff]   border-b border-[#603bf65e] shadow-2xl fixed z-[9999] py-0">
      <div className="container mx-auto px-2">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
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
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-100 text-slate-800 rounded-box w-52"
              >
                {routing.map(({ path, name }) => (
                  <li key={path} className="px-3 py-1">
                    <Link
                      className={`${
                        pathname === path
                          ? "text-[#20b820] font-medium"
                          : "text-slate-800 font-medium"
                      } focus:text-[#20b820] text-base`}
                      href={path}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/" className="btn btn-ghost text-xl">
              <strong className="text-4xl">7</strong>College
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {routing.map(({ path, name }) => (
                <li key={path} className="px-3 py-1">
                  <Link
                    className={`${
                      pathname === path
                        ? "text-[#20b820] font-medium"
                        : "text-slate-800 font-medium"
                    } focus:text-[#20b820] text-base`}
                    href={path}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="navbar-end">
            {/* <div className="">
              <DarkMode></DarkMode>
            </div> */}

            {/* <div className="dropdown dropdown-end z-[1111]">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator ">
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className=" z-[1] card card-compact dropdown-content w-52 bg-[#fff] dark:bg-[#101C2C] dark:text-[fff] shadow-2xl rounded border-[1px] dark:border-[#0e105c71]"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="dropdown dropdown-end z-[1111]">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar "
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2  bg-[#fff] shadow-2xl rounded   w-52"
              >
                <li>
                  <Link
                    href={`/user/profile`}
                    className="justify-between hover:text-blue-500"
                  >
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/overview`} className="hover:text-blue-500">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link href={`/dashboard`} className="hover:text-blue-500">
                    Dashboard
                  </Link>
                </li>
                <li>
                  {user ? (
                    <button
                      onClick={() => userLogOut()}
                      className="hover:text-blue-500"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link href={"/authentication/login"}>Login Here</Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
