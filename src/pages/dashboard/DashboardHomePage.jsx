import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, Grid } from "@mui/material";
import dashboadImg from "../../assets/icons/dashboard.png";
import { Typography } from "antd";
import HeaderTitle from "@/components/dashboard/HeaderTitle";
import studentsImg from "../../assets/icons/student.png";
import schoolImg from "../../assets/icons/school.png";
import AreaChartComp from "../../components/Charts/AreaChartComp";
import { usersData } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLGAsSchools,
  getAllSchools,
  getRegStatus,
  reset,
} from "@/features/schools/schoolSlice";

import Loader from "@/lib/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  getAllStudents,
  getAllSubjects,
} from "@/features/students/studentSlice";
import { getAdmins } from "@/features/auth/authSlice";
import regImage from "../../assets/icons/website.png";

const DashboardHomePage = () => {
  const { schools, isLoading, isError, isSuccess, regStatus, message } =
    useSelector((state) => state.Adminschools);

  const { students } = useSelector((state) => state.Adminstudents);

  const HomeCardContents = [
    // {
    //   title: "Total Schools (Primary)",
    //   description: schools?.data?.CE?.total,
    //   image: schoolImg,
    //   buttonText: "View Schools",
    //   link: "/dashboard/schools",
    // },
    {
      title: "Total Schools (JSS3)",
      description: schools?.data?.JSS3?.total,
      image: schoolImg,
      buttonText: "View Schools",
      link: "/dashboard/schools",
    },
    // {
    //   title: "Total Schools (SS3)",
    //   description: schools?.data?.SS2?.total,
    //   image: schoolImg,
    //   buttonText: "View Schools",
    //   link: "/dashboard/schools",
    // },
    {
      title: "Total Students (JSS3)",
      description: students?.number_of_students,
      image: studentsImg,
      buttonText: "View Students",
      link: "/dashboard/students",
    },

    {
      title: "Operation Manual",
      description: "A guide to software usage",
      image: studentsImg,
      buttonText: "View Manual",
      link: "../src/assets/doc.pdf",
      cat: "2",
    },
  ];

  // const HomeCardContentsStudents = [
  //   {
  //     title: "Total Students (Primary)",
  //     description: students?.data?.CE?.total,
  //     image: studentsImg,
  //     buttonText: "View Students",
  //     link: "/dashboard/students",
  //   },
  //   {
  //     title: "Total Students (JSS3)",
  //     description: students?.data?.JSS3?.total,
  //     image: studentsImg,
  //     buttonText: "View Students",
  //     link: "/dashboard/students",
  //   },
  //   {
  //     title: "Total Students (SS3)",
  //     description: students?.data?.SS2?.total,
  //     image: studentsImg,
  //     buttonText: "View Students",
  //     link: "/dashboard/students",
  //   },
  // ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSchools());
    dispatch(getAllStudents());
    dispatch(getAdmins());
    dispatch(getRegStatus());
    dispatch(getAllLGAsSchools());
    dispatch(getAllSubjects());
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong", {
        onClose: () => {
          dispatch(reset());
        },
      });
    }

    if (isSuccess) {
      dispatch(reset());
    }
  }, [isError, isSuccess]);

  return (
    <Box className="sm:p-5 p-3">
      <Box className="flex items-center space-x-2 bg-white p-5 rounded-md">
        <img src={dashboadImg} alt="dashboard icon" className="w-[32px]" />
        <Box>
          <Typography
            className="text-primary text-[15px]"
            style={{ fontWeight: "bold" }}>
            Overview
          </Typography>
          <Typography className="text-gray-400 -mt-0.5 text-[11px]">
            Showing all data in the system
          </Typography>
        </Box>
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid container>
          <Grid item sm={12} md={12}>
            <Box>
              <Typography className="my-2 text-[13px] font-bold">
                Registration Status
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} className="">
                  <Link to="/dashboard/settings">
                    <Card className="border-none">
                      <Box className="flex justify-between items-center">
                        <CardHeader>
                          <CardTitle className="text-[12px]">
                            Registration Status
                          </CardTitle>
                          <CardDescription className="text-primary font-semibold">
                            {regStatus?.is_registration_active ? (
                              <Button size="sm" className="bg-teal-600 h-7">
                                Currentlly Opened
                              </Button>
                            ) : (
                              <Button
                                variant="destructive"
                                size="sm"
                                className="h-7">
                                Currentlly Closed
                              </Button>
                            )}
                          </CardDescription>
                        </CardHeader>
                        <Box className="p-6">
                          <img
                            src={regImage}
                            alt=" image"
                            className="w-[32px]"
                          />
                        </Box>
                      </Box>

                      <CardFooter>
                        <Button size="sm" variant="secondary">
                          Settings
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Typography className="my-2 text-[13px] font-bold">
                All Casino Data
              </Typography>
              <Grid container spacing={2}>
                {HomeCardContents.map((item, index) => (
                  <Grid item xs={12} sm={12} md={4} key={index} className="">
                    <a href={item.link}>
                      <Card className="border-none">
                        <Box className="flex justify-between items-center">
                          <CardHeader>
                            <CardTitle className="text-[12px]">
                              {item.title}
                            </CardTitle>
                            <CardDescription className="text-primary font-semibold">
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                          <Box className="p-6">
                            <img
                              src={item.image}
                              alt=" image"
                              className="w-[32px]"
                            />
                          </Box>
                        </Box>

                        <CardFooter>
                          <Button size="sm" variant="secondary">
                            {item.buttonText}
                          </Button>
                        </CardFooter>
                      </Card>
                    </a>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* <Box>
              <Typography className="my-2 text-[13px] font-bold">
                All Students Data
              </Typography>
              <Grid container spacing={2}>
                {HomeCardContentsStudents.map((item, index) => (
                  <Grid item xs={12} sm={12} md={4} key={index} className="">
                    <Link to={item.link}>
                      <Card className="border-none">
                        <Box className="flex justify-between items-center">
                          <CardHeader>
                            <CardTitle className="text-[12px]">
                              {item.title}
                            </CardTitle>
                            <CardDescription className="text-primary font-semibold">
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                          <Box className="p-6">
                            <img
                              src={item.image}
                              alt=" image"
                              className="w-[32px]"
                            />
                          </Box>
                        </Box>

                        <CardFooter>
                          <Button size="sm" variant="secondary">
                            {item.buttonText}
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box> */}

            <Grid container className="mt-5">
              <Grid item xs={12} sm={12} md={12}>
                <Box className="sm:h-[55vh] h-[45vh] py-5 bg-white rounded-md">
                  <Typography className="text-[14px] p-5 mb-5 font-semibold uppercase text-primary">
                    Overview of Schools
                  </Typography>
                  <AreaChartComp
                    data={usersData}
                    stroke="#87CEEB"
                    fill="#87CEEB"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DashboardHomePage;
