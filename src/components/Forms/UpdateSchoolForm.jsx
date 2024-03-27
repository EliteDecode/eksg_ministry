import React, { useState } from "react";
import { Box, Grid, IconButton, InputAdornment } from "@mui/material";
import { Typography } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input } from "../ui/input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "../ui/button";
import { updateSchoolSchema } from "@/lib/schemas";
import { Label } from "../ui/label";

const UpdateSchoolForm = ({ setIsUpdate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      cac: "",
      adminName: "",
      adminEmail: "",
    },
    validationSchema: updateSchoolSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <Box className="">
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Box className="mt-5 w-full ">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="name">
                    School Name
                  </Label>
                  <Input
                    placeholder="e.g. Adventist school"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
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
              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="address">
                    School Address
                  </Label>
                  <Input
                    placeholder="e.g. 42 Ojido Market."
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.address}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="email">
                    School Email
                  </Label>
                  <Input
                    placeholder="e.g. adventistschool@gmail.com"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
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
                  <Label className="text-[11px]" htmlFor="cac">
                    School CAC Number
                  </Label>
                  <Input
                    placeholder="e.g. 28838388382838"
                    name="cac"
                    value={formik.values.cac}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.cac && formik.errors.cac ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.cac}
                    </span>
                  ) : null}
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="adminName">
                    School Admin's Fullname
                  </Label>
                  <Input
                    placeholder="e.g. Folarin Balogun"
                    name="adminName"
                    value={formik.values.adminName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.adminName && formik.errors.adminName ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.adminName}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="adminEmail">
                    School Admin's Email
                  </Label>
                  <Input
                    placeholder="e.g. FolarinBalogun@gmail.com"
                    name="adminEmail"
                    value={formik.values.adminEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.adminEmail && formik.errors.adminEmail ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.adminEmail}
                    </span>
                  ) : null}
                </Box>
              </Grid>
            </Grid>

            <Box className="flex space-x-2 mt-10">
              <Button
                className="w-full bg-gray-800 text-white hover:bg-gray-700"
                onClick={() => setIsUpdate(false)}>
                Close
              </Button>
              <Button
                className="w-full "
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}>
                Save Changes
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateSchoolForm;
