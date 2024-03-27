import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import HeaderTitle from "@/components/dashboard/HeaderTitle";
import schoolImg from "../../assets/icons/education.png";
import { Box, Grid } from "@mui/material";
import { Typography } from "antd";
import schoolLogo from "../../assets/images/uploadImg.jpg";
import { Button } from "@/components/ui/button";
import { AddAPhoto, Edit, EditNote, Lock } from "@mui/icons-material";
import UpdateSchoolForm from "@/components/Forms/UpdateSchoolForm";
import { Link } from "react-router-dom";
import AddSchoolForm from "@/components/Forms/AddSchoolForm";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const AddSchoolPage = () => {
  return (
    <Box className="sm:p-5 space-y-4 p-3">
      <Box
        className={`w-full
       bg-white sm:p-5 p-3 rounded-md mb-5`}>
        <Box className="flex flex-wrap space-y-4 items-center justify-between">
          <Box className="flex items-center space-x-2">
            <img src={schoolImg} alt="dashboard icon" className="w-[32px]" />
            <Box>
              <Typography
                className="text-primary text-[15px]"
                style={{ fontWeight: "bold" }}>
                Add School Page
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                Add a new school
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/dashboard/schools"
            className="hover:underline"
            style={{ fontSize: "14px" }}>
            All Schools
          </Link>

          <Link
            className="hover:underline"
            aria-current="page"
            style={{ fontSize: "14px" }}>
            New School
          </Link>
        </Breadcrumbs>
      </Box>
      <Box className="mt-5">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={7}>
            <Box className="bg-white rounded-md p-5 ">
              <Box>
                <AddSchoolForm />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddSchoolPage;
