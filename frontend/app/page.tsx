"use client";
import Image from "next/image";
import Sidebar from "@/components/sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Timeline from "./timeline/page";
import NewTimeline from "./newTimeline/page";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const axios = require("axios");
  const [timeLine, settimeLine] = useState("");
  const [timeLineList, setTimeLineList] = useState<string[]>([]);
  useEffect(() => {
    console.log(user);
  }, [user]);
  useEffect(() => {
    console.log(timeLine);
  }, [timeLine]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const requestBody = {
            username: user.nickname,
          };
          const postResponse = await axios.post(
            `http://18.225.6.18:5000/user`,
            { username: user.nickname }
          );
          console.log("POST response:", postResponse.data);
          await setTimeLineList(Object.keys(postResponse.data));
        }
      } catch (error) {
        console.error("Error making API call:", error.message);
      }
    };
    fetchData(); // Call the function to fetch data when the component mounts or when the user changes
  }, [user]);
  const handleTimelineNameChange = (newTimelineName: string) => {
    settimeLine(newTimelineName);
  };
  if (!user && !isLoading) {
    router.push("/api/auth/login");
    return null;
  }

  return (
    user && (
      <main className="overflow-hidden">
        <Sidebar
          setTimeline={handleTimelineNameChange}
          names={timeLineList}
          userid={user.nickname}
          setTimeLineList={setTimeLineList}
        />
        <NewTimeline
          name={timeLine}
          userid={user.nickname}
          setName={handleTimelineNameChange}
        />
        {/* <Timeline name={timeLine} userid={user.nickname} /> */}
      </main>
    )
  );
}
