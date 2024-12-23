"use client";

import { useCurrentUser } from '@/hooks/use-current-user';
import logout from '@/lib/logout';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import {
  DEFAULT_REDIRECT_1,
  DEFAULT_REDIRECT_2
} from "@/routes"

type Role = "admin" | "user" | "guest"; // Adjust roles as per your application
interface User {
  name: string;
  email: string;
}

export default function Dashboard() {
  const fetchedUser: User & { role: Role } = useCurrentUser();
  const [user, setUser] = useState<User & { role: Role } | null>(null); // Accept both User and null
  const router = useRouter();
  // Update local state once the fetched user is available
  useEffect(() => {
    if (fetchedUser) {
      console.log('Fetched user:', fetchedUser); // Log user only once
      setUser(fetchedUser);
    }
  }, [fetchedUser]);

  if (!user) return <p>Loading...</p>; // Fallback UI during loading

  if(user.role === "REGULAR"){
    router.push(DEFAULT_REDIRECT_1);
  }
  if(user.role === "ADMIN"){
    router.push(DEFAULT_REDIRECT_2);
  }

  // return (
  //   <>
  //     <div>
  //       <p>Name: {user.name}</p>
  //       <p>Email: {user.email}</p>
  //       <p>Role: {user.role}</p>
  //     </div>
  //     <button
  //       type="submit"
  //       onClick={async () => {
  //         try {
  //           await logout();
  //           setUser(null); // Reset user state after logout
  //         } catch (error) {
  //           console.error('Error during logout:', error);
  //         }
  //       }}
  //     >
  //       Logout
  //     </button>
  //   </>
  // );
}
