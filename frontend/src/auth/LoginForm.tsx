import { useState } from "react";
import supabase from "../../utils/supabase";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErorr] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErorr(error.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ width: 300, mx: "auto" }}>
      <Stack spacing={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button type="submit" variant="contained" fullWidth>
          Log In
        </Button>

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
