import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyledButton } from "../ui/StyledButton";
import { Link, useNavigate } from "react-router-dom";
import StyledInput from "../ui/StyledInput";
import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff, mdiPhone } from "@mdi/js";
import { changePassword, forgotPassword, getLogin } from "../api/adminapi";

import login from "../assets/images/login.png";
import bg from "../assets/images/bg.png";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showOTP, setShowOTP] = useState(true);
  const [showPass, setShowPass] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [resetPass, setResetPass] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = {
        email: data.phone,
        password: data.otp,
      };
      const user = await getLogin(formData);
      reset();
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
  const forgotSubmit = async (data) => {
    try {
      const formData = {
        email: data?.email,
      };
      setEmail(data?.email);
      await forgotPassword(formData);
      // reset();
      setForgot(false);
      setResetPass(true);
    } catch (error) {
      console.error("Login error", error);
    }
  };
  const resetSubmit = async (data) => {
    try {
      const formData = {
        otp: data?.emailOtp,
        password: data?.password,
        email: email,
      };
      await changePassword(formData);
      setEmail("");
      reset();
      setResetPass(false);
    } catch (error) {
      console.error("Login error", error);
    }
  };
  // console.log("forgot", forgot);

  return (
    <Grid container height="100vh">
      <Grid
        item
        lg={7}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          background: "linear-gradient(45deg,#042F61, #0860C7)",
          height: "100%",
          display: { xs: "none", md: "flex" },
        }}
      >
        {" "}
        <Box
          component="img"
          src={bg}
          alt="Logo"
          sx={{
            width: { xs: "300px", sm: "400px", md: "500px", lg: "611px" },
            height: { xs: "250px", sm: "350px", md: "450px", lg: "554px" },
            objectFit: "cover",
          }}
        />
      </Grid>
      <Grid
        item
        lg={5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
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
          {!forgot && !resetPass && (
            <>
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
                  <Box pt={2} display={"flex"} justifyContent={"space-between"}>
                    <Typography
                      onClick={() => setForgot(true)}
                      variant="h8"
                      sx={{ cursor: "pointer" }}
                    >
                      Forgot Your Password?
                    </Typography>
                    <StyledButton
                      name="Sign in"
                      variant="primary"
                      type="submit"
                    />
                  </Box>
                </Stack>
              </form>
            </>
          )}
          {forgot && (
            <>
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
                  Forgot Password ?
                </Typography>
                <Typography variant="h7" color="text.tertiary" align="left">
                  We will send you a reset link
                </Typography>
              </Stack>

              <form onSubmit={handleSubmit(forgotSubmit)}>
                <Stack spacing={1}>
                  <Typography variant="h6" color="text.secondary" align="left">
                    Enter Email
                  </Typography>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Email is required" }}
                    render={({ field }) => (
                      <StyledInput {...field} placeholder="Enter your Email" />
                    )}
                  />

                  <Box pt={2} display={"flex"} justifyContent={"center"}>
                    <StyledButton name="Send" variant="primary" type="submit" />
                  </Box>
                </Stack>
              </form>
            </>
          )}
          {resetPass && (
            <>
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
                  Reset Password
                </Typography>
                <Typography variant="h7" color="text.tertiary" align="left">
                  Enter your new password
                </Typography>
              </Stack>

              <form onSubmit={handleSubmit(resetSubmit)}>
                <Stack spacing={1}>
                  <Typography variant="h6" color="text.secondary" align="left">
                    Enter Email
                  </Typography>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Email is required" }}
                    render={({ field }) => (
                      <StyledInput {...field} placeholder="Enter your Email" />
                    )}
                  />
                  <Typography variant="h6" color="text.secondary" align="left">
                    Enter Otp
                  </Typography>
                  <Controller
                    name="emailOtp"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Otp is required" }}
                    render={({ field }) => (
                      <StyledInput
                        {...field}
                        placeholder="Enter Otp"
                        type={showOTP ? "password" : "text"}
                        endIcon={
                          <Icon
                            path={showOTP ? mdiEyeOff : mdiEye}
                            size={1}
                            onClick={() => setShowOTP(!showOTP)}
                          />
                        }
                        error={!!errors.emailOtp}
                        helperText={
                          errors.emailOtp ? errors.emailOtp.message : ""
                        }
                      />
                    )}
                  />
                  <Typography variant="h6" color="text.secondary" align="left">
                    Enter New Password
                  </Typography>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                      <StyledInput
                        {...field}
                        placeholder="Enter Password"
                        type={showPass ? "password" : "text"}
                        endIcon={
                          <Icon
                            path={showPass ? mdiEyeOff : mdiEye}
                            size={1}
                            onClick={() => setShowPass(!showPass)}
                          />
                        }
                        error={!!errors.password}
                        helperText={
                          errors.password ? errors.password.message : ""
                        }
                      />
                    )}
                  />

                  <Box pt={2} display={"flex"} justifyContent={"center"}>
                    <StyledButton name="Save" variant="primary" type="submit" />
                  </Box>
                </Stack>
              </form>
            </>
          )}
        </Box>
      </Grid>
      <Grid
        item
        lg={7}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          background: "linear-gradient(45deg,#042F61, #0860C7)",
          height: "100%",
          display: { xs: "flex", md: "none" },
        }}
      >
        {" "}
        <Box
          component="img"
          src={bg}
          alt="Logo"
          sx={{
            width: { xs: "300px", sm: "400px", md: "500px", lg: "611px" },
            height: { xs: "250px", sm: "350px", md: "450px", lg: "554px" },
            objectFit: "cover",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default LoginForm;
