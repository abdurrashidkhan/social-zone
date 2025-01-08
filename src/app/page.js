'use client'
import CheckingUser from "@/components/Admin/checkingUser";
import MainPage from "@/components/MainPage/MainPage";

export default function Home() {
  const checkingUsers = CheckingUser();
  return (
    <>
      <MainPage />
    </>
  );
}