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


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Unauthorized</div>;


  return (
    <div>
      <h1>Welcome {user?.fullName}</h1>
    </div>
  );
};

export default HomePage;
