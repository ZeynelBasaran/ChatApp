"use client";
import { useEffect } from "react";
import { useAuth } from "../service/authService";
import { useAuthStore } from "../store/authStore";

const HomePage = () => {
  const { setAuthUser, connectSocket, disconnectSocket } =
    useAuthStore();

  const { authQuery } = useAuth();
  const { data: user, isLoading, isError } = authQuery;

  // Auth geldiyse store'a yaz
  useEffect(() => {
    if (user) {
      setAuthUser(user);
      connectSocket();
    }
  }, [user]);

  // Unmount cleanup
  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, []);


  if (isLoading) return <main className="flex-1 flex flex-col items-center h-full justify-center text-center lg:px-20 md:px-8 px-4  mx-auto  max-w-360 ">
    Loading...</main>;
  if (isError) return <main className="flex-1 flex flex-col items-center h-full justify-center text-center lg:px-20 md:px-8 px-4  mx-auto  max-w-360 ">
    Loading...</main>;


  return (
    <main className="flex-1 flex flex-col items-center h-full justify-center text-center lg:px-20 md:px-8 px-4  mx-auto  max-w-360 ">
      <h1>Welcome {user?.fullName}</h1>
    </main>
  );
};

export default HomePage;
