"use client";
import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaMobile } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import CheckingUser from "@/components/Admin/checkingUser";
import "./style.css";
export default function Profile() {
  const [user, loading, error] = useAuthState(auth);
  const checkingUsers = CheckingUser();
  // const [IsLoading, setLoading] = useState(false);

  if (loading) {
    return <Loading></Loading>;
  }
  if (error) {
    console.log(error.message);
  }
  // console.log(user);
  return (
    <section className="py-16 text-slate-700 pt-[100px]">
      <div className="container mx-auto px-2 ">
        <div className="" id="userProfile">
          <div className="user_profile">
            <div className="profile-header bg-[#fff] text-slate-700 shadow-2xl">
              <div className="profile-img">
                <Image
                  className="mx-auto "
                  width={100}
                  height={100}
                  src={user?.photoURL}
                  alt="loading"
                ></Image>
              </div>
              <div className="profile-nav-info">
                <h3 className="user-name">{user?.displayName}</h3>
                <div className="">
                  <p id="" className="text-base">
                    Location : Unknown
                  </p>
                </div>
              </div>
            </div>

            <div className="main-bd">
              <div className="left-side">
                <div className="profile-side  bg-[#fff] text-slate-700 marker:shadow-2xl">
                  <div className="flex items-center gap-2 w-full">
                    <FaMobile className="text-xl" />

                    <h2 className="text-base capitalize">
                      {user?.phoneNumber ? `${user.phoneNumber}` : `not found`}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 w-full py-2">
                    <MdOutlineEmail className="text-xl " />
                    <h2 className="text-base">{user?.email}</h2>
                  </div>
                  <div className="flex items-center gap-2 w-full pb-2">
                    <h2>Email Verified : </h2>
                    <h2 className="text-base">
                      {user?.emailVerified ? "True" : "False"}
                    </h2>
                  </div>
                  {/* <div className="user-bio">
                    <h3 className="text-start">Bio</h3>
                    <p className="bio text-start">
                      
                     
                    </p>
                  </div> */}
                  {/* <div className="profile-btn">
                    <button className="chatbtn" id="chatBtn">
                      <i className="fa fa-comment"></i> Chat
                    </button>
                    <button className="createbtn" id="Create-post">
                      <i className="fa fa-plus"></i> Create
                    </button>
                  </div> */}
                  {/* <div className="user-rating">
                    <h3 className="rating">4.5</h3>
                    <div className="rate">
                      <div className="star-outer">
                        <div className="star-inner">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                      </div>
                      <span className="no-of-user-rate">
                        <span>123</span>&nbsp;&nbsp;reviews
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="">
                <div className="flex items-center gap-5 pl-5 py-2">
                  <button className="underline block">Saved Card</button>
                  <button>Overview</button>
                </div>
                <div className="pl-10 py-10 ">
                  <h1>শীঘ্রই আসছে </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
