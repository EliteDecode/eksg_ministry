import React, { useEffect, useState } from "react";
import { Box, IconButton, InputAdornment } from "@mui/material";
import { Typography } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input } from "../ui/input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "../ui/button";
import { LoginSchema } from "@/lib/schemas";
import { login, reset } from "@/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.adminAuth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        onClose: () => {
          setSubmitting(false);
        },
      });
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [isError, isSuccess, dispatch, message]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const trimmedValues = {
        email: values.email.trim(),
        password: values.password.trim(),
      };
      dispatch(login(trimmedValues));
    },
  });

  return (
    <Box className="sm:w-[70%] w-[90%] m-auto">
      <Box className="flex items-center justify-center">
        <Typography
          variant="h2"
          className="hr-lines text-primary font-semibold text-[22px]">
          LOGIN
        </Typography>
      </Box>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Box className="mt-5 w-full space-y-4">
            <Box>
              <Input
                placeholder="email"
                className="sm:text-[13px] text-[13px]"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="text-[10px] text-red-500 leading-none">
                  (*) {formik.errors.email}
                </span>
              ) : null}
            </Box>
            <Box>
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                className="sm:text-[13px] text-[13px]"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end">
                      {showPassword ? (
                        <VisibilityOff style={{ fontSize: "14px" }} />
                      ) : (
                        <Visibility style={{ fontSize: "14px" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.password && formik.errors.password ? (
                <span className="text-[10px] text-red-500 leading-none">
                  (*) {formik.errors.password}
                </span>
              ) : null}
            </Box>

            <Button
              className="w-full"
              type="submit"
              disabled={!formik.isValid || isLoading}>
              {isLoading ? "Please wait..." : "Log In"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
