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
    <div className="min-h-screen relative flex items-center justify-center">
      <Image
        src="/assets/login-bg.webp"
        alt="Login background"
        fill
        style={{ objectFit: "fill" }}
      />
      <Card className="w-full max-w-md mx-4 z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Tourvisto</CardTitle>
          <p className="text-lg text-muted-foreground">
            Start Your Travel Journey
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Sign in with Google to explore AI-generated itineraries, trending
            destinations, and much more
          </p>
          <form action={handleSignIn}>
            <Button className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white">
              Sign in with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
