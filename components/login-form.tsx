"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login as mockLogin } from "@/lib/mockAuth";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // First try the provided supabase client (if configured), otherwise use a local mock auth.
      let redirected = false;
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (!error) {
          router.push("/protected");
          redirected = true;
        }
      } catch {}

      if (!redirected) {
        const user = await mockLogin(email, password);
        // route to role specific protected page
        router.push(`/protected/${user.role}`);
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <div className="mt-3">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <div className="font-medium mb-1">Demo accounts</div>
              <div className="grid grid-cols-1 gap-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-foreground/80">student@evalora.com</span>
                  <span className="font-mono ml-3">password</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground/80">teacher@evalora.com</span>
                  <span className="font-mono">password</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground/80">parent@evalora.com</span>
                  <span className="font-mono">password</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground/80">admin@evalora.com</span>
                  <span className="font-mono">password</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
