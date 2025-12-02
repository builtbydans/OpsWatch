"use client";

import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupForm({ className, ...props }) {
  const router = useRouter();
  const supabase = createClient();

  async function handleSignup(e) {
    e.preventDefault();

    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name, last_name }, // goes into raw_user_meta_data + your trigger fills profiles
      },
    });

    if (error) {
      console.error(error.message);
      return;
    }

    console.log("Supabase signup result:", { data, error });

    router.push("/"); // go to dashboard
    router.refresh(); // refresh session
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSignup} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-balance">
                  Sign up to access your OpsWatch dashboard
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="full_name">First Name</FieldLabel>
                <Input
                  id="first_name"
                  type="text"
                  placeholder="John"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Deliveroo"
                  required
                />
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" required />
              </Field>

              <Field>
                <Button type="submit" className="cursor-pointer">
                  Sign Up
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or sign up with
              </FieldSeparator>

              <FieldDescription className="text-center">
                Already have an account?{" "}
                <a href="/login" className="underline">
                  Login
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* Right Side Image */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="/login-form-bg.jpg"
              alt="signup image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.4]"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By signing up, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
