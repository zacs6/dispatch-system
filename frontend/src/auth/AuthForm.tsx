import React, { useState } from "react";
import { useNavigate } from "react-router";
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
import classes from "./AuthForm.module.css";

export default function LoginForm() {
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
    } else {
      navigate("/");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Text className={classes.subtitle}>
        {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
        <Anchor
          component="button"
          onClick={() => setAuthMode((prev) => (prev === "login" ? "signup" : "login"))}
        >
          {authMode === "login" ? "Sign up" : "Log in"}
        </Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={handleAuth}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            radius="md"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            radius="md"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl" radius="md">
            {authMode === "login" ? "Log in" : "Sign up"}
          </Button>
        </form>
        {error && (
          <Text c="red" size="sm" mt="sm" ta="center">
            {error}
          </Text>
        )}
      </Paper>
    </Container>
  );
}
