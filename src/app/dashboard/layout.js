"use client";
import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import CheckAdmin from "@/components/Admin/CheckAdmin";
import CheckingUser from "@/components/Admin/checkingUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import "./style.css";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState(false); // Fixed destructuring issue
  const checkingUsers = CheckingUser(); // Invokes CheckingUser correctly
  const [user, loading, error] = useAuthState(auth);
  const [signOut, outLoading, outError] = useSignOut(auth);

  const dashboardRouting = [
    { path: "/dashboard", name: "Overview" },
    { path: "/dashboard/add-collages", name: "Add Collage" },
    { path: "/dashboard/add-event", name: "Add Event" },
    { path: "/dashboard/manage-events", name: "Manage Events" },
  ];

  useEffect(() => {
    if (user) {
      CheckAdmin(user, signOut);
    }
  }, [user, signOut]);

  if (loading || outLoading) {
    return <Loading />;
  }

  if (error || outError) {
    console.error("Authentication Error:", error || outError);
    return <p>Something went wrong. Please try again later.</p>;
  }

  return (
    <>
      <div className="container mx-auto px-2 pt-[60px] sm:pt-[50px]">
        <div className="flex gap-0 relative">
          {/* Sidebar for larger devices */}
          <aside className="hidden sm:block sm:w-[30%] bg-white h-[100vh] py-5 rounded shadow-2xl drop-shadow-2xl pt-[5%]">
            <ul className="mt-5">
              {dashboardRouting.map(({ path, name }) => (
                <li
                  key={path}
                  className="px-3 py-1 hover:bg-[#3333332f] mx-1 rounded"
                >
                  <Link
                    className={`${pathname === path ? "text-[#e93c25]" : ""
                      } w-full`}
                    href={path}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main content area */}
          <div
            className="w-full bg-[#f7f7f7] text-black p-5 h-[100vh] mt-[2%] sm:mt-0 rounded shadow-2xl text-center sm:text-start pt-10 mb-5 overflow-auto md:relative"
            id="dashboard_content"
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
