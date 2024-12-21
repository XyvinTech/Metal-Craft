import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyledButton } from "../ui/StyledButton";
import { Link, useNavigate } from "react-router-dom";
import StyledInput from "../ui/StyledInput";
import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff, mdiPhone } from "@mdi/js";
import { getLogin } from "../api/adminapi";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showOTP, setShowOTP] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = {
        email: data.phone,
        password: data.otp,
      };
      const user = await getLogin(formData);
      localStorage.setItem("4ZbQwXtY8uVrN5mP7kL3JhF6", user.data);
      navigate("/dashboard");
    } catch (error) {
      setLoginError(true);
      console.error("Login error", error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("4ZbQwXtY8uVrN5mP7kL3JhF6")) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box sx={{ p: 4, bgcolor: "#FFFFFF", borderRadius: 5, boxShadow: 2 }}>
          <Stack spacing={3} justifyContent="center" alignItems={"center"}>
            <img
              src="https://img.freepik.com/free-photo/gray-smooth-textured-paper-background_53876-101833.jpg"
              alt="Logo"
              style={{ borderRadius: "50%" }}
              width={"89px"}
              height="89px"
            />
          </Stack>

          <Stack
            direction={"column"}
            spacing={2}
            sx={{ marginTop: 5, marginBottom: 3 }}
          >
            <Typography
              fontSize={"40px"}
              align="left"
              color="text.secondary"
              fontWeight={600}
            >
              Sign In
            </Typography>
            <Typography variant="h7" color="text.tertiary" align="left">
              Login to your account to continue the process
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
              <Typography variant="h6" color="text.secondary" align="left">
                Enter Email
              </Typography>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <StyledInput
                    {...field}
                    placeholder="Enter your Email"
                    error={!!errors.phone}
                    helperText={errors.phone ? errors.phone.message : ""}
                  />
                )}
              />

              <Typography variant="h6" color="text.secondary" align="left">
                Enter Password
              </Typography>
              <Controller
                name="otp"
                control={control}
                defaultValue=""
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <StyledInput
                    {...field}
                    placeholder="Enter Password"
                    type={showOTP ? "password" : "text"}
                    endIcon={
                      <Icon
                        path={showOTP ? mdiEyeOff : mdiEye} // Toggle between Eye and EyeOff based on the state
                        size={1}
                        onClick={() => setShowOTP(!showOTP)} // Toggle password visibility
                      />
                    }
                    error={!!errors.otp}
                    helperText={errors.otp ? errors.otp.message : ""}
                  />
                )}
              />

              {loginError && (
                <Typography color="error" variant="body2">
                  Email or Password is Incorrect
                </Typography>
              )}
              <Stack pt={2}>
                <StyledButton name="Sign in" variant="primary" type="submit" />
              </Stack>
            </Stack>
          </form>
          <Grid marginTop={2}>
            <Link
              href="#"
              align="center"
              color="#0072BC"
              style={{
                textDecoration: "none",
                color: "#0072BC",
                fontSize: "14px",
              }}
            >
              Forgot Your Password?
            </Link>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
