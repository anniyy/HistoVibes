"use client";
import Image from "next/image";
import Sidebar from "@/components/sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  useEffect(() => {
    console.log(user);
  }, [user]);
  if (!user && !isLoading) {
    router.push("/api/auth/login");
    return null;
  }

  return (
    user && (
      <main className="">
        <Sidebar />
      </main>
    )
  );
}
