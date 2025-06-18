import { useState } from "react";
import supabase from "../../utils/supabase";

import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./LoginForm.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Text className={classes.subtitle}>
        Do not have an account yet? <Anchor>Create account</Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={handleLogin}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            radius="md"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            radius="md"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl" radius="md">
            Sign in
          </Button>
        </form>
        {error && (
          <Text c="red" size="sm" mt="sm" ta="center">
            {error}
          </Text>
        )}
      </Paper>
    </Container>

    // <div className={cn("flex flex-col gap-6", className)} {...props}>
    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Login to your account</CardTitle>
    //       <CardDescription>Enter your email below to login to your account</CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <form onSubmit={handleLogin}>
    //         <div className="flex flex-col gap-6">
    //           <div className="grid gap-3">
    //             <Label htmlFor="email">Email</Label>
    //             <Input
    //               id="email"
    //               type="email"
    //               placeholder="m@example.com"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               required
    //             />
    //           </div>
    //           <div className="grid gap-3">
    //             <div className="flex items-center">
    //               <Label htmlFor="password">Password</Label>
    //               <a
    //                 href="#"
    //                 className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
    //               >
    //                 Forgot your password?
    //               </a>
    //             </div>
    //             <Input
    //               id="password"
    //               type="password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               required
    //             />
    //           </div>
    //           <div className="flex flex-col gap-3">
    //             <Button type="submit" className="w-full">
    //               Login
    //             </Button>
    //           </div>
    //         </div>
    //         <div className="mt-4 text-center text-sm">
    //           Don&apos;t have an account?{" "}
    //           <a href="#" className="underline underline-offset-4">
    //             Sign up
    //           </a>
    //         </div>
    //       </form>
    //     </CardContent>
    //     {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    //   </Card>
    // </div>
  );
}
