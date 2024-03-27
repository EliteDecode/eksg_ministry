import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import HeaderTitle from "@/components/dashboard/HeaderTitle";
import schoolImg from "../../assets/icons/education.png";
import { Box, Grid } from "@mui/material";
import { Typography } from "antd";
import schoolLogo from "../../assets/images/schoolLogo.jpg";
import { Button } from "@/components/ui/button";
import { AddAPhoto, Edit, EditNote } from "@mui/icons-material";
import UpdateSchoolForm from "@/components/Forms/UpdateSchoolForm";
import { Link, useParams } from "react-router-dom";
import SchoolsTables from "@/components/Tables/SchoolsTables";
import StudentsTables from "@/components/Tables/StudentsTables";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSchool } from "@/features/schools/schoolSlice";
import Loader from "@/lib/Loader";
import Error from "@/lib/Error";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const SingleSchoolPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const { singleSchool, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.Adminschools
  );

  const { schoolId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleSchool(schoolId));
  }, []);
  const schoolDetails = [
    {
      title: "Name",
      value: singleSchool?.school_name,
    },
    {
      title: "Local Government Area",
      value: singleSchool?.local_government,
    },
    {
      title: "School Code",
      value: singleSchool?.school_code,
    },
    {
      title: "School Pin",
      value: singleSchool?.pin,
    },
    {
      title: "Total Student",
      value: singleSchool?.exam_types?.[0]?.students?.length,
    },
    {
      title: "Assigned Quota",
      value: singleSchool?.pin_limit,
    },
  ];

  return (
    <Box className="p-4">
      <HeaderTitle
        img={schoolImg}
        title={singleSchool?.school_name}
        subtitle="Showing all data of this school"
        BtnText="Deactivate School"
        route="singleSchool"
        BtnTextType="destructive"
      />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {singleSchool !== null ? (
            <>
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
                    {singleSchool?.school_name}
                  </Link>
                </Breadcrumbs>
              </Box>
              <Box className="mt-5">
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Box className="bg-white rounded-md p-5 ">
                      <Box>
                        <Box className="space-y-4">
                          {schoolDetails.map((item, index) => (
                            <Box
                              key={index}
                              className="flex  items-center justify-between space-x-2">
                              <Typography className="font-bold text-[14px] text-primary">
                                {item.title}:
                              </Typography>
                              <Typography>{item.value}</Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box className="overflow-x-scroll mt-5 bg-white">
                <StudentsTables
                  filteredStudents={singleSchool?.exam_types?.[0]?.students}
                />
              </Box>
            </>
          ) : (
            <Error />
          )}
        </>
      )}
    </Box>
  );
};

export default SingleSchoolPage;
