import { auth } from "@/app/firebase.init";
import Loading from "@/app/loading";
import userInfoInsert from "@/database/userInfoInsert/userInfoInsert";
import { useSignInWithFacebook } from "react-firebase-hooks/auth";
export default function LoginWithFb() {
  const [signInWithFacebook, user, loading, error] =
    useSignInWithFacebook(auth);
  // facebook user login after data save database
  const fbLogin = async () => {
    await signInWithFacebook();
  };
  const userInfo = {
    displayName: user?.user?.displayName,
    email: user?.user?.email,
    uid: user?.user?.uid,
    emailVerified: user?.user?.emailVerified,
    photoURL: user?.user?.photoURL,
    accessToken: user?.user?.accessToken,
  };
  console.log(userInfo);
  if (user) {
    userInfoInsert(userInfo);
  }
  if (loading) {
    return <Loading></Loading>;
  }
  let errorElement = "";
  if (error) {
    errorElement = <p className="text-danger">Error: {error?.message}</p>;
  }

  return (
    // <button onClick={() => fbLogin()}>
    <button onClick={() => fbLogin()} className="">
      <div className="text-center ">
        {/* <Image
          className="mx-auto w-[30px] h-auto"
          loading="lazy"
          // placeholder="blur"
          src={facebookLogo}
          width={"100%"}
          height={"auto"}
          alt="Loading...."
        /> */}
        <h2>Log in with Facebook</h2>
      </div>
    </button>
  );
}
