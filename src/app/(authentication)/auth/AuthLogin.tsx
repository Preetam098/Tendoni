"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  Alert,
} from "@mui/material";
import Link from "next/link";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { SignInAPI } from "@apis/Auth/index";
import UserData from "@models/UserData";
import { setToken } from "@hooks/Auth/authService";
import { useError } from "@/context/ErrorContext";
import { toast } from "react-toastify";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  inputData: UserData;
  setInputData: React.Dispatch<React.SetStateAction<UserData>>;
}

const AuthLogin = ({
  title,
  subtitle,
  subtext,
  inputData,
  setInputData,
}: loginType) => {
  const { error, setError } = useError();
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password: any): any => {
    // const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{11,}$/;
    // return passwordRegex.test(password);
    return password;
  };

  const handleBlur = (name: string) => {
    if (name === "username") {
      if (!isEmailValid(inputData.username)) {
        setInputData((prevData) => ({
          ...prevData,
          errors: {
            ...prevData.errors,
            username: "Email address is required.",
          },
        }));
      }
    } else if (name === "password") {
      if (!isPasswordValid(inputData.password)) {
        setInputData((prevData) => ({
          ...prevData,
          errors: { ...prevData.errors, password: "Password is required." },
        }));
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let error: string | null = null;

    if (name === "username" && !isEmailValid(value)) {
      error = "Invalid email";
    } else if (name === "password" && !isPasswordValid(value)) {
      error = "Invalid password";
    }

    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
      errors: { ...prevData.errors, [name]: error },
    }));
  };

  const handleLoginSubmit = async () => {
    if (
      !isEmailValid(inputData.username) &&
      !isPasswordValid(inputData.password)
    ) {
      setInputData((prevData) => ({
        ...prevData,
        [inputData.username]: inputData.username,
        [inputData.password]: inputData.password,
        errors: {
          ...prevData.errors,
          ["username"]: "Email address is required.",
          ["password"]: "Password is required.",
        },
      }));
      return;
    } else if (!isEmailValid(inputData.username)) {
      setInputData((prevData) => ({
        ...prevData,
        [inputData.username]: inputData.username,
        errors: {
          ...prevData.errors,
          ["username"]: "Email address is required.",
        },
      }));
      return;
    } else if (!isPasswordValid(inputData.password)) {
      setInputData((prevData) => ({
        ...prevData,
        [inputData.password]: inputData.password,
        errors: { ...prevData.errors, ["password"]: "Password is required." },
      }));
      return;
    } else {
      try {
        setLoading(true);
        const response = await SignInAPI(inputData);
        if (!response.error) {
          setToken(response.data.access_token);
          setLoading(false);

          toast.success(response.message);
          router.push("/");
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField
            variant="outlined"
            fullWidth
            name="username"
            value={inputData.username}
            onChange={handleInputChange}
            onBlur={() => handleBlur("username")}
            error={Boolean(inputData.errors.username)}
            helperText={inputData.errors.username}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            type="password"
            variant="outlined"
            name="password"
            value={inputData.password}
            onChange={handleInputChange}
            onBlur={() => handleBlur("password")}
            error={Boolean(inputData.errors.password)}
            helperText={inputData.errors.password}
            fullWidth
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>{alertMessage ? <Alert>{alertMessage}</Alert> : ""}</Box>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          onClick={handleLoginSubmit}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Sign In"}
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
