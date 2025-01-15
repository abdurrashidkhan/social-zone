import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import userInfoInsert from "@/database/userInfoInsert/userInfoInsert";
import Image from "next/image";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import googleLogo from "../../../images/googleLogo.png";

export default function LoginWithGoogle() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const googleLogin = async () => {
    await signInWithGoogle();
  };
  const userInfo = {
    displayName: user?.user?.displayName,
    userNumber: user?.user?.phoneNumber || null,
    email: user?.user?.email,
    emailVerified: user?.user?.emailVerified,
    photoURL: user?.user?.photoURL,
    accessToken: user?.user?.accessToken,
  };
  if (user) {
    userInfoInsert(userInfo);
    console.log(userInfo);
  }
  if (loading) {
    return <Loading></Loading>;
  }
  let errorElement = "";
  if (error) {
    errorElement = <p className="text-danger">Error: {error?.message}</p>;
  }
  return (
    <div className="w-full bg-slate-200 text-white py-2 rounded-md font-medium mb-4 hover:bg-slate-300 transition-all text-center flex items-start justify-center gap-5">
      <button
        className="w-full h-auto mt-2 flex items-center justify-center"
        onClick={() => googleLogin()}
      >
        <Image
          className="w-[30px] h-auto"
          loading="lazy"
          src={googleLogo}
          alt="Loading...."
        />
      </button>
    </div>
  );
}
