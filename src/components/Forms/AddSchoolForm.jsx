import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, InputAdornment } from "@mui/material";
import { Typography } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input } from "../ui/input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "../ui/button";
import { updateSchoolSchema } from "@/lib/schemas";
import { Label } from "../ui/label";
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
import { addSchool } from "@/features/schools/schoolSlice";
import { reset } from "@/features/auth/authSlice";
import { generatePin, lgArray } from "@/lib/utils";

const AddSchoolForm = () => {
  const { singleSchool, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.Adminschools
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && message === "school added successfully") {
      toast.success("School added successfully", {
        onClose: () => {
          dispatch(reset());
          navigate(`/dashboard/schools/${singleSchool?.id}`);
        },
      });
    }

    if (isError) {
      toast.error(message, {});
    }

    if (isSuccess || isError) {
      dispatch(reset());
    }
  }, [isLoading, isError, isLoading, dispatch, message]);

  const formik = useFormik({
    initialValues: {
      school_name: "",
      local_government: "",
      school_code: "",
      owner: "",
      exam_type: "",
      pin_limit: "",
    },
    validationSchema: updateSchoolSchema,
    onSubmit: (values) => {
      const data = {
        school_name: values.school_name,
        lg_id: values.local_government,
        owner: values.owner,
        school_code: values.school_code,
        exam_type_id: values.exam_type,
        pin_limit: values.pin_limit,
        school_pin: generatePin(),
      };
      // console.log(data);

      dispatch(addSchool(data));
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
                    name="school_name"
                    value={formik.values.school_name}
                    onChange={formik.handleChange}
                    className="text-[12px]"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.school_name && formik.errors.school_name ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.school_name}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="lga">
                    Local Government Area
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      formik.setFieldValue("local_government", value)
                    }
                    name="local_government">
                    <SelectTrigger className="w-[100%] text-xs">
                      <SelectValue placeholder="Select " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>LGA </SelectLabel>
                        {lgArray?.map((item, index) => (
                          <SelectItem
                            value={item.lg_code.toString()}
                            key={index}>
                            {item?.lg_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {formik.touched.local_government &&
                  formik.errors.local_government ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.local_government}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="school_code">
                    School Code
                  </Label>
                  <Input
                    placeholder="e.g. adventistschool@gmail.com"
                    name="school_code"
                    value={formik.values.school_code}
                    onChange={formik.handleChange}
                    className="text-[12px]"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.school_code && formik.errors.school_code ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.school_code}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="pin_limit">
                    School Quota
                  </Label>
                  <Input
                    placeholder="e.g. 100"
                    name="pin_limit"
                    type="number"
                    value={formik.values.pin_limit}
                    onChange={formik.handleChange}
                    className="text-[12px]"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.pin_limit && formik.errors.pin_limit ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.pin_limit}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="owner">
                    Owener
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      formik.setFieldValue("owner", value)
                    }
                    name="owner">
                    <SelectTrigger className="w-[100%] text-xs">
                      <SelectValue placeholder="Select " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Classes</SelectLabel>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {formik.touched.owner && formik.errors.owner ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.owner}
                    </span>
                  ) : null}
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="exam_type">
                    Exam Type
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      formik.setFieldValue("exam_type", value)
                    }
                    name="exam_type">
                    <SelectTrigger className="w-[100%] text-xs">
                      <SelectValue placeholder="Select " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Exam Type</SelectLabel>
                        <SelectItem value="1">Primary</SelectItem>
                        <SelectItem value="2">JSS2</SelectItem>
                        <SelectItem value="3">SS2</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {formik.touched.exam_type && formik.errors.exam_type ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.exam_type}
                    </span>
                  ) : null}
                </Box>
              </Grid>
            </Grid>

            <Box className="flex space-x-2 mt-10">
              <Button
                className="w-full "
                type=""
                disabled={isLoading}
                onClick={formik.handleSubmit}>
                {isLoading ? "Please wait..." : " Add School"}
              </Button>

              {/* <Button
                className="w-full "
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}>
                Save Changes
              </Button> */}
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddSchoolForm;
