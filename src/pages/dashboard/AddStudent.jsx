import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import HeaderTitle from "@/components/dashboard/HeaderTitle";
import schoolImg from "../../assets/icons/education.png";
import { Box, Grid } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { logout } from "@/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import AddStudentForm from "@/components/Forms/AddStudentForm";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const AddStudent = () => {
  const dispatch = useDispatch();
  const { students, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.Adminstudents
  );
  const navigate = useNavigate();

  return (
    <Box className="sm:p-5 space-y-4 p-3">
      <Box role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/dashboard/schools"
            className="hover:underline"
            style={{ fontSize: "14px" }}>
            Student Registeration
          </Link>

          <Link
            className="hover:underline"
            aria-current="page"
            style={{ fontSize: "14px" }}>
            Register new student
          </Link>
        </Breadcrumbs>
      </Box>
      <Box className="mt-5">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Box className="bg-white rounded-md p-5 ">
              <Box>
                <AddStudentForm />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* {isLoading ? (
        <Loader />
      ) : (
        <Box className="mt-5">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <Box className="bg-white rounded-md p-5 ">
                <Box>
                  <AddStudentForm />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )} */}
    </Box>
  );
};

export default AddStudent;
