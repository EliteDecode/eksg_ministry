import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { Box, Grid } from "@mui/material";
import { Typography } from "antd";

import { Link, useNavigate, useParams } from "react-router-dom";

import Loader from "@/lib/Loader";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getSingleStudent } from "@/features/students/studentSlice";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const SingleStudentPage = () => {
  const dispatch = useDispatch();
  const { studentId } = useParams();
  const { singleStudents, isError, isSuccess, isLoading, subjects } =
    useSelector((state) => state.Adminstudents);

  const { singleSchool } = useSelector((state) => state.Adminschools);

  useEffect(() => {
    dispatch(getSingleStudent(studentId));
  }, []);

  const studentDetails = [
    {
      title: "Firstname",
      value: singleStudents?.firstname,
    },
    {
      title: "Lastname/Surname",
      value: singleStudents?.surname,
    },
    {
      title: "Othernames",
      value: singleStudents?.othername,
    },
    {
      title: "Student Code",
      value: singleStudents?.student_code,
    },
    {
      title: "Gender",
      value: singleStudents?.gender,
    },
    {
      title: "State of Origin",
      value: singleStudents?.state_of_origin,
    },
    {
      title: "LGA",
      value: singleStudents?.local_government,
    },
    {
      title: "Date of Birth",
      value: new Date(singleStudents?.date_of_birth).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      ),
    },
    {
      title: "Registered At",
      value: singleStudents?.created_at
        ? new Date(singleStudents?.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Data is still Offline",
    },
  ];

  const navigate = useNavigate();

  return (
    <Box className="p-4">
      <Box
        className={`w-full mt-5 bg-white sm:px-5 sm:py-5 p-3 rounded-md mb-5`}>
        <Box className="flex flex-wrap justify-between space-y-4 ">
          <Box className="bg-white my-3 rounded-md p-1.5 shadow-md w-[15%]">
            <img
              src={singleStudents?.passport}
              alt="student Image"
              className="rounded-md"
            />
          </Box>
          <Box className="space-x-2">
            {/* <Link
              to={{
                pathname: `/dashboard/edit-student/${studentId}`,
                state: { data: "jjjjj" },
              }}>
            </Link> */}
            {/* <Button variant="destructive">Delete Student Info</Button> */}
          </Box>
        </Box>
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
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
              <Grid item xs={12} sm={12} md={6}>
                <Box className="bg-white rounded-md p-5 ">
                  <Box>
                    <Box className="space-y-4">
                      {studentDetails.map((item, index) => (
                        <Box
                          key={index}
                          className="flex  items-center justify-between space-x-2">
                          <Typography className="font-bold text-[14px] text-[#000]">
                            {item.title}:
                          </Typography>
                          <Typography>{item.value}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="bg-white rounded-md p-5 ">
                  <Box>
                    <Box className="space-y-4">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr className="text-center">
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Subject
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              CA1 Score
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              CA2 Score
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {singleStudents?.scores?.map((item, index) => {
                            return (
                              <tr key={index} className="hover:bg-gray-100">
                                <td className="px-6 py-4 text-left whitespace-nowrap">
                                  {item.subject_name}
                                </td>
                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                  {item.ca1_score}
                                </td>
                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                  {item.ca2_score}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SingleStudentPage;
