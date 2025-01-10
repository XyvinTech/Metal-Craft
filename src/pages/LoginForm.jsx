import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyledButton } from "../ui/StyledButton";
import { Link, useNavigate } from "react-router-dom";
import StyledInput from "../ui/StyledInput";
import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff, mdiPhone } from "@mdi/js";
import { getLogin } from "../api/adminapi";

import login from "../assets/images/login.png";
import bg from "../assets/images/bg.png";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showOTP, setShowOTP] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = {
        email: data.phone,
        password: data.otp,
      };
      const user = await getLogin(formData);
      localStorage.setItem("4ZbQwXtY8uVrN5mP7kL3JhD6", user.data.token);
      localStorage.setItem("superAdmin", user.data.superAdmin);
      if (user.data.superAdmin === true) {
        navigate("/dashboard");
      } else {
        navigate("/project");
      }
    } catch (error) {
      setLoginError(true);
      console.error("Login error", error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("4ZbQwXtY8uVrN5mP7kL3JhD6")) {
      if (localStorage.getItem("superAdmin") === "true") {
        navigate("/dashboard");
      } else {
        navigate("/project");
      }
    }
  }, []);

  return (
    <Grid container height="100vh">
      <Grid
        item
        lg={7}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          background: "linear-gradient(45deg,#042F61, #0860C7)",
          height: "100%",
        }}
      >
        {" "}
        <img src={bg} alt="Logo" width={"611px"} height="554px" />
      </Grid>
      <Grid item lg={5} display={"flex"} justifyContent={"center"}>
        <Box
          sx={{
            p: 4,
            bgcolor: "#FFFFFF",
            borderRadius: 5,
            // justifyContent: "flex-start",
          }}
        >
          <Stack spacing={3} justifyContent="center" alignItems={"center"}>
            <img src={login} alt="Logo" width={"247px"} height="100px" />
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
                        path={showOTP ? mdiEyeOff : mdiEye}
                        size={1}
                        onClick={() => setShowOTP(!showOTP)}
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
              <Box pt={2} display={"flex"} justifyContent={"flex-end"}>
                <StyledButton name="Sign in" variant="primary" type="submit" />
              </Box>
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
                fontSize: "12px",
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
