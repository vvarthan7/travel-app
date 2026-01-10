"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Header from "@/components/header";
import Banner from "@/components/banner";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const createUserEntry = async (session) => {
      const { data: user } = await supabase.auth.getUser();
      if (user.user) {
        const fullName = user.user.user_metadata?.name || user.user.email;
        const nameParts = fullName.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        const { error } = await supabase.from("users").upsert({
          id: user.user.id,
          email: user.user.email,
          first_name: firstName,
          last_name: lastName,
          role: "user",
          access_token: session.access_token,
          itinerary_created: 0,
        });
        if (error) {
          console.error("Error creating user entry:", error);
        } else {
          localStorage.setItem("loginTime", Date.now().toString());
        }
      }
    };

    const checkSessionExpiry = async () => {
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime) {
        const elapsed = Date.now() - parseInt(loginTime);
        if (elapsed > 30 * 1000) {
          supabase.auth.signOut();
          localStorage.removeItem("loginTime");
          router.push("/");
          return;
        }
      }
    };

    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && !localStorage.getItem("loginTime")) {
        await createUserEntry(session);
      }
      await checkSessionExpiry();
      window.history.replaceState(null, null, window.location.pathname);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (
        (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") &&
        session &&
        !localStorage.getItem("loginTime")
      ) {
        await createUserEntry(session);
      }
      await checkSessionExpiry();
    });

    const interval = setInterval(checkSessionExpiry, 10000);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Header />
      <Banner />
    </>
  );
}
