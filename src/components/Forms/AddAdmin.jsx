import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Box, Grid, IconButton, InputAdornment } from "@mui/material";
import { Typography } from "antd";
import { useFormik } from "formik";
import { Input } from "../ui/input";
import { addAdminSchema, updateSchoolSchema } from "@/lib/schemas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateSchool } from "@/features/schools/schoolSlice";
import { Add, Visibility, VisibilityOff } from "@mui/icons-material";
import { register } from "@/features/auth/authSlice";

export function AddAdmin() {
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.adminAuth
  );
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    if (isSuccess && message === "admin added") {
      toast.success("Admin added successfully", {
        onClose: () => {
          window.location.reload();
        },
      });
    }

    if (isError) {
      toast.error(message, {});
    }
  }, [isLoading, isError, isLoading, dispatch, message]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      status: "",
    },
    validationSchema: addAdminSchema,
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });

  console.log(formik.errors);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          {" "}
          <Add style={{ fontSize: "20px" }} />
          Add Administrators
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Administrator</DialogTitle>
          <DialogDescription>
            Add admin details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <Box className="mt-5 w-full ">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="name">
                    Full Name
                  </Label>
                  <Input
                    placeholder="e.g. John doe"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className="text-[12px]"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.name}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    placeholder="e.g. admin@gmail.com"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="text-[12px]"
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.email && formik.errors.email ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.email}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="password">
                    Admin Password
                  </Label>
                  <Input
                    placeholder="e.g. 5r#2dcXh"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="text-[12px]"
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
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.password}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label
                    className="text-[11px]"
                    htmlFor="password_confirmation">
                    Confirm Admin Password
                  </Label>
                  <Input
                    placeholder="e.g. 5r#2dcXh"
                    name="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formik.values.password_confirmation}
                    onChange={formik.handleChange}
                    className="text-[12px]"
                    onBlur={formik.handleBlur}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleToggleConfirmPasswordVisibility}
                          edge="end">
                          {showConfirmPassword ? (
                            <VisibilityOff style={{ fontSize: "14px" }} />
                          ) : (
                            <Visibility style={{ fontSize: "14px" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {formik.touched.password_confirmation &&
                  formik.errors.password_confirmation ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.password_confirmation}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="status">
                    Status
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      formik.setFieldValue("status", value)
                    }
                    name="status">
                    <SelectTrigger className="w-[100%] text-xs">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Classes</SelectLabel>
                        <SelectItem value="1">Activate</SelectItem>
                        <SelectItem value="0">Deactivate</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {formik.touched.status && formik.errors.status ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.status}
                    </span>
                  ) : null}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </form>
        <DialogFooter>
          <Button
            className="w-full "
            type=""
            disabled={isLoading}
            onClick={formik.handleSubmit}>
            {isLoading ? "Please wait..." : "Add Admin"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
