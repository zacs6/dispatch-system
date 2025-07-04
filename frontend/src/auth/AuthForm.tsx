import React, { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../utils/supabase";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    let result;

    if (authMode === "login") {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    if (result.error) {
      setError(result.error?.message);
      return;
    }

    const userId = result.data.user?.id;

    if (userId) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        first_name: "TBD",
        last_name: "TBD",
        callsign: "TBD",
        department: "TBD",
        status: "10-7",
        role: "Officer",
        is_approved: false,
      });

      if (profileError) {
        setError(profileError?.message);
        return;
      }
    }

    navigate("/");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>
            {authMode === "login" ? "Login to your account" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {authMode === "login"
              ? "Enter your email below to login to your account"
              : "Enter your email below to create an account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="me@dispatch.dev"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#" // TODO: Forgot password functionality
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {authMode === "login" ? "Forgot your password?" : ""}
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {authMode === "login" ? "Login" : "Sign up"}
                </Button>
                {error && <h1 className="text-red-700">{error}</h1>}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              {authMode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <a
                onClick={() => setAuthMode((prev) => (prev === "login" ? "signup" : "login"))}
                className="underline underline-offset-4 cursor-pointer"
              >
                {authMode === "login" ? "Sign up" : "Log in"}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
