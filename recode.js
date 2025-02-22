// // "use client";

// // import { auth } from "@/app/firebase.init";
// // import Loading from "@/app/loading";
// // import findOneUser from "@/database/find/allUsers/findOneUser";
// // import findAllPosts from "@/database/find/findAllPosts/findAllPosts";
// // import countReact from "@/database/insert/countReact";
// // import { formatDistanceToNow } from "date-fns";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { useEffect, useState } from "react";
// // import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
// // import { CiShare1 } from "react-icons/ci";
// // import { FaComment } from "react-icons/fa";
// // import { FaHeart, FaRegHeart } from "react-icons/fa6";
// // import { FiUser } from "react-icons/fi";
// // import { IoMdNotificationsOutline } from "react-icons/io";
// // import Swal from "sweetalert2";

// // // Profile Avatar component
// // const ProfileAvatar = ({ src, alt, size = 30 }) => (
// //   <div className="rounded-full border bg-[#ebe7e7] ease-in-out duration-500">
// //     {src ? (
// //       <Image
// //         alt={alt}
// //         src={src}
// //         width={500}
// //         height={500}
// //         className="object-cover w-10 h-10 rounded-full object-center"
// //       />
// //     ) : (
// //       <div className="text-[30px] text-center p-2">
// //         <FiUser />
// //       </div>
// //     )}
// //   </div>
// // );

// // export default function MainContent() {
// //   const [user, loading, error] = useAuthState(auth);
// //   const [signOut, outLoading, outError] = useSignOut(auth);
// //   const [IsLoading, setIsLoading] = useState(false);
// //   // Data states
// //   const [allContent, setAllContent] = useState([]);
// //   const [userDetails, setUserDetails] = useState({});
// //   const [reactCount, setReactCount] = useState(0);
// //   const [userInfo, setUserInfo] = useState({});
// //   const [postUserInfo, setPostUserInfo] = useState({});
// //   console.log(userDetails);
// //   // const [postInfo, setPostInfo] = useState("677d15ead9b4354571ed1474");

// //   // Frontend function to handle the react (like) functionality
// //   const reactCounter = async (id, email) => {
// //     try {
// //       // Fetch react count for the user
// //       const response = await countReact(id, email);

// //       if (response.success) {
// //         console.log("Post liked successfully:", response);
// //         // You can update the react count or other UI elements as necessary
// //         // setReactCount(response.updatedCount); // If you need to update the UI with the new count
// //       } else {
// //         console.log("Failed to like the post:", response.message);
// //       }
// //     } catch (error) {
// //       console.error("Error in reactCounter:", error);
// //     }
// //   };

// //   // Fetch posts and user details
// //   const contentLoad = async (email) => {
// //     try {
// //       setIsLoading(true);

// //       // Fetch all posts
// //       const { allPost } = await findAllPosts(email);
// //       setAllContent(allPost || []); // Ensure posts are set correctly

// //       // Extract unique emails from posts
// //       const emails = [...new Set(allPost.map((post) => post.email))];

// //       // Fetch user details for each email
// //       const userFetchPromises = emails.map((email) => findOneUser(email));
// //       const userResults = await Promise.all(userFetchPromises);

// //       // Map emails to user details
// //       const userMap = {};
// //       userResults.forEach((result) => {
// //         if (result) {
// //           console.log(result?.email);
// //           userMap[result.email] = result;
// //         }
// //       });
// //       console.log(userMap);
// //       setUserDetails(userMap);
// //     } catch (err) {
// //       console.error("Error fetching data:", err);
// //       setAllContent([]);
// //       setUserDetails({});
// //       setReactCount(0);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // user info load for post
// //   const postUserLoad = async (email) => {
// //     // Fetch current user's information
// //     const { allUserInfo } = await findOneUser(email);
// //     setUserInfo(allUserInfo || {});
// //   };
// //   // console.log(postUserInfo);
// //   useEffect(() => {
// //     if (user?.email) {
// //       contentLoad(user.email);
// //       postUserLoad(user.email);
// //     }
// //   }, [user?.email]);

// //   // React for post
// //   const [isLiked, setIsLiked] = useState(false);

// //   const toggleLike = () => {
// //     setIsLiked(!isLiked);
// //     setReactCount(isLiked ? reactCount - 1 : reactCount + 1);
// //   };

// //   const userLogOut = async () => {
// //     await signOut();
// //     Swal.fire({
// //       title: "Logout success",
// //       icon: "success",
// //     });
// //   };

// //   if (loading || outLoading || IsLoading) {
// //     return <Loading />;
// //   }

// //   // Error Handling
// //   if (error || outError) {
// //     const errorMessage =
// //       error?.message || outError?.message || "An unknown error occurred";
// //     return (
// //       <div className="p-4 text-red-500">
// //         <p>Error: {errorMessage}</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-gray-50 min-h-screen">
// //       {/* Top Navigation */}
// //       <nav className="flex items-center justify-between px-4 py-2 border-b bg-stext-slate-800 shadow-sm">
// //         <div className="text-2xl font-bold text-gray-900">Instagram</div>
// //         <div className="flex items-center space-x-4">
// //           <input
// //             type="text"
// //             placeholder="Search"
// //             className="bg-gray-200 rounded-lg px-4 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-300"
// //           />
// //           <div className="flex space-x-2">
// //             <div className="avatar ">
// //               <div className="border rounded-full pt-2 px-[10px] mx-auto hover:bg-[#ebe7e7] ease-in-out duration-500">
// //                 <IoMdNotificationsOutline className="text-[25px] text-center" />
// //               </div>
// //             </div>
// //             <Link href={"/profile"}>
// //               <ProfileAvatar src={userInfo?.photoURL} alt="User Avatar" />
// //             </Link>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Main Content */}
// //       <div className="flex">
// //         {/* Left Sidebar */}

// //         {/* Feed */}
// //         <main className="flex-grow p-4">
// //           <div className="bg-stext-slate-800 rounded-lg shadow-sm p-4">
// //             {/* Post Feed */}
// //             {allContent.map((post) => {
// //               // Ensure user data for the current post is available
// //               const userData = userDetails[post.email];
// //               console.log(userData);
// //               // Fallback to default values if user data is not available yet
// //               const userName = userData?.displayName || "Anonymous";
// //               const userPhoto = userData?.photoURL || "/default-avatar.jpg"; // Default avatar if not available

// //               const postDate = post.date ? new Date(post.date) : new Date();
// //               const timeAgo = formatDistanceToNow(postDate, {
// //                 addSuffix: true,
// //               });

// //               return (
// //                 <div
// //                   key={post?._id}
// //                   className="mt-4 w-full sm:w-[70%] mx-auto bg-[#fff] rounded-lg overflow-hidden shadow-2xl"
// //                 >
// //                   <div className="flex items-center px-4 py-2 border-b border-gray-200">
// //                     <div className="h-10 w-10 rounded-full flex items-center justify-center">
// //                       {/* User Avatar */}
// //                       <ProfileAvatar src={userPhoto} alt={userName} />
// //                     </div>
// //                     <div className="ml-3">
// //                       <p className="text-slate-800 font-medium capitalize">
// //                         {userName}
// //                       </p>
// //                       <p className="text-gray-400 text-sm">{timeAgo}</p>
// //                     </div>
// //                     <div className="ml-auto text-slate-800 text-lg">⋮</div>
// //                   </div>

// //                   {/* Post Image */}
// //                   <div className="relative w-full h-[500px]">
// //                     <Image
// //                       src={post?.image || "/default.jpg"} // Ensure there's a fallback image
// //                       alt="Post Image"
// //                       fill
// //                       className="object-cover w-full h-auto rounded"
// //                     />
// //                   </div>

// //                   {/* Post Footer */}
// //                   <div className="px-4 py-3">
// //                     <div className="text-slate-800">
// //                       <span className="font-bold capitalize">{userName}</span>{" "}
// //                       {post?.caption}
// //                     </div>
// //                     <p className="text-gray-500 text-sm mt-1">
// //                       {post?.react} likes
// //                     </p>

// //                     {/* Interaction Buttons */}
// //                     <div className="flex justify-between items-center mt-3">
// //                       <div className="flex items-center space-x-4">
// //                         <button
// //                           className="text-slate-800 text-xl"
// //                           onClick={toggleLike}
// //                         >
// //                           {isLiked ? (
// //                             <FaHeart className="text-red-500" />
// //                           ) : (
// //                             <FaRegHeart
// //                               onClick={() =>
// //                                 reactCounter(post?._id, user?.email)
// //                               }
// //                             />
// //                           )}
// //                         </button>
// //                         <button className="text-slate-800 text-xl">
// //                           <FaComment />
// //                         </button>
// //                         <button className="text-slate-900 text-xl">
// //                           <CiShare1 />
// //                         </button>
// //                       </div>
// //                       <span className="text-gray-400 text-sm">{timeAgo}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </main>

// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { auth } from "@/app/firebase.init";
// import Loading from "@/app/loading";
// import findOneUser from "@/database/find/allUsers/findOneUser";
// import findAllPosts from "@/database/find/findAllPosts/findAllPosts";
// import countReact from "@/database/insert/countReact";
// import { formatDistanceToNow } from "date-fns";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
// import { CiShare1 } from "react-icons/ci";
// import { FaComment } from "react-icons/fa";
// import { FaRegHeart } from "react-icons/fa6";
// import { FiUser } from "react-icons/fi";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import Swal from "sweetalert2";

// // Profile Avatar component
// const ProfileAvatar = ({ src, alt }) => (
//   <div className="rounded-full border bg-[#ebe7e7] ease-in-out duration-500">
//     {src ? (
//       <Image
//         alt={alt}
//         src={src}
//         width={500}
//         height={500}
//         className="object-cover w-10 h-10 rounded-full object-center"
//       />
//     ) : (
//       <div className="text-[30px] text-center p-2">
//         <FiUser />
//       </div>
//     )}
//   </div>
// );

// export default function MainContent() {
//   const [user, loading, error] = useAuthState(auth);
//   const [signOut, outLoading, outError] = useSignOut(auth);
//   const [IsLoading, setIsLoading] = useState(false);

//   // Data states
//   const [allContent, setAllContent] = useState([]);
//   const [userDetails, setUserDetails] = useState({});
//   const [reactCount, setReactCount] = useState(0);

//   // Function to fetch react count
//   const reactCounter = async (id, email) => {
//     try {
//       const response = await countReact(id, email);
//       if (response.success) {
//         // console.log("Post liked successfully:", response);
//       } else {
//         // console.log("Failed to like the post:", response.message);
//       }
//     } catch (error) {
//       console.error("Error in reactCounter:", error);
//     }
//   };

//   // Function to fetch posts and user details
//   const contentLoad = async (email) => {
//     try {
//       setIsLoading(true);

//       // Fetch all posts
//       const { allPost } = await findAllPosts(email);
//       setAllContent(allPost || []);

//       // Extract unique emails from posts
//       const emails = [...new Set(allPost.map((post) => post.email))];

//       // Fetch user details for each email
//       const userFetchPromises = emails.map((email) => findOneUser(email));
//       const userResults = await Promise.all(userFetchPromises);

//       // Map emails to user details
//       const userMap = {};
//       userResults.forEach((result) => {
//         if (result?.allUserInfo) {
//           userMap[result.allUserInfo.email] = result.allUserInfo;
//         }
//       });
//       setUserDetails(userMap);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setAllContent([]);
//       setUserDetails({});
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user?.email) {
//       contentLoad(user.email);
//     }
//   }, [user?.email]);

//   const userLogOut = async () => {
//     await signOut();
//     Swal.fire({
//       title: "Logout success",
//       icon: "success",
//     });
//   };

//   if (loading || outLoading || IsLoading) {
//     return <Loading />;
//   }

//   // Error Handling
//   if (error || outError) {
//     const errorMessage =
//       error?.message || outError?.message || "An unknown error occurred";
//     return (
//       <div className="p-4 text-red-500">
//         <p>Error: {errorMessage}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Top Navigation */}
//       <nav className="flex items-center justify-between px-4 py-2 border-b bg-stext-slate-800 shadow-sm">
//         <div className="text-2xl font-bold text-gray-900">Instagram</div>
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             placeholder="Search"
//             className="bg-gray-200 rounded-lg px-4 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-300"
//           />
//           <div className="flex space-x-2">
//             <div className="avatar ">
//               <div className="border rounded-full pt-2 px-[10px] mx-auto hover:bg-[#ebe7e7] ease-in-out duration-500">
//                 <IoMdNotificationsOutline className="text-[25px] text-center" />
//               </div>
//             </div>
//             <Link href={"/profile"}>
//               <ProfileAvatar
//                 src={userDetails[user?.email]?.photoURL}
//                 alt="User Avatar"
//               />
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="flex">
//         {/* left slider */}
//         <aside className="hidden md:block w-1/5 border-r p-4">
//           <ul className="space-y-2">
//             <li className="text-lg font-medium">Home</li>
//             <li className="text-gray-700">Explore</li>
//             <li className="text-gray-700">Messages</li>
//           </ul>
//         </aside>
//         {/* Feed */}
//         <main className="flex-grow sm:p-4">
//           <div className="bg-stext-slate-800 rounded-lg shadow-sm p-4">
//             {allContent.map((post) => {
//               const userData = userDetails[post.email];
//               const userName = userData?.displayName || "Anonymous";
//               const userPhoto = userData?.photoURL || "/default-avatar.jpg";

//               const postDate = post.date ? new Date(post.date) : new Date();
//               const timeAgo = formatDistanceToNow(postDate, {
//                 addSuffix: true,
//               });

//               return (
//                 <div
//                   key={post?._id}
//                   className="mt-4 w-full sm:w-[70%] mx-auto bg-[#fff] rounded-lg overflow-hidden shadow-2xl"
//                 >
//                   <div className="flex items-center px-4 py-2 border-b border-gray-200">
//                     <ProfileAvatar src={userPhoto} alt={userName} />
//                     <div className="ml-3">
//                       <p className="text-slate-800 font-medium capitalize">
//                         {userName}
//                       </p>
//                       <p className="text-gray-400 text-sm">{timeAgo}</p>
//                     </div>
//                     <div className="ml-auto text-slate-800 text-lg">⋮</div>
//                   </div>

//                   <div className="relative w-full h-[500px]">
//                     <Image
//                       src={post?.image || "/default.jpg"}
//                       alt="Post Image"
//                       fill
//                       className="object-cover w-full h-auto rounded"
//                     />
//                   </div>

//                   <div className="px-4 py-3">
//                     <div className="text-slate-800">
//                       <span className="font-bold capitalize">{userName}</span>{" "}
//                       {post?.caption}
//                     </div>
//                     <p className="text-gray-500 text-sm mt-1">
//                       {post?.react} likes
//                     </p>

//                     <div className="flex justify-between items-center mt-3">
//                       <button
//                         className="text-slate-800 text-xl"
//                         onClick={() => reactCounter(post?._id, user?.email)}
//                       >
//                         <FaRegHeart />
//                       </button>
//                       <button className="text-slate-800 text-xl">
//                         <FaComment />
//                       </button>
//                       <button className="text-slate-900 text-xl">
//                         <CiShare1 />
//                       </button>
//                       <span className="text-gray-400 text-sm">{timeAgo}</span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </main>
//         {/* Right Sidebar */}
//         <aside className="hidden lg:block w-1/5 border-l p-4">
//           <h3 className="font-bold text-gray-800">Suggestions for you</h3>
//           <ul className="mt-4 space-y-2">
//             {["monalisa11934", "shopnil_ehsan", "sharif_hujaifa"].map(
//               (user, index) => (
//                 <li
//                   key={index}
//                   className="flex items-center justify-between text-sm"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <Image
//                       src={`/suggestion-avatar-${index + 1}.jpg`}
//                       alt={user}
//                       width={32}
//                       height={32}
//                       className="rounded-full"
//                     />
//                     <p>{user}</p>
//                   </div>
//                   <button className="text-blue-500 font-medium">Follow</button>
//                 </li>
//               )
//             )}
//           </ul>
//         </aside>
//       </div>
//     </div>
//   );
// }
