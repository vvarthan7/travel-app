import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Login() {
  const handleSignIn = async () => {
    "use server";
    redirect("/home"); // Redirect to landing
  };
  return (
    <div className="auth flex items-center justify-center">
      <Card className="sign-in-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Image
              src="/assets/icons/logo.svg"
              alt="logo"
              width={30}
              height={30}
            />{" "}
            <h1 className="p-28-bold text-dark-100">Tourvisto</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <article>
            <h2 className="p-28-semibold text-dark-100 text-center">
              Start Your Travel Journey
            </h2>
            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Sign in with Google to explore AI-generated itineraries, trending
              destinations, and much more
            </p>
          </article>
          <form action={handleSignIn}>
            <Button className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white">
              <Image
                src="/assets/icons/google.svg"
                width={20}
                height={20}
                alt="google"
              />
              Sign in with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
